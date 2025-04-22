import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SkeletonChatDashboard from "./SkeletonChatDashboard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  CircleUser,
  ContactRound,
  EllipsisVertical,
  Mail,
  MessageCircle,
  ShieldPlus,
  Trash,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
      // console.log("Chat partners:", res.data.data);
      return res.data.data;
    },
  });

  // Fetch all doctors and pharmacists (for inviting)
  const { data: professionals = [], isLoading: loadingProfessionals } =
    useQuery({
      queryKey: ["professionals"],
      queryFn: async () => {
        const res = await axiosSecure.get("/chat/professionals");
        // console.log("Professionals:", res.data.data);
        return res.data.data;
      },
    });

  // Fetch all patients (for inviting)
  const { data: patients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chat/patients");
      // console.log("Patients:", res.data.data);
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
      // console.log("Messages:", res.data.data);
      return res.data.data.messages || res.data.data;
    },
    enabled: !!selectedPartner,
    refetchInterval: 2000,
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

  // Filter doctors and pharmacists who are not already in chatPartners
  const potentialProfessionalsToInvite = professionals.filter(
    (professional) =>
      !chatPartners.some((partner) => partner.email === professional.email)
  );

  // Filter doctors and pharmacists who are not already in chatPartners
  const potentialPatientsToInvite = patients.filter(
    (patient) =>
      !chatPartners.some((partner) => partner.email === patient.email)
  );

  if (loadingPartners || loadingProfessionals || loadingPatients) {
    return <SkeletonChatDashboard />;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className={"mt-3 -mb-4"}>
         {/* Invite Professionals and patients */}
         <h3 className="text-lg font-medium -mb-2">
            {patients ? "Invite Patients" : "Invite Doctors and Pharmacists"}
          </h3>
         <p className="text-sm font-medium text-gray-600">
            {patients ? "Select a patient then communicate" : "Select a pharmacist or doctor then communicate"}
          </p>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4">
        {/* Chat Partners List */}
        <div className="w-full lg:w-1/4 border-r">
          {professionals && userRole === "patient" ? (
            <>
              {potentialProfessionalsToInvite.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No new doctors and pharmacists to invite.
                </p>
              ) : (
                <ul className="space-y-2 overflow-y-scroll h-[600px] py-4">
                  {potentialProfessionalsToInvite.map((professional) => (
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
                            className="w-14 h-14 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                            src={professional?.photo}
                            alt={professional?.name}
                          />
                        </figure>
                        <p className="flex flex-col">
                          <span className="font-medium text-sm">
                            {professional.name}
                          </span>

                          <span className="font-medium text-cyan-500 text-sm">
                            {professional.role}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              {potentialPatientsToInvite.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No new patients to invite.
                </p>
              ) : (
                <ul className="space-y-2 overflow-y-scroll h-[600px] py-4">
                  {potentialPatientsToInvite.map((patient) => (
                    <li
                      key={patient.email}
                      onClick={() => {
                        setSelectedPartner(patient);
                      }}
                      className="p-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <figure>
                          <img
                            className="w-14 h-14 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                            src={patient?.photo}
                            alt={patient?.name}
                          />
                        </figure>
                        <p className="flex flex-col">
                          <span className="font-medium text-sm">
                            {patient.name}
                          </span>

                          <span className="font-medium text-cyan-500 text-sm">
                            {patient.role}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedPartner ? (
            <>
              <div className="border-b p-2 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <figure>
                    <img
                      className="w-14 h-14 rounded-full object-cover"
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
                      className="cursor-pointer rounded-full p-2 bg-blue-500 hover:bg-blue-700"
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
                      <figure className="p-2 h-48">
                        <img
                          className="w-full h-full rounded-md object-cover"
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
                              {selectedPartner?.email}
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
              <div className="flex-1 p-4 overflow-y-auto">
                {loadingMessages ? (
                  <div className="text-center">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    // Get the current message's date
                    const currentDate = new Date(msg.timestamp).toDateString(
                      "en-UK"
                    );
                    // Get the previous message's date
                    const prevDate =
                      index > 0
                        ? new Date(messages[index - 1].timestamp).toDateString(
                            "en-UK"
                          )
                        : null;

                    // Show date divider if this is the first message or the date has changed
                    const showDateDivider =
                      index === 0 || currentDate !== prevDate;

                    return (
                      <div key={index}>
                        {showDateDivider && (
                          <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs text-muted-foreground mx-2">
                              {currentDate}
                            </span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                        )}
                        <div
                          className={`mb-2 ${
                            msg.senderEmail === userEmail
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <span
                            className={`inline-block p-2 rounded-t-md rounded-br-xl ${
                              msg.senderEmail === userEmail
                                ? "bg-blue-200"
                                : "bg-gray-200"
                            }`}
                          >
                            {msg.message}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
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
                  className={
                    "bg-cyan-600 hover:bg-cyan-700 cursor-pointer flex gap-1 items-center"
                  }
                >
                  <MessageCircle className="w-4 h-4" />{" "}
                  <span>
                    {sendMessageMutation.isLoading ? "Sending..." : "Send"}
                  </span>
                </Button>
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
