import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";
import ProfessionalsMessageCounts from "./ProfessionalsMessageCounts";
import PatientsMessageCounts from "./PatientsMessageCounts";
import ChatBox from "./ChatBox";

const ChatDashboard = ({ userEmail, userRole }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Helper function to upload image to ImgBB
  const uploadToImgBB = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_URL;
    if (!apiKey) {
      toast.error("ImgBB API key is not configured");
    }

    // Convert file to base64
    const reader = new FileReader();
    const base64Promise = new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const base64String = await base64Promise;
    const base64Image = base64String.split(",")[1];

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", base64Image);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      setIsUploading(false);
      return response.data.data.url;
    }
  };

  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      // Check file size (4MB limit for ImgBB)
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Image size exceeds 4MB limit");
        return;
      }

      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setSelectedImageFile(file);
    }
  };

  // Fetch chat partners
  const { data: chatPartners = [] } = useQuery({
    queryKey: ["chatPartners", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chat/messages/chats/${userEmail}`);
      // console.log("Chat partners:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch all doctors and pharmacists (for inviting)
  const { data: professionals = [] } = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chat/professionals");
      // console.log("Professionals:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch all patients (for inviting)
  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chat/patients");
      // console.log("Patients:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch current user's data
  const { data: currentUser = {}, isLoading: loadingUser } = useQuery({
    queryKey: ["currentUser", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me", {
        params: { email: userEmail },
      });
      return res.data.data;
    },
    enabled: !!userEmail,
  });

  // Fetch messages for the selected partner with polling
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["messages", userEmail, selectedPartner?.email],
    queryFn: async () => {
      if (!selectedPartner) return [];
      const res = await axiosSecure.get(
        `/chat/messages/${userEmail}/${selectedPartner.email}`
      );
      // console.log("Messages:", res.data.data);
      return res.data.data.messages || res.data.data;
    },
    enabled: !!selectedPartner && !!userEmail && !!userRole,
    refetchInterval: 1000,
  });

  // Fetch message counts for doctors, pharmacists and patients
  const { data: userMessageCounts = {} } = useQuery({
    queryKey: ["userMessageCounts", userEmail, userRole],
    queryFn: async () => {
      const messageCounts = {};

      // Fetch message counts for doctors and pharmacists
      if (userRole === "patient") {
        if (!professionals || professionals.length === 0) return {};
        await Promise.all(
          professionals.map(async (professional) => {
            const res = await axiosSecure.get(
              `/chat/messages/${userEmail}/${professional?.email}`
            );
            const messages = res.data.data.messages || res.data.data || [];
            messageCounts[professional?.email] = messages.length;
          })
        );
      }

      // Fetch message counts for patients
      if (userRole === "doctor" || userRole === "pharmacist") {
        if (!patients || patients.length === 0) return {};
        await Promise.all(
          patients.map(async (patient) => {
            const res = await axiosSecure.get(
              `/chat/messages/${userEmail}/${patient?.email}`
            );
            const messages = res.data.data.messages || res.data.data || [];
            messageCounts[patient?.email] = messages.length;
          })
        );
      }

      return messageCounts;
    },
    enabled: !!userEmail && !!userRole && !!patients && !!professionals,
    refetchInterval: 1000,
  });

  // Mutation for sending a message
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      const res = await axiosSecure.post("/chat/messages/send", messageData);
      return res.data.data;
    },
    onSuccess: (newMsg) => {
      queryClient.setQueryData(
        ["messages", userEmail, selectedPartner?.email],
        (oldMessages) => {
          const updatedMessages = Array.isArray(oldMessages)
            ? [...oldMessages, newMsg]
            : [newMsg];
          return updatedMessages;
        }
      );
      queryClient.invalidateQueries(["chatPartners", userEmail]);
      setNewMessage("");
      setImagePreview("");
      setIsUploading(false);
      setSelectedImageFile(null);
    },
  });

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!selectedPartner) return;
    if (!newMessage.trim() && !selectedImageFile) return;

    let imageUrl = null;
    if (selectedImageFile) {
      try {
        setIsUploading(true);
        imageUrl = await uploadToImgBB(selectedImageFile);
      } catch (error) {
        toast.error(
          error.message || "Failed to upload image to ImgBB. Please try again."
        );
        setIsUploading(false);
        return;
      }
    }

    sendMessageMutation.mutate({
      senderEmail: userEmail,
      receiverEmail: selectedPartner.email,
      message: newMessage,
      photo: imageUrl || null,
      senderRole: userRole,
      receiverRole: selectedPartner.role,
    });
  };

  // Filter doctors and pharmacists who are not already in chatPartners
  const potentialProfessionalsToInvite = professionals.filter(
    (professional) =>
      !chatPartners.some((partner) => partner.email === professional.email)
  );

  // Filter patients who are not already in chatPartners
  const potentialPatientsToInvite = patients.filter(
    (patient) =>
      !chatPartners.some((partner) => partner.email === patient.email)
  );

  return (
    <Card className="shadow-md border border-gray-200 mt-8">
      <CardContent className="flex flex-col lg:flex-row p-0">
        <div className="lg:w-1/4 border-r">
          {/* Invite Professionals and patients */}
          <div className="w-full border-b py-3 shadow-sm">
            <h3 className="text-lg font-medium ml-4">Invite</h3>
            <p className="w-full lg:w-11/12 text-sm font-medium text-gray-600 ml-4">
              Select an user then start the conversation
            </p>
          </div>
          {/* Chat Partners List */}
          {professionals && userRole === "patient" ? (
            <>
              {potentialProfessionalsToInvite.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No new doctors and pharmacists to invite.
                </p>
              ) : (
                <ul className="space-y-2 overflow-y-scroll lg:h-[560px] h-44 py-4 pl-4">
                  {potentialProfessionalsToInvite.map((professional) => {
                    const messageCount = userMessageCounts && professional?.email ?
                      userMessageCounts[professional?.email] || 0 : 0;
                    return (
                      <ProfessionalsMessageCounts
                        professional={professional}
                        setSelectedPartner={setSelectedPartner}
                        messageCount={messageCount}
                        userRole={userRole}
                      />
                    );
                  })}
                </ul>
              )}
            </>
          ) : (professionals && userRole === "doctor") ||
            (professionals && userRole === "pharmacist") ? (
            <>
              {potentialPatientsToInvite.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No new patients to invite.
                </p>
              ) : (
                <ul className="space-y-2 overflow-y-scroll lg:h-[560px] h-44 py-4 pl-4">
                  {potentialPatientsToInvite.map((patient) => {
                    const messageCount = userMessageCounts && patient?.email ? userMessageCounts[patient?.email] || 0 : 0;
                    return (
                      <PatientsMessageCounts
                        patient={patient}
                        setSelectedPartner={setSelectedPartner}
                        messageCount={messageCount}
                        userRole={userRole}
                      />
                    );
                  })}
                </ul>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Chat Window */}
        <ChatBox
          selectedPartner={selectedPartner}
          isUploading={isUploading}
          sendMessageMutation={sendMessageMutation}
          loadingMessages={loadingMessages}
          loadingUser={loadingUser}
          messages={messages}
          handleSendMessage={handleSendMessage}
          handleFileChange={handleFileChange}
          handleUploadImage={handleUploadImage}
          setNewMessage={setNewMessage}
          setImagePreview={setImagePreview}
          setSelectedImageFile={setSelectedImageFile}
          imagePreview={imagePreview}
          newMessage={newMessage}
          currentUser={currentUser}
          userEmail={userEmail}
        />
      </CardContent>
    </Card>
  );
};

export default ChatDashboard;
