"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SkeletonChatDashboard from "./SkeletonChatDashboard";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ChatDashboard = ({ userEmail, userRole }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat partners
  const { data: chatPartners = [], isLoading: loadingPartners } = useQuery({
    queryKey: ["chatPartners", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chat/messages/chats/${userEmail}`);
      console.log("Chat partners:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch all doctors (for inviting)
  const { data: doctors = [], isLoading: loadingDoctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chat/doctors");
      console.log("Doctors:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch messages for the selected partner with polling
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["messages", userEmail, selectedPartner?.email],
    queryFn: async () => {
      if (!selectedPartner) return [];
      const res = await axiosSecure.get(
        `/chat/messages/${userEmail}/${selectedPartner.email}`
      );
      console.log("Messages:", res.data.data);
      return res.data.data.messages || res.data.data;
    },
    enabled: !!selectedPartner,
    refetchInterval: 5000,
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
      setNewMessage("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPartner) return;

    sendMessageMutation.mutate({
      senderEmail: userEmail,
      receiverEmail: selectedPartner.email,
      message: newMessage,
      senderRole: userRole,
      receiverRole: selectedPartner.role,
    });
  };

  // Filter doctors who are not already in chatPartners
  const potentialDoctorsToInvite = doctors.filter(
    (doctor) =>
      !chatPartners.some((partner) => partner.email === doctor.email)
  );

  if (loadingPartners || loadingDoctors) {
    // return <SkeletonChatDashboard />;
    <div>Loading...</div>
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold">Chat Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Communicate with {userRole === "patient" ? "doctors and pharmacists" : "patients"}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4">
        {/* Chat Partners List */}
        <div className="w-full lg:w-1/4 border-r">
          {/* <h3 className="text-lg font-medium mb-2">Conversations</h3> */}
          {/* {chatPartners.length === 0 ? (
            <p className="text-sm text-muted-foreground">No conversations yet.</p>
          ) : (
            <ul className="space-y-2">
              {chatPartners.map((partner) => (
                <li
                  key={partner.email}
                  className={`p-2 rounded cursor-pointer ${
                    selectedPartner?.email === partner.email ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    console.log("Selected partner:", partner);
                    setSelectedPartner(partner);
                  }}
                >
                  {partner.name} ({partner.role})
                </li>
              ))}
            </ul>
          )} */}

           {/* Invite Doctors Section */}
           <h3 className="text-lg font-medium mb-2">Message Doctors</h3>
          {potentialDoctorsToInvite.length === 0 ? (
            <p className="text-sm text-muted-foreground">No new doctors to invite.</p>
          ) : (
            <ul className="space-y-2">
              {potentialDoctorsToInvite.map((doctor) => (
                <li
                  key={doctor.email}
                  className="p-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                >
                  <span>{doctor.name} ({doctor.role})</span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedPartner(doctor);
                    }}
                  >
                    Chat
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedPartner ? (
            <>
              <div className="border-b p-2">
                <h3 className="text-lg font-medium">
                  Chat with {selectedPartner.name} ({selectedPartner.role})
                </h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {loadingMessages ? (
                  <div className="text-center">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        msg.senderEmail === userEmail ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded ${
                          msg.senderEmail === userEmail ? "bg-blue-200" : "bg-gray-200"
                        }`}
                      >
                        {msg.message}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t p-2 flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={sendMessageMutation.isLoading}
                >
                  {sendMessageMutation.isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatDashboard;