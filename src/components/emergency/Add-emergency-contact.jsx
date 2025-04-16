
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useRole from "@/hooks/useRole"
import toast from "react-hot-toast"

export default function AddEmergencyContact({ setIsAddDialogOpen, isAddDialogOpen, handleAddContact }) {
  const [role] = useRole()
  return (
    <div className="flex items-center gap-2">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} >
        {role !== "administrator"
          ?
          <Button onClick={() => toast.error("Admin Only")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
          :
          <DialogTrigger asChild>
            <Button >
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
        }
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>Add a new emergency contact to the system.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddContact}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select name="type">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="ambulance">Ambulance</SelectItem>
                    <SelectItem value="police">Police</SelectItem>
                    <SelectItem value="fire">Fire Department</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">
                  Availability
                </Label>
                <Select name="available">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Yes"}>Yes</SelectItem>
                    <SelectItem value={"No"}>No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input name="phone" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" name="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" name='email' type="email" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Contact</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
