
import { useEffect, useState } from "react"
import { Ambulance, MapPin, User, Phone, AlertCircle, Clock, CheckCircle2, Hospital } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import PhoneNumber from "./phone-number"
import AddAmbulance from "@/components/emergency/AddAmbulance"
import useRole from "@/hooks/useRole"
import axios from "axios"
import toast from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { Delete } from "lucide-react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { format } from "date-fns"
import { useAuthUser } from "@/redux/auth/authActions"
import { Link, useNavigate } from "react-router"
import { LockKeyhole } from "lucide-react"

export default function AmbulanceBooking() {

  const [role] = useRole()
  const user = useAuthUser()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientAddress: "",
    patientEmail: user?.email,
    emergencyType: "",
    emergencyDetails: "",
    pickupLocation: "",
    destination: "",
    ambulanceId: "",
    priority: "normal",
  })

  const { data = [], refetch } = useQuery({
    queryKey: ["ambulances"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/ambulance/all`);
      setAmbulances(res.data)
      return res.data
    }
  })

  const [ambulances, setAmbulances] = useState(data)


  const [activeBookings, setActiveBookings] = useState([]);

  useEffect(() => {
    if (!user || !ambulances) {
      setActiveBookings([]);
      return;
    }

    let activeAmbulanceBookings = ambulances.filter(
      (ambulance) => ambulance.status !== 'available'
    );

    if (role === 'patient') {
      activeAmbulanceBookings = activeAmbulanceBookings.filter(
        (ambulance) =>
          ambulance.patientDetails?.patientEmail === user.email
      );
    }

    setActiveBookings(activeAmbulanceBookings);

  }, [user, role, ambulances]);


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (!user) return navigate("/login")
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        patientEmail: user.email
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ambulanceId) {
      toast.error("Please select an ambulance to book");
      return;
    }

    const submissionData = {
      ...formData,
      patientEmail: user?.email || formData.patientEmail
    };
    // console.log(submissionData)
    if (!submissionData.patientName || !submissionData.patientEmail || !submissionData.patientPhone || !submissionData.patientAddress) {
      toast.error("Please fill in all required patient details");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/ambulance/book/${submissionData.ambulanceId}`,
        submissionData);

      if (response.status === 200) {
        setBookingComplete(true)
        toast.success(response.data.message || "Ambulance Booked Successfully", {
          description: `Ambulance ${submissionData.ambulanceId.slice(-6)} has been dispatched.`,
        });
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-700 text-white"
      case "en route":
        return "bg-blue-500 text-white"
      case "on call":
        return "bg-purple-500 text-white"
      case "at patient location":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleAddAmbulance = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value;
    const status = form.status.value;
    const type = form.type.value;
    const location = form.location.value;
    const eta = form.eta.value;
    const phone = form.phone.value;
    const crew = parseInt(form.crew.value);


    const ambulance = { name, status, type, location, crew, eta, number: phone };
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/ambulance/add`, ambulance);
      if (res.data) return toast.success(res.data.message)
    } catch (error) {
      console.error("Error adding ambulance:", error.response?.data || error.message);
      toast.error("Error adding ambulance:", error.response?.data || error.message)
    } finally {
      refetch()
      setIsAddDialogOpen(false);
    }
  }

  const handleDelete = async (id) => {
    if (role !== "administrator") return toast.error("Admin Only")
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
            <h2 className="text-lg font-semibold text-gray-800">Are you absolutely sure?</h2>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={async () => {
                  toast.dismiss(t.id);
                  try {
                    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/ambulance/delete-ambulance/${id}`);
                    toast.success(res.data.message);
                  } catch (error) {
                    toast.error(error.message || 'Something went wrong');
                  } finally {
                    refetch();
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ), { position: 'top-center', duration: Infinity });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ambulance Booking</h1>
          <p className="text-muted-foreground">Request and track ambulance services for emergency situations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Current Time:</span> {format(new Date(), "h:mm a")}
          </Button>
          <Button variant="destructive" asChild>
            <a href="tel:999">
              <Phone className="mr-2 h-4 w-4" />
              Call 999
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue={"available"} >
        <TabsList className="grid w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <TabsTrigger value="available">Available Ambulances</TabsTrigger>
          <TabsTrigger value="book">Book Ambulance</TabsTrigger>
          {user
            ?
            <TabsTrigger value="active">{!user ? "My Bookings" : role === "patient" ? "My Bookings" : "Active Bookings"}</TabsTrigger>
            :
            <TabsTrigger value="login" >My Bookings</TabsTrigger>
          }
        </TabsList>

        <TabsContent value="available" >
          <Card>
            <CardHeader className={`mt-4 flex items-center justify-between`}>
              <div>
                <CardTitle>Available Ambulances</CardTitle>
                <CardDescription>View and book available ambulance units</CardDescription>
              </div>

              {role !== "administrator" ? null : (
                <AddAmbulance
                  handleAddAmbulance={handleAddAmbulance}
                  isAddDialogOpen={isAddDialogOpen}
                  setIsAddDialogOpen={setIsAddDialogOpen}
                />
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ambulances.map((ambulance) => (
                  <Card key={ambulance._id} className=" relative group transition-all duration-300 ease-in-out">
                    <CardHeader className={cn("py-3 rounded-t-xl ", getStatusColor(ambulance.status))}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-white capitalize">{ambulance._id.slice(-6)}</CardTitle>
                        <Badge variant="outline" className="bg-white/20 text-white">
                          {ambulance.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Name:</span>
                          <span>{ambulance.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Location:</span>
                          <span>{ambulance.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">ETA:</span>
                          <span>{ambulance.eta || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Phone:</span>
                          <span>{ambulance.number || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Type:</span>
                          <span>{ambulance.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Crew:</span>
                          <span>{ambulance.crew} person</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-3 bg-muted/40">
                      <Button
                        variant={"outline"}
                        size="sm"
                        className="w-full"
                        disabled={true}
                      >
                        {ambulance.status === "available" ? "Available" : "Not Available"}
                      </Button>
                    </CardFooter>
                    <div className="group-hover:inline-block absolute hidden transition-all duration-300 -right-3 -top-3">
                      <Button size={"icon"} onClick={() => handleDelete(ambulance._id)} className={"rounded-full bg-red-700 transition-all duration-300 size-8"}>
                        <X className="transition-all duration-300" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent id="book" value="book">
          <Card className={`py-3`}>
            <CardHeader>
              <CardTitle>Request an Ambulance</CardTitle>
              <CardDescription>
                Fill out the form below to request an ambulance for emergency medical services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookingComplete ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Ambulance Booked Successfully</h3>
                  <p className="mb-4 text-muted-foreground">Ambulance {ambulances.find(ambulance => ambulance._id === formData.ambulanceId)?.name} has been dispatched to your location.</p>
                  <PhoneNumber phone={ambulances.find(ambulance => ambulance._id === formData.ambulanceId)} />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setBookingComplete(false)
                        setStep(1)
                        setFormData({
                          patientName: "",
                          patientPhone: "",
                          patientAddress: "",
                          patientEmail: "",
                          emergencyType: "",
                          emergencyDetails: "",
                          pickupLocation: "",
                          destination: "",
                          priority: "normal",
                        })
                      }}
                    >
                      Book Another Ambulance
                    </Button>
                    <Button asChild>
                      <a href="/emergency">Return to Dashboard</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="pb-4">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Patient Information</h3>
                          <Badge>Step 1 of 3</Badge>
                        </div>
                        <Separator />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="patientName">Patient Name</Label>
                          <Input
                            id="patientName"
                            name="patientName"
                            placeholder="Enter patient name"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patientPhone" className="text-right">
                            Contact Number
                          </Label>
                          <div className="col-span-3">
                            <Input
                              type="tel"
                              id="patientPhone"
                              name="patientPhone"
                              value={formData.patientPhone}
                              onChange={handleInputChange}
                              placeholder="e.g., +880 123 456 7890"
                              pattern="^\+?[0-9]{10,15}$"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientAddress">Patient Address</Label>
                        <Input
                          id="patientAddress"
                          name="patientAddress"
                          placeholder="Enter patient address"
                          value={formData.patientAddress}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientEmail">Patient email</Label>
                        <Input
                          id="patientEmail"
                          name="patientEmail"
                          value={formData.patientEmail}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyType">Emergency Type</Label>
                        <Select
                          name="emergencyType"
                          value={formData.emergencyType}
                          onValueChange={(value) => handleSelectChange("emergencyType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select emergency type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                            <SelectItem value="respiratory">Respiratory Distress</SelectItem>
                            <SelectItem value="trauma">Trauma/Injury</SelectItem>
                            <SelectItem value="neurological">Neurological Emergency</SelectItem>
                            <SelectItem value="obstetric">Obstetric Emergency</SelectItem>
                            <SelectItem value="pediatric">Pediatric Emergency</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyDetails">Emergency Details</Label>
                        <Textarea
                          id="emergencyDetails"
                          name="emergencyDetails"
                          placeholder="Describe the emergency situation"
                          value={formData.emergencyDetails}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Location Information</h3>
                          <Badge>Step 2 of 3</Badge>
                        </div>
                        <Separator />
                      </div>
                      <div className="flex items-center gap-10 w-full">
                        <div className="space-y-2">
                          <Label htmlFor="pickupLocation">Pickup Location</Label>
                          <Input
                            id="pickupLocation"
                            name="pickupLocation"
                            placeholder="Enter pickup location"
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                            className={"w-96"}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupLocation">Select ambulance</Label>
                          <Select
                            name="ambulanceId"
                            value={formData.ambulanceId}
                            onValueChange={(value) => handleSelectChange("ambulanceId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination hospital" />
                            </SelectTrigger>
                            <SelectContent>
                              {ambulances.map(ambulance =>
                                <>
                                  <SelectItem key={ambulance._id} disabled={ambulance.status !== "available" ? true : false} value={ambulance._id}>{ambulance.name} {ambulance.status === "available" ? "(Available)" : "(Busy)"}</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination Hospital</Label>
                        <Select
                          name="destination"
                          value={formData.destination}
                          onValueChange={(value) => handleSelectChange("destination", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination hospital" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="city-general">City General Hospital</SelectItem>
                            <SelectItem value="westside-medical">Westside Medical Center</SelectItem>
                            <SelectItem value="eastside-emergency">Eastside Emergency Clinic</SelectItem>
                            <SelectItem value="north-memorial">North Memorial Hospital</SelectItem>
                            <SelectItem value="south-community">South Community Medical Center</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Priority Level</Label>
                        <RadioGroup
                          name="priority"
                          value={formData.priority}
                          onValueChange={(value) => handleSelectChange("priority", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="critical" id="critical" />
                            <Label htmlFor="critical" className="text-red-600 font-medium">
                              Critical (Life-threatening)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="urgent" id="urgent" />
                            <Label htmlFor="urgent" className="text-orange-600 font-medium">
                              Urgent (Serious but stable)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal">Normal (Non-life-threatening)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Confirm Booking</h3>
                          <Badge>Step 3 of 3</Badge>
                        </div>
                        <Separator />
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 font-medium">Patient Information</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Name:</span> {formData.patientName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Contact:</span> {formData.patientPhone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Address:</span> {formData.patientAddress}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Address:</span> {formData.patientEmail}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 font-medium">Emergency Details</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Type:</span> {formData.emergencyType}
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="font-medium">Details:</span>
                              <p className="mt-1 text-muted-foreground">{formData.emergencyDetails}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 font-medium">Location Information</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Pickup:</span> {formData.pickupLocation}
                          </div>
                          <div className="flex items-center gap-2">
                            <Hospital className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Destination:</span> {formData.destination}
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Priority:</span>
                            <Badge
                              variant={
                                formData.priority === "critical"
                                  ? "destructive"
                                  : formData.priority === "urgent"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {formData.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 font-medium">Assigned Ambulance</h4>
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-green-100 p-2">
                            <Ambulance className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{ambulances.find(ambulance => ambulance._id === formData.ambulanceId)?.name}</p>
                            <p className="text-sm text-muted-foreground">ETA: 5 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    {step < 3 ? (
                      <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 outline-none   bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 " onClick={handleNextStep}>
                        Next
                      </button>
                    ) : (
                      <Button type="submit" variant="destructive">
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className={`py-3`}>
            <CardHeader>
              <CardTitle>{role !== "patient" ? "Active Bookings" : user ? "My" : "Active"} Bookings</CardTitle>
              <CardDescription>See currently active bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-6">
                {activeBookings?.map((booking) => (
                  <Card key={booking._id}>
                    <CardHeader className="py-3 bg-blue-500 text-white rounded-t-xl">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">{booking._id.slice(-6)}</CardTitle>
                        <Badge variant="outline" className="bg-white/20 text-white">
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Customer:</span>
                          <span>{booking?.patientDetails?.patientName}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Type:</span>
                          <span>{booking.patientDetails?.emergencyType}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Location:</span>
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Booked:</span>
                          <span>{booking.bookingTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Scheduled:</span>
                          <span>{booking.scheduledTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login" className={`md:pt-20 pt-10`}>
          <Card className="w-full max-w-md mx-auto shadow-xl border border-border rounded-2xl bg-background animate-fade-in py-2">
            <CardHeader className="text-center space-y-2 py-6">
              <div className="flex justify-center">
                <LockKeyhole className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Login Required</h2>
            </CardHeader>
            <CardContent className="text-center space-y-4 px-6 pb-6">
              <p className="text-muted-foreground text-sm">
                You need to be logged in to continue.
              </p>
              <Link to={`/login`}>
                <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-200">
                  Go to Login
                </button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
