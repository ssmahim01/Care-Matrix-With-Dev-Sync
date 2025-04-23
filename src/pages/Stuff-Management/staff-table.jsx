import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import {
  Eye,
  MoreVertical,
  Phone,
  ShieldCheck,
  Stethoscope,
  Trash,
  User,
} from "lucide-react";
import { FaCapsules } from "react-icons/fa";

export function StaffTable({ users, isLoading, refetch }) {
  return (
    <>
      <Table className={"mt-6"}>
        <TableCaption>A List Of All Assigned Users</TableCaption>
        <TableHeader>
          <TableRow className={"bg-base-200 hover:bg-base-200"}>
            <TableHead className="pr-0">Name</TableHead>
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
                  <TableCell className="pr-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user?.photo}
                          alt="User Image"
                          className="min-w-10 max-w-10 rounded-full h-10 object-cover"
                        />
                        <AvatarFallback className="min-w-10 max-w-10 rounded-full h-10 object-cover">
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-32 truncate">{user?.name}</span>
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
                    ) : user?.role === "patient" ? (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <User className="h-4 w-4 text-pink-600" />
                        Patient
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
                      ? format(
                          new Date(user.lastLoginAt),
                          "dd MMM yyyy, hh:mm a"
                        )
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
                        <DropdownMenuItem
                          // onClick={() => {
                          //   setSelectedEmail(user?.email);
                          //   setIsOpen(true);
                          // }}
                          className="cursor-pointer"
                        >
                          <Trash className="w-4 h-4 mt-[0.9px] text-red-500" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
