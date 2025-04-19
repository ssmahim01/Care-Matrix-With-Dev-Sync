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
import { imgUpload } from "@/lib/imgUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AssignUserForm = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(880);
  const [strongPassword, setStrongPassword] = useState("");
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
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

  const showConfirmModal = (role, email, password) => {
    Swal.fire({
      title: "Account Created Successfully",
      html: `
        <div class="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
          <div class="mb-4 text-center">
            <span class="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              ${role.charAt(0).toUpperCase() + role.slice(1)} Role
            </span>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <div>
                <p class="text-sm text-gray-600">Email</p>
                <p id="copy-email" class="font-medium text-blue-800">${email}</p>
              </div>
              <button onclick="copyToClipboard('copy-email')" 
                      class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <div>
                <p class="text-sm text-gray-600">Password</p>
                <p id="copy-password" class="font-medium text-blue-800">${password}</p>
              </div>
              <button onclick="copyToClipboard('copy-password')" 
                      class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: "Done",
      confirmButtonColor: "#2563eb",
      background: "#f3f4f6",
      didOpen: () => {
        window.copyToClipboard = (id) => {
          const text = document.getElementById(id).innerText;
          navigator.clipboard
            .writeText(text)
            .then(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Copied to clipboard!",
                text: "The text has been copied successfully.",
                showConfirmButton: false,
                timer: 2000,
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
        title: "text-2xl text-blue-900 font-bold",
        confirmButton: "px-6 py-2 text-white font-semibold rounded-md",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Show error is image not selected
    if (!image) {
      setLoading(false);
      setIsError("Please Select An Image For Your Profile!");
      return;
    }

    // Upload Image To imgBB
    const imageUrl = await imgUpload(image);
    // Show error if image upload failed
    if (!imageUrl) {
      setLoading(false);
      setIsError("Image Upload Failed! Try Again");
      return;
    }

    // Role Validation
    if (!role) {
      setLoading(false);
      setIsError("Role Is Required");
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

    const user = {
      email,
      role,
      name,
      image: imageUrl,
      password: strongPassword,
      phoneNumber,
    };

    try {
      console.log(user);
      showConfirmModal(user?.role, user?.email, user?.password);
    } catch (error) {
      toast.error(error?.message);
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
              <Label>Username</Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter Username"}
              />
            </div>
            {/* Email */}
            <div className="w-full space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Enter User Email"}
              />
            </div>
            {/* Select Role */}
            <div className="w-full space-y-2">
              <Label>Select Role</Label>{" "}
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* PhoneNumber, Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {/* PhoneNumber */}
            <div className="w-full space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="number"
                required
                value={phoneNumber}
                onChange={handlePhoneChange}
                pattern="\8801[3-9][0-9]{8}"
                maxLength={13}
                placeholder={"Enter Phone Number"}
              />
            </div>
            {/* Photo */}
            <div className="w-full space-y-2">
              <Label>Select Photo</Label>
              <div className="w-full">
                <Input
                  type="file"
                  name="image"
                  id="image_input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {preview === "" ? (
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
                        src={preview}
                        alt="Selected file preview"
                        className="mx-auto object-cover rounded-lg w-7 h-7"
                      />
                      {image && (
                        <div>
                          <p className="text-[10px] font-medium text-gray-700">
                            {image.name}
                          </p>
                          <p className="text-[9px] text-gray-500">
                            {(image.size / 1024).toFixed(2)} KB | {image.type}
                          </p>
                        </div>
                      )}{" "}
                    </div>
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 rounded-r-lg mr-[1px] cursor-pointer"
                      onClick={() => {
                        setPreview("");
                        setImage(null);
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
          <div className="mt-4">
            <IsError isError={isError} />
          </div>
          {/* Add User Button */}
          <Button
            type="submit"
            disabled={loading}
            className={"cursor-pointer px-8"}
          >
            {loading ? "Assigning User..." : "Assign User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AssignUserForm;
