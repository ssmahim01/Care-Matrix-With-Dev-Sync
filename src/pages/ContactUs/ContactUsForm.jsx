import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useAuthUser } from "@/redux/auth/authActions";
import UnderLineButton from "@/shared/Section/UnderLineButton";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const user = useAuthUser();
  const axiosPublic = useAxiosPublic();
  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState("");

  const formData = {
    username,
    email,
    phoneNumber,
    message,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("You Must Be Login To Send Message");
    } else {
      try {
        if (formData.message.length > 350)
          return toast.error(
            "Your message is too long, Please keep it under 350 characters!"
          );
        await toast.promise(axiosPublic.post(`/contact`, formData), {
          loading: "Sending Your Message...",
          success: "Your Message Was Sent Successfully!",
        });
      } catch (error) {
        toast.error(error?.message || "Error Caught While Sending Message");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-[20px]">
      <div>
        {/* First Name */}
        <div className="space-y-1">
          <Label className="text-[1rem] text-gray-900 font-[400]">
            Username
          </Label>
          <Input
            type="text"
            required
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {/* Email & Phone Number */}
      <div className="flex flex-col sm:flex-row items-center gap-[30px] mt-6">
        {/* Email */}
        <div className="flex flex-col gap-[5px] w-full sm:w-[50%] space-y-1">
          <Label className="text-[1rem] text-gray-900 font-[400]">
            Email Address
          </Label>
          <Input
            type="email"
            required
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Phone Number */}
        <div className="flex flex-col gap-[5px] w-full sm:w-[50%] space-y-1">
          <Label className="text-[1rem] text-gray-900 font-[400]">
            Phone Number
          </Label>
          <Input
            type="text"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      {/* Message */}
      <div className="flex flex-col gap-[5px] w-full mt-6 space-y-1">
        <Label className="text-[1rem] text-gray-900 font-[400]">
          Write Message
        </Label>
        <Textarea required onChange={(e) => setMessage(e.target.value)} />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-end mt-3"
      >
        <UnderLineButton text={"Send Message"} />
      </button>
    </form>
  );
};

export default ContactUsForm;
