import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthUser } from "@/redux/auth/authActions";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Trash } from "lucide-react";

const AssignUsersTable = () => {
  const user = useAuthUser();
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
        {
          // isLoading
          //   ? Array.from({ length: 8 }).map((_, i) => (
          //       <TableRow key={i}>
          //         {Array.from({ length: 13 }).map((_, j) => (
          //           <TableCell key={j}>
          //             <div className="skeleton h-8 rounded w-full"></div>
          //           </TableCell>
          //         ))}
          //       </TableRow>
          //     ))
          //   :
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.photoURL}
                      alt="user Image"
                      className="min-w-10 rounded-full h-10 object-cover"
                    />
                  </Avatar>
                  <span>{user?.displayName}</span>
                </div>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>Administrator</TableCell>
              <TableCell>0199878284724</TableCell>
              <TableCell>{user?.uid}</TableCell>
              <TableCell>4/19/2025</TableCell>
              <TableCell>4/19/2025</TableCell>
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
                    <DropdownMenuItem className={"cursor-pointer"}>
                      <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                      User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default AssignUsersTable;
