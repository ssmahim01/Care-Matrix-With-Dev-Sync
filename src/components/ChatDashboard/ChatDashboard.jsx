import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  CircleUser,
  ContactRound,
  EllipsisVertical,
  ImageIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  ShieldPlus,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";

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
  const { data: currentUser, isLoading: loadingUser } = useQuery({
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
  const { data: userMessageCounts } = useQuery({
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
    enabled: !!userEmail && !!userRole,
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
                    const messageCount =
                      userMessageCounts[professional?.email] || 0;
                  return (
                    <li
                    key={professional.email}
                    onClick={() => {
                      setSelectedPartner(professional);
                    }}
                    className="p-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                  >
                    <div className="flex gap-2 items-center">
                      <figure>
                        <img
                          className="w-14 h-14 rounded-full object-cover border-4 avatar border-blue-500 hover:border-blue-600"
                          referrerPolicy="no-referrer"
                          src={professional?.photo}
                          alt={professional?.name}
                        />
                      </figure>
                      <p className="flex flex-col">
                        <span className="font-medium text-sm">
                          {professional.name}
                        </span>

                        <div className="flex gap-2 items-center">
                        <span className="font-medium text-blue-500 text-sm">
                          {professional.role === "pharmacist" ? "Pharmacist" : "Doctor" }
                        </span>

                        {userRole === "patient" && (
                          <>
                            {messageCount === 0 ? (
                              <span className="badge bg-blue-400 text-[10px] text-white/90 font-medium border py-1 px-2 rounded-xl">
                                New
                              </span>
                            ) : (
                              <div className="relative flex items-center">
                                <MessageSquare className="w-5 h-5 text-blue-500" />
                                <span className="absolute -top-1 -right-1 text-xs font-medium text-white bg-blue-500 rounded-full w-[18px] p-1 h-[18px] flex items-center justify-center border-2 border-white/90">
                                  {messageCount}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        </div>
                      </p>
                    </div>
                  </li>
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
                    const messageCount = userMessageCounts[patient?.email] || 0;
                   return (<li
                      key={patient.email}
                      onClick={() => {
                        setSelectedPartner(patient);
                      }}
                      className="p-2 rounded cursor-pointer hover:bg-blue-100 flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <figure>
                          <img
                            className="w-14 h-14 rounded-full object-cover border-4 avatar border-blue-400 hover:border-blue-600"
                            referrerPolicy="no-referrer"
                            src={patient?.photo}
                            alt={patient?.name}
                          />
                        </figure>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">
                            {patient.name}
                          </span>

                         <div className="mt-1 flex gap-3 items-center">
                         <span className="font-medium text-blue-500 text-sm">
                            {patient.role === "patient" && "Patient"}
                          </span>

                          {(userRole === "doctor" ||
                            userRole === "pharmacist") && (
                              <>
                                {messageCount === 0 ? (
                                  <span className="badge bg-blue-400 text-[10px] text-white/90 font-medium border py-1 px-2 rounded-xl">
                                    New
                                  </span>
                                ) : (
                                  <div className="relative flex items-center">
                                    <MessageSquare className="w-6 h-6 text-blue-500" />
                                    <span className="absolute -top-1 -right-1 text-xs font-medium text-white bg-blue-500 rounded-full w-[18px] p-1 h-[18px] flex items-center justify-center border-2 border-white/90">
                                      {messageCount}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                         </div>
                        </div>
                      </div>
                    </li>);
                  })}
                </ul>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col h-[640px] overflow-y-auto">
          {selectedPartner ? (
            <>
              <div className="p-2 flex sticky top-0 bg-base-200 justify-between border-b items-center rounded-tr-xl shadow-sm">
                <div className="flex gap-2 items-center">
                  <figure>
                    <img
                      className="w-14 h-14 rounded-full object-cover border-4 border-blue-400 hover:border-blue-600"
                      referrerPolicy="no-referrer"
                      src={selectedPartner?.photo}
                      alt={selectedPartner?.name}
                    />
                  </figure>
                  <div className="flex flex-col">
                    {" "}
                    <p className="text-base font-semibold">
                      {selectedPartner.name}{" "}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {selectedPartner?.email}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  {/* Trigger Button */}
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="cursor-pointer rounded-full p-2 bg-blue-400 hover:bg-blue-600"
                      size="icon"
                    >
                      <EllipsisVertical className="w-5 text-white h-10" />
                    </Button>
                  </DropdownMenuTrigger>

                  {/* User Info */}
                  <DropdownMenuContent
                    className="w-64 p-0 shadow-none rounded-lg border-t border-b-0 bg-base-200"
                    align="end"
                  >
                    <Card>
                      <figure className="p-2 h-52 shadow-sm">
                        <img
                          className="w-full h-full rounded-md object-cover border"
                          referrerPolicy="no-referrer"
                          src={selectedPartner?.photo}
                          alt={selectedPartner?.name}
                        />
                      </figure>

                      <DropdownMenuLabel className={"-mt-6 px-2 -mb-5"}>
                        <div className="flex flex-col">
                          <p className="flex gap-2 items-center">
                            <CircleUser className="w-5 h-5" />
                            <span className="text-lg font-semibold">
                              {selectedPartner?.name}
                            </span>
                          </p>
                          <p className="flex gap-2 items-center">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm text-gray-700 font-medium">
                              {selectedPartner?.email.slice(0, 25)}...
                            </span>
                          </p>
                        </div>
                      </DropdownMenuLabel>

                      <Separator />

                      <CardContent className="p-2 -mt-5 shadow-none">
                        <ScrollArea className="max-h-48 h-fit overflow-y-auto pb-0 shadow-none">
                          <p className="flex gap-2 items-center">
                            <ShieldPlus className="w-4 h-4" />{" "}
                            <span className="font-bold">Role: </span>
                            <span className="text-sm text-gray-800 font-medium">
                              {selectedPartner?.role}
                            </span>
                          </p>

                          <p className="flex gap-2 items-center">
                            <ContactRound className="w-4 h-4" />
                            <span className="font-bold">Contact: </span>
                            <span className="text-sm text-gray-800 font-medium">
                              {selectedPartner?.phoneNumber
                                ? selectedPartner?.phoneNumber
                                : "N/A"}
                            </span>
                          </p>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex-1 py-4 px-4">
                {loadingMessages || loadingUser ? (
                  <div className="text-center text-gray-500">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const currentDate = format(
                      new Date(msg.timestamp),
                      "d MMMM yyyy"
                    );
                    const prevDate =
                      index > 0
                        ? format(
                            new Date(messages[index - 1].timestamp),
                            "d MMMM yyyy"
                          )
                        : null;
                    const showDateDivider =
                      index === 0 || currentDate !== prevDate;

                    const isCurrentUser = msg.senderEmail === userEmail;
                    const sender = isCurrentUser
                      ? currentUser
                      : selectedPartner;

                    return (
                      <div key={index}>
                        {showDateDivider && (
                          <div className="flex items-center justify-center my-4">
                            <span className="text-xs text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                              {currentDate}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          } mb-4`}
                        >
                          {!isCurrentUser && (
                            <figure className="flex-shrink-0 mr-3">
                              <img
                                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500 hover:border-indigo-600"
                                referrerPolicy="no-referrer"
                                src={sender?.photo}
                                alt={sender?.name}
                              />
                            </figure>
                          )}
                          <div
                            className={`flex flex-col ${
                              isCurrentUser ? "items-end" : "items-start"
                            } max-w-[70%]`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-700">
                                {sender?.name}
                              </span>
                            </div>
                            {msg.image && (
                              <div className="mb-2">
                                <img
                                  src={msg.image}
                                  alt="Chat image"
                                  referrerPolicy="no-referrer"
                                  className="w-[200px] h-[240px] max-w-[200px] max-h-[200px] rounded-lg object-cover shadow-sm"
                                />
                              </div>
                            )}
                            {msg.message && (
                              <span
                                className={`inline-block p-2 rounded-xl shadow-sm font-medium text-gray-700 ${
                                  isCurrentUser
                                    ? "bg-blue-200 rounded-br-none"
                                    : "bg-gray-200 rounded-bl-none"
                                }`}
                              >
                                {msg.message}
                              </span>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {isCurrentUser && (
                            <figure className="flex-shrink-0 ml-3">
                              <img
                                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 hover:border-blue-600"
                                referrerPolicy="no-referrer"
                                src={sender?.photo}
                                alt={sender?.name}
                              />
                            </figure>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="border-t px-3 sticky bottom-0 bg-base-200 py-3">
                {imagePreview && (
                  <div className="relative w-[80%] md:w-[150px] h-[150px] rounded-md mb-3">
                    <>
                      <img
                        src={imagePreview}
                        alt="image preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Trash2
                        className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                        onClick={() => {
                          setImagePreview("");
                          setSelectedImageFile(null);
                        }}
                      />
                    </>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={"shadow-sm"}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isUploading || sendMessageMutation.isLoading}
                  />

                  <Button
                    onClick={handleUploadImage}
                    disabled={isUploading || sendMessageMutation.isLoading}
                    variant={"outline"}
                    className={"cursor-pointer shadow-sm"}
                  >
                    <input
                      type="file"
                      name="image"
                      id="image_input"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <ImageIcon size={20} />
                  </Button>

                  <Button
                    onClick={handleSendMessage}
                    disabled={isUploading || sendMessageMutation.isLoading}
                    className={
                      "bg-blue-500 hover:bg-blue-600 cursor-pointer flex gap-1 items-center"
                    }
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {sendMessageMutation.isLoading || isUploading
                        ? "Sending..."
                        : "Send"}
                    </span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a conversation to start chatting.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatDashboard;
