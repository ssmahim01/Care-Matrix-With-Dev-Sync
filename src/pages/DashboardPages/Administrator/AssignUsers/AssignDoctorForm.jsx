import IsError from "@/authentication/IsError";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { imgUpload } from "@/lib/imgUpload";
import axios from "axios";
import { X } from "lucide-react";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AssignDoctorForm = ({ refetch, setIsDoctorFormOpen }) => {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [email, setEmail] = useState("");
  const [doctorPreview, setDoctorPreview] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(880);
  const [inputValue, setInputValue] = useState("");
  const [experience, setExperience] = useState(null);
  const [consultationFee, setConsultationFee] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [treatedPatients, setTreatedPatients] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [serviceValue, setServiceValue] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [services, setServices] = useState([]);
  const [bio, setBio] = useState("");
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !availability.includes(trimmedValue)) {
        setAvailability([...availability, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleServiceChange = (e) => setServiceValue(e.target.value);

  const handleServiceKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = serviceValue.trim();
      if (trimmedValue && !services.includes(trimmedValue)) {
        setServices([...services, trimmedValue]);
        setServiceValue("");
      }
    }
  };

  const removeServices = (serviceToRemove) =>
    setServices(services.filter((s) => s !== serviceToRemove));
  const removeAvailability = (availabilityToRemove) =>
    setAvailability(availability.filter((a) => a !== availabilityToRemove));

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setDoctorImage(file);
      setDoctorPreview(URL.createObjectURL(file));
    }
  };

  // Bangladeshi phone number validation
  const validateBangladeshiNumber = (number) => {
    const cleanNumber = number.replace(/[^\d+]/g, "");
    const bdNumberRegex = /^\8801[3-9][0-9]{8}$/;
    return bdNumberRegex.test(cleanNumber);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setLoading(false);
      setIsError("Phone Number Is Required");
      return;
    }
    setPhoneNumber(value);
    if (value && !validateBangladeshiNumber(value)) {
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
    } else {
      setIsError("");
    }
  };

  // Password Validation Functionality
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setStrongPassword(password);

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setSignal({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: password.length >= 8,
      strong:
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSymbol &&
        password.length >= 8,
    });
  };

  // Confirm Modal
  const showConfirmModal = (role, email, password) => {
    Swal.fire({
      html: `
             <div class="bg-background text-foreground p-4 mt-4 rounded-2xl max-w-md w-full border space-y-8">
              <!-- Success Icon and Message -->
              <div class="text-center space-y-2">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 class="text-xl font-bold">Account Successfully Created</h2>
                <p class="text-sm px-8 -mt-2 text-muted-foreground">The user account has been created  Share these credentials with the user.</p>
              </div>
    
               <!-- Title -->
               <div class="text-center -mt-5">
                 <span class="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                   ${
                     role.charAt(0).toUpperCase() + role.slice(1)
                   } Account Credentials
                 </span>
               </div>
             
               <!-- Credentials Section -->
               <div class="space-y-2 -mt-5">
                 <!-- Email -->
                 <div class="flex flex-col justify-start space-y-1.5">
                   <p for="copy-email" class="text-sm text-left font-medium text-gray-700">Email</p>
                   <div class="relative">
                     <input id="copy-email" readonly type="text" value="${email}" class="w-full rounded-lg border bg-muted px-4 py-2 pr-12 text-sm font-medium text-primary focus:outline-none" />
                   </div>
                 </div>
             
                 <!-- Password -->
                 <div class="flex flex-col justify-start space-y-1.5">
                   <p for="copy-password" class="text-sm text-left font-medium text-gray-700">Password</p>
                   <div class="relative">
                     <input id="copy-password" readonly type="text" value="${password}" class="w-full rounded-lg border bg-muted px-4 py-2 pr-12 text-sm font-medium text-primary focus:outline-none" />
                     <button
                       onclick="copyToClipboard('copy-password')"
                       class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                     >
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>
             
               <!-- Improved Warning Notice -->
               <div class="flex items-start -mt-4 gap-3 p-2 rounded-xl border border-yellow-300 bg-yellow-100/60 text-yellow-900 text-sm">
                 <div>
                   <p class="font-semibold">⚠️ Important Notice</p>
                   <p class="mt-1">Please copy the password now. For security reasons, this password won’t be shown again after closing this modal. And after copy the password the modal will be closed!</p>
                 </div>
               </div>
             </div>
          `,
      confirmButtonText: "Ok, Close",
      confirmButtonColor: "#000",
      background: "#f3f4f6",
      didOpen: () => {
        window.copyToClipboard = (id) => {
          const input = document.getElementById(id);
          const text = input.value;
          navigator.clipboard
            .writeText(text)
            .then(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Copied to clipboard!",
                text: "User Password has been copied successfully.",
                showConfirmButton: false,
                timer: 3000,
                background: "#ffffff",
                customClass: {
                  title: "text-blue-800 font-semibold",
                  content: "text-gray-600",
                },
              });
            })
            .catch(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Copy failed",
                text: "Unable to copy text to clipboard.",
                showConfirmButton: false,
                timer: 2000,
                background: "#ffffff",
                customClass: {
                  title: "text-red-800 font-semibold",
                  content: "text-gray-600",
                },
              });
            });
        };
      },
      customClass: {
        title: "text-2xl font-bold",
        confirmButton: "px-6 py-2 text-white bg-black font-semibold rounded-md",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show error is image not selected
    if (!doctorImage) {
      setLoading(false);
      setIsError("Please Select An Image For Your Profile!");
      return;
    }

    // Upload Image To imgBB
    const imageUrl = await imgUpload(doctorImage);
    // Show error if image upload failed
    if (!imageUrl) {
      setLoading(false);
      setIsError("Image Upload Failed! Try Again");
      return;
    }

    // Department Validation
    if (!department) {
      setLoading(false);
      setIsError("Department Is Required");
      return;
    }

    // Shift & Fee Validation
    if (!selectedShift) {
      setLoading(false);
      setIsError("Shift Is Required");
      return;
    }

    if (isNaN(consultationFee) || consultationFee < 0) {
      setLoading(false);
      setIsError("Please provide a valid consultation fee");
      return;
    }

    // Service & Availability
    if (!services || services.length < 4) {
      setLoading(false);
      setIsError("Minimum 4 Services Are Required");
      return;
    }

    if (!availability || availability.length < 3) {
      setLoading(false);
      setIsError("Minimum 3 Available Days Are Required");
      return;
    }

    // Password Validation
    if (!signal.lowercase) {
      setLoading(false);
      setIsError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!signal.uppercase) {
      setLoading(false);
      setIsError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!signal.number) {
      setLoading(false);
      setIsError("Password must contain at least one number.");
      return;
    }

    if (!signal.symbol) {
      setLoading(false);
      setIsError("Password must contain at least one special character.");
      return;
    }

    if (!signal.length) {
      setLoading(false);
      setIsError("Password must be at least 8 characters long.");
      return;
    }

    if (!signal.strong) {
      setLoading(false);
      setIsError("Password strength is too weak.");
      return;
    }

    // Phone Number Validation
    if (!validateBangladeshiNumber(phoneNumber)) {
      setLoading(false);
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
      return;
    }

    // doctorData
    const doctor = {
      name: name,
      title: department,
      role: "doctor",
      email: email,
      image: imageUrl,

      password: strongPassword,

      experience: (experience + "+ years").toString(),
      chamber: "CareMatrix",
      services: services,
      bio: bio,

      available_days: availability,
      schedule: schedule,
      shift: selectedShift,
      consultation_fee: "$" + consultationFee,

      rating: 4.0,
      vote: 10,
      number_of_feedback: 0,
      treated_patients: parseInt(treatedPatients),
    };

    try {
      // Send Post Request In Server
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/firebase/assign-doctor`,
        doctor
      );
      // Show Confirm Modal
      if (data?.mongoDB?.insertedId) {
        setIsDoctorFormOpen(false);
        refetch();
        setDepartment("");
        setName("");
        setDoctorImage("");
        setEmail("");
        setDoctorPreview("");
        setIsError("");
        setPhoneNumber(880);
        setInputValue("");
        setExperience(null);
        setConsultationFee(null);
        setSelectedShift("");
        setStrongPassword("");
        setTreatedPatients(null);
        setAvailability([]);
        setServiceValue("");
        setSchedule(null);
        setServices([]);
        setBio("");
        setSignal({
          lowercase: false,
          uppercase: false,
          number: false,
          symbol: false,
          length: false,
          strong: false,
        });
        showConfirmModal("Doctor", doctor?.email, doctor?.password);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      setIsError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg">
      <CardContent className="px-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name, Email, Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <div className="w-full space-y-2">
              <Label>Doctor Name</Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter Doctor Name"}
              />
            </div>
            {/* Email */}
            <div className="w-full space-y-2">
              <Label>Doctor Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Enter Doctor Email"}
              />
            </div>
            {/* Select Department */}
            <div className="w-full space-y-2">
              <Label>Select Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="gynecology">Gynecology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="urology">Urology</SelectItem>
                  <SelectItem value="gastroenterology">
                    Gastroenterology
                  </SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
                  <SelectItem value="ent">ENT (Ear, Nose, Throat)</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="nephrology">Nephrology</SelectItem>
                  <SelectItem value="emergency">Emergency Medicine</SelectItem>
                  <SelectItem value="general_surgery">
                    General Surgery
                  </SelectItem>
                  <SelectItem value="internal_medicine">
                    Internal Medicine
                  </SelectItem>
                  <SelectItem value="pulmonology">Pulmonology</SelectItem>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Consultation Fee, Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* consultation_fee */}
            <div className="w-full space-y-2">
              <Label>Consultation Fee</Label>
              <Input
                type="number"
                required
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
                placeholder={"Enter Doctor Consultation Fee"}
              />
            </div>
            {/* experience */}
            <div className="w-full space-y-2">
              <Label>Experience Year</Label>
              <Input
                type="number"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder={"Enter Doctor Experience Year"}
              />
            </div>
          </div>
          {/* Service*/}
          <div className="mt-4 w-full">
            <div>
              <Label className="block mb-2">
                Enter Services (Press Enter To Add){" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-black text-white rounded flex items-center gap-1"
                  >
                    {service}
                    <button
                      className="ml-2 text-white font-bold hover:cursor-pointer duration-300 hover:text-red-500"
                      onClick={() => removeServices(service)}
                    >
                      <X />
                    </button>
                  </span>
                ))}
                <Input
                  type="text"
                  className="outline-none flex-1"
                  value={serviceValue}
                  onChange={handleServiceChange}
                  onKeyDown={handleServiceKeyDown}
                  placeholder="Add Services..."
                />
              </div>
            </div>
          </div>
          {/* Available Days */}
          <div className="mt-4 w-full">
            <div>
              <Label className="block mb-2">
                Enter Availability Days (Press Enter To Add){" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
                {availability.map((available, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-black text-white rounded flex items-center gap-1"
                  >
                    {available}
                    <button
                      className="ml-2 text-white font-bold hover:cursor-pointer duration-300 hover:text-red-500"
                      onClick={() => removeAvailability(available)}
                    >
                      <X />
                    </button>
                  </span>
                ))}
                <Input
                  type="text"
                  className="outline-none flex-1"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Add Availability Days..."
                />
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="mt-4 w-full">
            <div className="space-y-2">
              <Label>Doctor Bio</Label>
              <Textarea
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={"flex flex-grow"}
                placeholder="Enter Doctor Bio Here..."
              />
            </div>
          </div>
          {/* Schedule, Shift, Treated Patient */}
          <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Schedule */}
            <div className="w-full space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                type="datetime-local"
                required
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="Select a schedule"
                className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
            {/* Shift */}
            <div className="w-full space-y-2">
              <Label>Choose Shift</Label>
              <Select
                value={selectedShift}
                onValueChange={(val) => setSelectedShift(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning (6AM - 2PM)">
                    Morning (6AM - 2PM)
                  </SelectItem>
                  <SelectItem value="Afternoon (2PM - 10PM)">
                    Afternoon (2PM - 10PM)
                  </SelectItem>
                  <SelectItem value="Night (10PM - 6AM)">
                    Night (10PM - 6AM)
                  </SelectItem>
                  <SelectItem value="Rotating">Rotating Shift</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Treated Patient  */}
            <div className="w-full space-y-2">
              <Label>Treated Patient </Label>
              <Input
                type="number"
                required
                value={treatedPatients}
                onChange={(e) => setTreatedPatients(e.target.value)}
                placeholder={"Enter Doctor Treated Patient Count"}
              />
            </div>
          </div>
          {/* PhoneNumber, Photo */}
          <div className="grid mt-4 grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {/* PhoneNumber */}
            <div className="w-full space-y-2">
              <Label>Doctor Phone Number</Label>
              <Input
                type="number"
                required
                value={phoneNumber}
                onChange={handlePhoneChange}
                pattern="\8801[3-9][0-9]{8}"
                maxLength={13}
                placeholder={"Enter Doctor Phone Number"}
              />
            </div>
            {/* Photo */}
            <div className="w-full space-y-2">
              <Label>Select Doctor Photo</Label>
              <div className="w-full">
                <Input
                  type="file"
                  name="image"
                  id="image_input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {doctorPreview === "" ? (
                  <div
                    className="w-full md:w-[100%] flex items-center gap-3 border py-[5.6px] rounded-lg px-4 cursor-pointer"
                    onClick={handleUploadImage}
                  >
                    <FaFileUpload className="text-[1.5rem] text-gray-500" />
                    <p className="text-gray-700 text-xs">
                      Browse To Upload Ranking Image File
                    </p>
                  </div>
                ) : (
                  <div className="w-full border rounded-lg p-0.5 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 pl-2">
                      <img
                        src={doctorPreview}
                        alt="Selected file preview"
                        className="mx-auto object-cover rounded-lg w-7 h-7"
                      />
                      {doctorImage && (
                        <div>
                          <p className="text-[10px] font-medium text-gray-700">
                            {doctorImage.name}
                          </p>
                          <p className="text-[9px] text-gray-500">
                            {(doctorImage.size / 1024).toFixed(2)} KB |{" "}
                            {doctorImage.type}
                          </p>
                        </div>
                      )}{" "}
                    </div>
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 rounded-r-lg mr-[1px] cursor-pointer"
                      onClick={() => {
                        setDoctorPreview("");
                        setDoctorImage(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Password, Confirmed Password */}
          <div className="grid mt-4 grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {/* Password */}
            <div className="w-full space-y-2">
              <Label>Password</Label>
              <Input
                type="text"
                value={strongPassword}
                onChange={handlePasswordChange}
                placeholder={"Enter Strong Password"}
                required
              />
            </div>
            {/* Confirmed Password */}
            <div className="w-full space-y-2">
              <Label>Confirmed Password</Label>
              <Input
                type="text"
                readonly
                value={strongPassword}
                // onChange={handlePasswordChange}
                placeholder={"Enter Confirmed Password"}
              />
            </div>
          </div>
          {/* Error */}
          <div className="mt-4 mb-4">
            <IsError isError={isError} />
          </div>
          {/* Add Doctor Button */}
          <Button
            type="submit"
            disabled={loading}
            className={"cursor-pointer px-8"}
          >
            {loading ? "Assigning Doctor..." : "Assign Doctor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AssignDoctorForm;
