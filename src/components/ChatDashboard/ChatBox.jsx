import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUser,
  ContactRound,
  EllipsisVertical,
  ImageIcon,
  Mail,
  MessageCircle,
  ShieldPlus,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UsersMessage from "./UsersMessage";

const ChatBox = ({
  selectedPartner,
  imagePreview,
  isUploading,
  sendMessageMutation,
  loadingMessages,
  loadingUser,
  messages,
  handleSendMessage,
  handleFileChange,
  handleUploadImage,
  setNewMessage,
  setImagePreview,
  setSelectedImageFile,
  newMessage,
  currentUser,
  userEmail,
}) => {
  return (
    <div className="flex-1 flex flex-col h-[640px]">
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
                className="w-72 p-0 shadow-none rounded-lg border-t border-b-0 bg-base-200"
                align="end"
              >
                <Card>
                  <figure className="p-2 h-44 shadow-sm">
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

          <div className="flex-1 lg:py-4 py-8 px-4 overflow-y-auto">
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
                const showDateDivider = index === 0 || currentDate !== prevDate;

                const isCurrentUser = msg.senderEmail === userEmail;
                const sender = isCurrentUser ? currentUser : selectedPartner;

                return (
                  <UsersMessage
                    msg={msg}
                    index={index}
                    showDateDivider={showDateDivider}
                    currentDate={currentDate}
                    isCurrentUser={isCurrentUser}
                    sender={sender}
                  />
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
  );
};

export default ChatBox;
