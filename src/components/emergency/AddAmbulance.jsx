
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

export default function AddAmbulance({ setIsAddDialogOpen, isAddDialogOpen, handleAddAmbulance }) {
    const [role] = useRole()
    return (
        <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} >
                {role !== "administrator"
                    ?
                    <Button onClick={() => toast.error("Admin Only")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ambulance
                    </Button>
                    :
                    <DialogTrigger asChild>
                        <Button >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ambulance
                        </Button>
                    </DialogTrigger>
                }
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Ambulance</DialogTitle>
                        <DialogDescription>Add a new ambulance to the system.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAmbulance}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" placeholder="Name" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Select name="status">
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="En Route">En Route</SelectItem>
                                        <SelectItem value="On Call">On Call</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                        <SelectItem value="Basic Life Support">Basic Life Support</SelectItem>
                                        <SelectItem value="Advanced Life Support">Advanced Life Support</SelectItem>
                                        <SelectItem value="Critical Care">Critical Care</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">
                                    Location
                                </Label>
                                <Input placeholder="Enter location" name="location" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="eta" className="text-right">
                                    ETA
                                </Label>
                                <Input id="eta" placeholder="Estimated time" name="eta" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="crew" className="text-right">
                                    crew
                                </Label>
                                <Input id="crew" name='crew' type="number" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Ambulance</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
