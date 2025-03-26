import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { createStaff, updateStaff } from "@/lib/stuff"

const userFormSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  role: z.string({
    required_error: "Please select a role",
  }),
  department: z.string({
    required_error: "Please select a department",
  }),
  contact: z.string().min(5, {
    message: "Contact information is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  joiningDate: z.date({
    required_error: "Joining date is required",
  }),
  shift: z.string({
    required_error: "Please select a shift",
  }),
  status: z.string({
    required_error: "Please select a status",
  }),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
})

const RequestForm = ({userData, onSuccess}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
      const [profileImage, setProfileImage] = useState(null)
      const [profileImagePreview, setProfileImagePreview] = useState(userData?.profileImage || null)
    
      const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: userData
          ? {
              ...userData,
              joiningDate: userData.joiningDate ? new Date(userData.joiningDate) : new Date(),
            }
          : {
              name: "",
              role: "",
              department: "",
              contact: "",
              email: "",
              joiningDate: new Date(),
              shift: "",
              status: "Active",
              address: "",
              emergencyContact: "",
              notes: "",
            },
      })
    
      const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
          setProfileImage(file)
          const reader = new FileReader()
          reader.onloadend = () => {
            setProfileImagePreview(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }
    
      const handleRequest = async (data) => {
        try {
          setIsSubmitting(true)
    
          // Create FormData for file upload
          const formData = new FormData()
          if (profileImage) {
            formData.append("profileImage", profileImage)
          }
    
          // Add all form data
          Object.entries(data).forEach(([key, value]) => {
            if (value instanceof Date) {
              formData.append(key, value.toISOString())
            } else if (value !== undefined && value !== null) {
              formData.append(key, String(value))
            }
          })
    
        //   if (userData) {
        //     // Update existing staff
        //     await updateStaff(userData.id, formData)
        //     toast({
        //       title: "Success",
        //       description: "Request updated successfully",
        //     })
        //   } else {
        //     // Create new staff
        //     await createStaff(formData)
        //     toast({
        //       title: "Success",
        //       description: "Sent request successfully",
        //     })
        //     form.reset()
        //     setProfileImage(null)
        //     setProfileImagePreview(null)
        //   }
    
        //   onSuccess()
        } catch (error) {
          console.error("Error submitting form:", error)
          toast({
            title: "Error",
            description: userData ? "Failed to update request" : "Failed to sent the request",
            variant: "destructive",
          })
        } finally {
          setIsSubmitting(false)
        }
      }
    
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRequest)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-muted">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview || "/placeholder.svg"}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="profileImage" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("profileImage")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
    
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Write your name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Provide your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Provide your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Give your emergency contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
    
              <div className="space-y-5">
                <div className="flex flex-wrap lg:flex-row flex-col gap-5 lg:items-center">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Administrator">Administrator</SelectItem>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Receptionist">Receptionist</SelectItem>
                          <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                          <SelectItem value="ICU">ICU</SelectItem>
                          <SelectItem value="Surgery">Surgery</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Oncology">Oncology</SelectItem>
                          <SelectItem value="Radiology">Radiology</SelectItem>
                          <SelectItem value="Laboratory">Laboratory</SelectItem>
                          <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shift" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Morning">Morning (6AM - 2PM)</SelectItem>
                          <SelectItem value="Afternoon">Afternoon (2PM - 10PM)</SelectItem>
                          <SelectItem value="Night">Night (10PM - 6AM)</SelectItem>
                          <SelectItem value="Rotating">Rotating</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
    
        
                <FormField
                  control={form.control}
                  name="joiningDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Joining Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Main St, City, State, ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
    
            <div className="flex justify-start gap-2">
              <Button type="button" className="cursor-pointer" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Requesting..." : "Send Request"}
              </Button>
            </div>
          </form>
        </Form>
      )
};

export default RequestForm;