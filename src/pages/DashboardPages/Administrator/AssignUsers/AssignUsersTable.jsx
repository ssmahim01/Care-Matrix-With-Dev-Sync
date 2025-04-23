import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import {
  AlertCircle,
  Eye,
  Loader,
  MoreVertical,
  Phone,
  ShieldCheck,
  Stethoscope,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { FaCapsules } from "react-icons/fa";
import DoctorProfileDialog from "./DoctorProfileDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const AssignUsersTable = ({ users, isLoading, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUserDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/firebase/delete-user/${selectedEmail}`
      );

      if (data?.result?.deletedCount) {
        refetch();
        setIsOpen(false);
        setErrorMessage("");
        toast("User Deleted", {
          description: `${selectedEmail} Was Successfully Removed!`,
          duration: 2000,
          position: "top-right",
        });
      } else {
        setErrorMessage("User could not be deleted, Please try again!");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while deleting the user!";
      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Table className={"mt-6"}>
      <TableCaption>A List Of All Assigned Users</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>UID</TableHead>
          <TableHead className="text-xs">
            Last <br /> Login At
          </TableHead>
          <TableHead className="text-xs">
            User <br /> Assigned At
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <TableCell key={j}>
                    <div className="skeleton h-8 rounded w-full"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          : users?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.photo}
                        alt="user Image"
                        className="min-w-10 max-w-10 rounded-full h-10 object-cover"
                      />
                    </Avatar>
                    <span>{user?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[150px] truncate">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <span>{user?.email}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user?.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  {user?.role === "administrator" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      Admin
                    </Badge>
                  ) : user?.role === "pharmacist" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <FaCapsules className="h-4 w-4 text-green-600" />
                      Pharmacist
                    </Badge>
                  ) : user?.role === "receptionist" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4 text-orange-600" />
                      Receptionist
                    </Badge>
                  ) : user?.role === "doctor" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Stethoscope className="h-4 w-4 text-purple-600" />
                      Doctor
                    </Badge>
                  ) : (
                    <Badge>{user?.role}</Badge>
                  )}
                </TableCell>

                <TableCell>{user?.phoneNumber}</TableCell>
                <TableCell className="max-w-[100px] truncate">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <span>{user?.uid}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user?.uid}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  {user?.createdAt
                    ? format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {user?.lastLoginAt
                    ? format(new Date(user.lastLoginAt), "dd MMM yyyy, hh:mm a")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                      <div
                        className={
                          "bg-base-200 p-2 rounded border border-border w-fit"
                        }
                      >
                        <MoreVertical className="cursor-pointer text-gray-700" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {user?.role === "doctor" && (
                        <>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => {
                              e.preventDefault();
                              setOpenDialog(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mt-[2px]" />
                            Doctor Profile
                          </DropdownMenuItem>
                          {/* DoctorProfileDialog */}
                          <DoctorProfileDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            doctor={user?.email}
                          />
                        </>
                      )}
                      {user?.role !== "doctor" && (
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmail(user?.email);
                            setIsOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <Trash className="w-4 h-4 mt-[0.9px] text-red-500" />
                          Delete User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
      {/* Delete User Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md [&_[data-dialog-close]]:hidden">
          <DialogHeader>
            {!errorMessage && (
              <>
                <DialogTitle>Are you sure?</DialogTitle>
                <p className="text-sm text-gray-600">
                  This will permanently delete{" "}
                  <span className="font-semibold text-gray-700">
                    {selectedEmail}
                  </span>{" "}
                  from Firebase and DB
                </p>
              </>
            )}
          </DialogHeader>

          {errorMessage && (
            <div className="flex items-center gap-2 text-red-500 mt-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={handleUserDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : errorMessage ? (
                "Try Again!"
              ) : (
                "Yes, Delete"
              )}
            </Button>
            <Button
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => {
                setIsOpen(false);
                setSelectedEmail("");
                setErrorMessage("");
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  );
};

export default AssignUsersTable;
