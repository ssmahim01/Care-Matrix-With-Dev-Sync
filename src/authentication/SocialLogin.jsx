import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import auth from "@/firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SocialLogin = ({ setIsError }) => {
  const navigate = useNavigate();

  // Google & Github SignIn Function
  const handleSocialLogin = (provider) => {
    setIsError("");
    signInWithPopup(
      auth,
      provider === "google" ? googleProvider : githubProvider
    )
      .then(async (result) => {
        const currentUser = result.user;
        const userData = {
          email: currentUser?.email,
          name: currentUser?.displayName,
          photo: currentUser?.photoURL,
          // phoneNumber: "",
          uid: currentUser?.uid,
          createdAt: new Date(
            currentUser?.metadata?.creationTime
          ).toISOString(),
          lastLoginAt: new Date(
            currentUser?.metadata?.lastSignInTime
          ).toISOString(),
          providerId: currentUser?.providerData[0].providerId,
        };
        // save userData in db --->
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

        navigate("/");
        toast.success(<b>Login Successful!</b>, {
          description:
            "Welcome back! You have successfully logged into your account",
          duration: 1000,
          position: "top-right",
          style: {
            marginTop: "20px",
          },
        });

        // Update lastLoginAt Time
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/last-login-at/${
            currentUser.email
          }`,
          {
            lastLoginAt: new Date(
              currentUser?.metadata?.lastSignInTime
            ).toISOString(),
          }
        );
      })
      .catch((error) =>
        setIsError(
          error?.message.includes("Firebase:")
            ? error?.message.split("Firebase:")[1]
            : error?.message || "Registration Failed!"
        )
      );
  };
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
            onClick={() => handleSocialLogin("google")}
            className="w-full border-blue-200/50 shadow-sm shadow-blue-200/50 flex items-center text-base gap-2 font-medium cursor-pointer duration-500 py-5"
          >
            <FaGoogle /> Google
          </Button>
        </div>
        {/* Github */}
        <div className="w-full">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("github")}
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
