

import { X } from "lucide-react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Edit, Trash2, MessageSquare } from "lucide-react"
import { StaffForm } from "./staff-form"
import toast from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"


export function StaffTable({ staff, isLoading, refetch }) {

  const [selectedStaff, setSelectedStaff] = useState(null)
  const [dialogContent, setDialogContent] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (staff) => {
    setSelectedStaff(staff)
    setDialogContent("edit")
    setIsDialogOpen(true)
  }

  const showConfirmToast = (message, onConfirm, onCancel) => {
    const id = toast.custom((t) => <ToastContent t={t} message={message} onConfirm={onConfirm} onCancel={onCancel} toastId={id} />);
  };
  
  const ToastContent = ({ t, message, onConfirm, onCancel, toastId }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Delay visibility just a tick to allow transition to kick in
      const timeout = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timeout);
    }, []);
  
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => toast.dismiss(toastId ?? t.id), 300); // wait for transition
    };
  
    return (
      <div
        className={`bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-lg border w-[300px] transition-all duration-400 ease-in-out transform ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">{message}</p>
          <button onClick={handleClose}>
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onCancel?.();
              handleClose();
            }}
          >
            No
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    );
  };


  const handleDelete = (staffId) => {
    console.log("attampt")
    showConfirmToast(
      "Are you sure you want to delete this staff?",
      async () => {
        try {
          setIsDeleting(true);
          console.log("Deleting staff with ID:", staffId);
          await axios.delete(`${import.meta.env.VITE_API_URL}/users/delete-user/${staffId}`);
          refetch();
          toast.success("Staff deleted successfully");
        } catch (error) {
          toast.error(error.message ? error.message : "Failed to delete staff");
        } finally {
          setIsDeleting(false);
        }
      },
      () => {
        console.log("Delete cancelled");
      }
    );
  };
  

  // const getStatusBadge = (status) => {
  //   switch (status) {
  //     case "Active":
  //       return (
  //         <Badge variant="default" className="bg-green-500">
  //           Active
  //         </Badge>
  //       )
  //     case "On Leave":
  //       return (
  //         <Badge variant="outline" className="text-amber-500 border-amber-500">
  //           On Leave
  //         </Badge>
  //       )
  //     case "Resigned":
  //       return (
  //         <Badge variant="outline" className="text-red-500 border-red-500">
  //           Resigned
  //         </Badge>
  //       )
  //     default:
  //       return <Badge variant="outline">{status}</Badge>
  //   }
  // }

  const renderDialogContent = () => {
    if (!selectedStaff) return null

    switch (dialogContent) {
      case "edit":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Edit Staff Member</DialogTitle>
              <DialogDescription>Update information for {selectedStaff.name}</DialogDescription>
            </DialogHeader>
            <StaffForm
              staffData={selectedStaff}
              onSuccess={() => {
                setIsDialogOpen(false)
                refetch()
              }}
            />
          </>
        )
      default:
        return null
    }
  }

  if (isLoading || !staff) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
  

  if (staff?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-muted-foreground mb-4">No staff members found</p>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Staff ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead>Last Login</TableHead>
        <TableHead>Contact</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {staff?.map((member) => (
        <TableRow key={member._id}>
          <TableCell className="font-medium">
            {member._id.slice(0, 6)}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.photo} alt={member.name} />
                <AvatarFallback>
                  {member.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {member.name}
            </div>
          </TableCell>
          <TableCell className={`capitalize`}>{member.role}</TableCell>
          <TableCell>
            {new Date(member.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell>
            {new Date(member.lastLoginAt).toLocaleString()}
          </TableCell>
          <TableCell>{member.phoneNumber}</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(member)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleDelete(member._id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">{renderDialogContent()}</DialogContent>
      </Dialog>
    </>
  )
}

