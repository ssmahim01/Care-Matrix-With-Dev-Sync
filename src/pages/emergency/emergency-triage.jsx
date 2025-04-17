import { cn } from "@/lib/utils"

import { useState } from "react"
import {
  AlertCircle,
  Clock,
  Heart,
  Thermometer,
  Activity,
  Stethoscope,
  ArrowUpDown,
  Search,
  Plus,
  Check,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import toast from "react-hot-toast"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"

export default function EmergencyTriage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const { data = [], refetch} = useQuery({
    queryKey: ["triage"],
    queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/triage/all-triage`)
        setPatients(data)
        return data
    },
  })

  const { data: doctor = []} = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors`)
        setDoctors(data)
        return data
    },
  })

  const { data: bed = [], refetch: bedRefetch} = useQuery({
    queryKey: ["bed"],
    queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/beds`)
        setRooms(data)
        return data
    },
  })


  const [patients, setPatients] = useState(data)


  const [doctors, setDoctors] = useState(doctor)

  const [rooms, setRooms] = useState(bed)


const isAvailableToday = (days) => {
  const today = format(new Date(), "EEEE");
  // Check if today is in availableDays
  return days.includes(today);
};


  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-600 text-white"
      case "urgent":
        return "bg-orange-500 text-white"
      case "non-urgent":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "urgent":
        return <Badge>Urgent</Badge>
      case "non-urgent":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Non-urgent
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleAddPatient = async (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const age = parseInt(form.age.value);
    const gender = form.gender.value;
    const complaint = form.complaint.value;
    const priority = form.priority.value;
    const heartRate = parseInt(form.heartRate.value);
    const bloodPressure = form.bloodPressure.value;
    const respiratoryRate = parseInt(form.respiratoryRate.value);
    const oxygenSaturation = parseInt(form.oxygenSaturation.value);
    const temperature = parseInt(form.temperature.value);


    const patient = { name, age, gender, complaint, priority, vitalSigns: {bloodPressure, heartRate, respiratoryRate, oxygenSaturation, temperature}}

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/triage/add`, patient)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.error)
    } finally {
      refetch()
      setIsAddDialogOpen(false)
    }
  }

  const handleAssignPatient = async (e) => {
    e.preventDefault()
    const form = e.target;
    const assignedDoctor = form.assignedDoctor.value;
    const roomId = form.assignedRoom.value;
    const assignedRoom = rooms.find(rom=> rom._id === roomId)


    if (selectedPatient) {
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/triage/update-assigned/${selectedPatient._id}`, { assignedDoctor, assignedRoom: assignedRoom.title, roomId} )
        const bedRes = await axios.patch(`${import.meta.env.VITE_API_URL}/beds/status/${roomId}`, {status: "booked"})
        if(bedRes.data) bedRefetch()
        toast.success(res.data?.message)
      } catch (error) {
        console.log(error)
      }finally {
        refetch()
        setIsAssignDialogOpen(false)
      }
    }
  }

  const openAssignDialog = (patient) => {
    setSelectedPatient(patient)
    setIsAssignDialogOpen(true)
  }

  const handleCompleteTreatment = async (patientId, roomId) => {
      toast.custom((t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md mx-auto flex flex-col items-center justify-center text-center space-y-4 z-[9999] border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
              <p className="text-sm text-gray-600">This complete the treatment task.</p>
              <div className="flex gap-4 mt-2">
              <button
                  onClick={() => toast.dismiss(t.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    toast.dismiss(t.id);
                    try {
                      const res = await axios.put(`${import.meta.env.VITE_API_URL}/triage/update-status/${patientId}`);
                      await axios.patch(`${import.meta.env.VITE_API_URL}/beds/status/${roomId}`, {status: "available"})
                      toast.success(res.data.message);
                    } catch (error) {
                      toast.error(error.message || 'Something went wrong');
                    } finally {
                      refetch();
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-200"
                >
                  Treatment Complete
                </button>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ), { position: 'top-right', duration: Infinity });
  }

  // const sortPatientsByPriority = () => {
  //   const sortedPatients = [...patients].sort((a, b) => {
  //     const priorityOrder = { Critical: 0, Urgent: 1, "Non-urgent": 2 }
  //     return (
  //       priorityOrder[a.priority] -
  //       priorityOrder[b.priority]
  //     )
  //   })
  //   setPatients(sortedPatients)
  // }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Triage</h1>
          <p className="text-muted-foreground">Prioritize and manage emergency patients</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Current Time:</span> 11:30 AM
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Patient</DialogTitle>
                <DialogDescription>Add a new patient to the emergency triage system.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPatient}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="age" className="text-right">
                      Age
                    </Label>
                    <Input name="age" type="number" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Gender
                    </Label>
                    <Select name="gender">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="complaint" className="text-right">
                      Chief Complaint
                    </Label>
                    <Textarea name="complaint" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select name="priority">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="non-urgent">Non-urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Vitals</Label>
                    <div className="col-span-3 flex gap-2">
                      <Input
                        name="bloodPressure"
                        placeholder="BP (e.g., 160/95)"
                        className="w-24 text-sm"
                        required
                      />
                      <Input
                        name="heartRate"
                        placeholder="HR (bpm)"
                        type="number"
                        className="w-20 text-sm"
                        required
                      />
                      <Input
                        name="respiratoryRate"
                        placeholder="RR (breaths/min)"
                        type="number"
                        className="w-20 text-sm"
                        required
                      />
                      <Input
                        name="temperature"
                        placeholder="Temp (°C)"
                        type="number"
                        step="0.1"
                        className="w-20 text-sm"
                        required
                      />
                      <Input
                        name="oxygenSaturation"
                        placeholder="Oxy O2 (%)"
                        type="number"
                        className="w-20 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Patient</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {/* <Button variant="outline" onClick={sortPatientsByPriority}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by Priority
        </Button> */}
      </div>

      <Tabs defaultValue="waiting">
        <TabsList>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="in-treatment">In Treatment</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="waiting">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Patients</CardTitle>
              <CardDescription>Patients waiting for triage assessment and treatment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Arrival Time</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Vital Signs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients
                    .filter((patient) => patient.status === "waiting")
                    .map((patient) => (
                      <TableRow key={patient._id}>
                        <TableCell className="font-medium">{patient._id.slice(-6)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {patient.age} yrs, {patient.gender}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.complaint}</TableCell>
                        <TableCell>{format(patient.arrivalTime, " h:mm a, MMM d")}</TableCell>
                        <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 text-xs">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              {patient.vitalSigns.heartRate}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Activity className="h-3 w-3 text-blue-500" />
                              {patient.vitalSigns.bloodPressure}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Thermometer className="h-3 w-3 text-orange-500" />
                              {patient.vitalSigns.temperature}°C
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={patient.priority === "critical" ? "destructive" : "default"}
                            size="sm"
                            onClick={() => openAssignDialog(patient)}
                          >
                            Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="in-treatment">
          <Card>
            <CardHeader>
              <CardTitle>Patients In Treatment</CardTitle>
              <CardDescription>Patients currently receiving treatment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients
                    .filter((patient) => patient.status === "in-treatment" || patient.status === "completed")
                    .map((patient) => (
                      <TableRow key={patient._id}>
                        <TableCell className="font-medium">{patient._id.slice(-6)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {patient.age} yrs, {patient.gender}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.complaint}</TableCell>
                        <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                        <TableCell>
                          {patient.assignedDoctor ? (
                            <div className="flex items-center gap-1">
                              <Stethoscope className="h-4 w-4 text-blue-600" />
                              <span>{patient.assignedDoctor}</span>
                            </div>
                          ) : (
                            "Not assigned"
                          )}
                        </TableCell>
                        <TableCell>
                          {patient.assignedRoom ? (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {patient.assignedRoom}
                            </Badge>
                          ) : (
                            "Not assigned"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {/* Will be added in the feature to update all the info */}
                            {/* <Button  variant="outline" size="sm">
                              Update
                            </Button> */}
                            {patient.status === "completed" 
                            ? 
                            (
                              <Badge className={`bg-green-400`}>
                                Completed
                              </Badge>
                            )
                            : 
                            (
                              <Button onClick={()=>handleCompleteTreatment(patient._id, patient.roomId )} variant="outline" size="sm">
                              Complete
                            </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className={`pt-3`}>Available Doctors</CardTitle>
                <CardDescription>Doctors available for emergency cases</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <div key={doctor._id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <Stethoscope className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                          </div>
                        </div>
                        <Badge variant={isAvailableToday(doctor.available_days) ? "outline" : "secondary"}>{isAvailableToday(doctor.available_days) ? "Available" : "Not Available"}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`pt-3`}>Available Rooms</CardTitle>
                <CardDescription>Emergency rooms available for patients</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-2 gap-4">
                    {rooms.map((room) => (
                      <div
                        key={room._id}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-lg border p-4 text-center",
                          room.status === "available" ? "bg-green-50" : "bg-red-50",
                        )}
                      >
                        <div
                          className={cn(
                            "mb-2 rounded-full p-2",
                            room.status === "available" ? "bg-green-100" : "bg-red-100",
                          )}
                        >
                          {room.status === "available" ? (
                            <Check
                              className={cn("h-5 w-5", room.status === "available" ? "text-green-600" : "text-red-600")}
                            />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <p className="font-medium">{room.name}</p>
                        <Badge
                          variant="outline"
                          className={cn("capitalize",
                            room.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                          )}
                        >
                          {room.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Patient</DialogTitle>
            <DialogDescription>Assign a doctor and room to the patient.</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <form onSubmit={handleAssignPatient}>
              <div className="grid gap-4 py-4">
                <div className="rounded-lg border p-3 bg-muted/40">
                  <div className="flex items-center gap-2">
                    <div className={cn("rounded-full p-1", getPriorityColor(selectedPatient.priority))}>
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedPatient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedPatient.age} yrs, {selectedPatient.gender} - {selectedPatient.complaint}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doctor" className="text-right">
                    Doctor
                  </Label>
                  <Select name="assignedDoctor" >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor._id} value={doctor.name} disabled={isAvailableToday(doctor.available_days)}>
                          {doctor.name} {isAvailableToday(doctor.available_days) ? "(Not available)" : "(Available)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Select name="assignedRoom" className="capitalize" >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={`capitalize`}>
                      {rooms.map((room) => (
                        <SelectItem className={`lowercase`} key={room._id} value={room._id} disabled={room.status !== "available"}>
                          {room.title} {room.status !== "available" && "(Occupied)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" placeholder="Additional notes for the doctor" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Assign Patient</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
