import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";

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
});

const RequestForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_URL
  }`;
  const axiosPublic = useAxiosPublic();

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
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
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequest = async (data) => {
    try {
      setIsSubmitting(true);

      // Default to existing image if no new one is uploaded
      let imageURL = user?.photoURL;

      // Upload image to ImgBB if a new one is selected
      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);

        const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (!imgResponse.data.success) {
          setIsSubmitting(false);
          return toast.error("Failed to upload the image!");
        }

        imageURL = imgResponse.data.data.display_url;
      }

      // Prepare request data for backend
      const requestData = {
        userId: user?.uid,
        userPhoto: imageURL,
        userName: data.name,
        userEmail: data?.email,
        contactNumber: data?.contact,
        emergencyContact: data?.emergencyContact,
        requestedRole: data.role,
        department: data?.department,
        status: "Pending",
        adminNotes: "",
        shift: data?.shift,
        joiningDate: data?.joiningDate,
        address: data?.address,
        additionalNotes: data?.notes,
        requestDate: new Date().toISOString(),
      };

      // Send the request to backend
      const response = await axiosPublic.post("/user-requests", requestData);
      // console.log(response);

      if (response?.status === 201) {
        toast.success("Successfully sent the request");
        form.reset();
        setProfileImage(null);
        setProfileImagePreview(null);
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Failed to send the request!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRequest)}
        className="space-y-6 bg-base-200 shadow-md transition-all duration-300 p-6 rounded-box"
      >
        {isLoading ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="skeleton h-32 w-32 rounded-full mx-auto"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-5">
                <div className="skeleton h-12 w-32"></div>
                <div className="skeleton h-12 w-32"></div>
                <div className="skeleton h-12 w-32"></div>
              </div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-24 w-full"></div>
            </div>
          </div>
        ) : (
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
                    <img
                      src={user?.photoURL}
                      alt="Profile image"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("profileImage")?.click()
                    }
                    className="cursor-pointer"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
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
                      <Input
                        type="email"
                        placeholder="Provide your email address"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Provide your phone number"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Give your emergency contact"
                        {...field}
                      />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Administrator">
                            Administrator
                          </SelectItem>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Receptionist">
                            Receptionist
                          </SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                          <SelectItem value="Administration">
                            Administration
                          </SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shift" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Morning">
                            Morning (6AM - 2PM)
                          </SelectItem>
                          <SelectItem value="Afternoon">
                            Afternoon (2PM - 10PM)
                          </SelectItem>
                          <SelectItem value="Night">
                            Night (10PM - 6AM)
                          </SelectItem>
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
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
                      <Textarea
                        placeholder="123 Main St, City, State, ZIP"
                        {...field}
                      />
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
                      <Textarea
                        placeholder="Any additional information..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="flex justify-start gap-2">
          <Button
            type="button"
            className="cursor-pointer"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? "Requesting..." : "Send Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RequestForm;
