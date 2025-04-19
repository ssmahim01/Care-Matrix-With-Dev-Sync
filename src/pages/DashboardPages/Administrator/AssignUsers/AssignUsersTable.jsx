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

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Eye, MoreVertical, Trash } from "lucide-react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";

const AssignUsersTable = ({ users, isLoading, refetch }) => {
  const handleUserDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete ${email} from Firebase and MongoDB.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#fff",
      color: "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/firebase/delete-user/${email}`
          );
          if (data?.result?.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: data.message || `${email} has been deleted successfully.`,
              icon: "success",
              confirmButtonColor: "#000",
              background: "#fff",
              color: "#000",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.message || "Something went wrong.",
            icon: "error",
            confirmButtonColor: "#000",
            background: "#fff",
            color: "#000",
          });
        }
      }
    });
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
                        className="max-w-10 rounded-full h-10 object-cover"
                      />
                    </Avatar>
                    <span>{user?.name}</span>
                  </div>
                </TableCell>
                <TableCell className={"max-w-[150px] truncate"}>
                  {user?.email}
                </TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.phoneNumber}</TableCell>
                <TableCell className={"max-w-[100px] truncate"}>
                  {user?.uid}
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
                      <DropdownMenuItem className={"cursor-pointer"}>
                        <Eye className="w-4 h-4 mr-2" /> User Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUserDelete(user?.email)}
                        className={"cursor-pointer"}
                      >
                        <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                        User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default AssignUsersTable;
