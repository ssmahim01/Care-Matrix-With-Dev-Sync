import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { imgUpload } from "@/lib/imgUpload";
import axios from "axios";
import toast from "react-hot-toast";

const staffFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  staffId: z.string().min(2, {
    message: "Staff ID is required",
  }),
  requestedRole: z.string({
    required_error: "Please select a role",
  }),
  contactNumber: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  photo: z.string().optional(),
});

export function StaffForm({ staffData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(
    staffData.userPhoto
  );
  const [profileImagePreview, setProfileImagePreview] =
    useState(staffData?.userPhoto || null);

  const form = useForm({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: staffData?.userName || "",
      staffId: staffData?._id?.slice(0, 6) || "",
      requestedRole: staffData?.requestedRole || "",
      contactNumber: staffData?.contactNumber || "",
      email: staffData?.userEmail || "",
      photo: staffData?.userPhoto || "",
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    const imageUrl = await imgUpload(file);
    // console.log(imageUrl);
    if (imageUrl) {
      setProfileImage(imageUrl);
      setProfileImagePreview(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      console.log(data)

      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/user-requests/update-profile/${staffData.userEmail}`,
        { phoneNumber: data.contactNumber, userName: data.name , profileImage, requestedRole: data.requestedRole }
      );
      console.log(res.data)
      toast.success("Staff member updated successfully");

      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update staff member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-muted">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
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
                <Input
                  id="photo"
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
                    document
                      .getElementById("photo")
                      ?.click()
                  }
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
                    <Input
                      placeholder="John Doe"
                      {...field}
                    />
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
                      readOnly
                      disabled
                      placeholder="john.doe@hospital.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="requestedRole"
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
                      <SelectItem value="receptionist">
                        Receptionist
                      </SelectItem>
                      <SelectItem value="administrator">
                        Administrator
                      </SelectItem>
                      <SelectItem value="pharmacist">
                        Pharmacist
                      </SelectItem>
                      <SelectItem value="patient">
                        Patient
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="STAFF-001"
                      readOnly
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*         
            // Joining Date
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
            /> */}

            {/* Address */}
            {/* <FormField
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
            /> */}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Update Staff"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
