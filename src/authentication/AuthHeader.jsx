import logo from "@/assets/logo.jpg";
import { IoIosLogIn } from "react-icons/io";
import { Link, useLocation } from "react-router";

const AuthHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <div>
        <Link to="/">
          <img src={logo} alt="Care-Matrix logo" className="w-44" />
        </Link>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl -ml-[4px] font-bold tracking-wider flex items-center gap-1">
          <IoIosLogIn className="mt-[2px]" size={35} />
          {pathname === "/login"
            ? "Welcome Back, Login!"
            : "Create Your Account!"}
        </h1>
        <p className="text-[15px] tracking-wide mt-1 text-gray-800">
          Unlock Seamless Healthcare Management with Care-Matrix{" "}
          <span className="text-gray-500">——</span> Your Gateway to Smarter,
          Faster, and More Efficient Care.
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
