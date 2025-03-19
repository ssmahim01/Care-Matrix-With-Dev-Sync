import { Link, useLocation } from "react-router";

const NavigateTo = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="mt-4 text-center text-base font-medium text-gray-800">
      {pathname === "/register" ? "Already" : "Don't"} have an account?{" "}
      <Link to={pathname === "/register" ? "/login" : "/register"}>
        <span className="text-black cursor-pointer hover:underline hover:text-[#0E82FD] duration-300">
          {pathname === "/register" ? "Login" : "Register"}
        </span>
      </Link>
    </div>
  );
};

export default NavigateTo;
