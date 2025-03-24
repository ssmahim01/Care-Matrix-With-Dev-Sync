
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Calendar, AlertTriangle, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import { StaffForm } from "./staff-form"
import { ShiftAssignment } from "./shift-assignment"
import { StaffMessage } from "./staff-message"
import { EmergencyAssignment } from "./emergency-assignment"
import { deleteStaff } from "@/lib/stuff"


export function StaffTable({ staff, isLoading, onStaffUpdated }) {

  const [selectedStaff, setSelectedStaff] = useState(null)
  const [dialogContent, setDialogContent] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (staff) => {
    setSelectedStaff(staff)
    setDialogContent("edit")
    setIsDialogOpen(true)
  }

  const handleShiftAssignment = (staff) => {
    setSelectedStaff(staff)
    setDialogContent("shift")
    setIsDialogOpen(true)
  }

  const handleEmergencyAssignment = (staff) => {
    setSelectedStaff(staff)
    setDialogContent("emergency")
    setIsDialogOpen(true)
  }

  const handleMessage = (staff) => {
    setSelectedStaff(staff)
    setDialogContent("message")
    setIsDialogOpen(true)
  }

  const handleDelete = async (staffId) => {
    if (confirm("Are you sure you want to delete this staff member? This action cannot be undone.")) {
      try {
        setIsDeleting(true)
        await deleteStaff(staffId)
        toast({
          title: "Success",
          description: "Staff member deleted successfully",
        })
        onStaffUpdated()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete staff member",
          variant: "destructive",
        })
        console.error("Failed to delete staff:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        )
      case "On Leave":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            On Leave
          </Badge>
        )
      case "Resigned":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Resigned
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
                onStaffUpdated()
              }}
            />
          </>
        )
      case "shift":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Assign Shifts</DialogTitle>
              <DialogDescription>Manage shifts for {selectedStaff.name}</DialogDescription>
            </DialogHeader>
            <ShiftAssignment
              staff={selectedStaff}
              onSuccess={() => {
                setIsDialogOpen(false)
                onStaffUpdated()
              }}
            />
          </>
        )
      case "emergency":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Emergency Assignment</DialogTitle>
              <DialogDescription>Assign {selectedStaff.name} to emergency duty</DialogDescription>
            </DialogHeader>
            <EmergencyAssignment
              staff={selectedStaff}
              onSuccess={() => {
                setIsDialogOpen(false)
                onStaffUpdated()
              }}
            />
          </>
        )
      case "message":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>Send a notification to {selectedStaff.name}</DialogDescription>
            </DialogHeader>
            <StaffMessage
              staff={selectedStaff}
              onSuccess={() => {
                setIsDialogOpen(false)
              }}
            />
          </>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (staff.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-muted-foreground mb-4">No staff members found</p>
        <Button onClick={() => onStaffUpdated()}>Refresh</Button>
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
              <TableHead>Department</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.staffId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.profileImage} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.shift}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>{member.contact}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleShiftAssignment(member)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Assign Shifts
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEmergencyAssignment(member)}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Emergency Duty
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMessage(member)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(member.id)}
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

