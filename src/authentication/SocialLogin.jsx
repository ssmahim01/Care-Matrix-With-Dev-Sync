import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const SocialLogin = () => {
  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="divider font-medium text-gray-800">
          Or Continue With
        </div>
      </div>
      <div className="flex gap-4 justify-center w-full">
        {/* Google */}
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full border-blue-200/50 shadow-sm shadow-blue-200/50 flex items-center text-base gap-2 font-medium cursor-pointer duration-500 py-5"
          >
            <FaGoogle /> Google
          </Button>
        </div>
        {/* Github */}
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full border-blue-200/50 shadow-sm shadow-blue-200/50 flex items-center text-base gap-2 font-medium cursor-pointer duration-500 py-5"
          >
            <FaGithub /> Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
