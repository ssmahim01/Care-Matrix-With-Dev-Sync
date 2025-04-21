import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function ChatDashboard({ userId, userRole }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat partners
  const { data: chatPartners = [], isLoading: loadingPartners } = useQuery({
    queryKey: ["chatPartners", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chat/messages/chats/${userId}`);
      return res.data.data;
    },
  });

  // Fetch messages for the selected partner with polling
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["messages", userId, selectedPartner?._id],
    queryFn: async () => {
      if (!selectedPartner) return [];
      const res = await axiosSecure.get(
        `/chat/messages/${userId}/${selectedPartner._id}`
      );
      return res.data.data;
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
      // Optimistically update the messages
      queryClient.setQueryData(
        ["messages", userId, selectedPartner?._id],
        (oldMessages) => [...(oldMessages || []), newMsg]
      );
      setNewMessage(""); // Clear input
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPartner) return;

    sendMessageMutation.mutate({
      senderId: userId,
      receiverId: selectedPartner._id,
      message: newMessage,
      senderRole: userRole,
      receiverRole: selectedPartner.role,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold">Chat Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Communicate with {userRole === "patient" ? "doctors and pharmacists" : "patients"}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4 h-[500px]">
        {/* Chat Partners List */}
        <div className="w-full lg:w-1/4 border-r">
          <h3 className="text-lg font-medium mb-2">Conversations</h3>
          {chatPartners.length === 0 ? (
            <p className="text-sm text-muted-foreground">No conversations yet.</p>
          ) : (
            <ul className="space-y-2">
              {chatPartners.map((partner) => (
                <li
                  key={partner._id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedPartner?._id === partner._id ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedPartner(partner)}
                >
                  {partner.name} ({partner.role})
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
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        msg.senderId === userId ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded ${
                          msg.senderId === userId ? "bg-blue-200" : "bg-gray-200"
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
}