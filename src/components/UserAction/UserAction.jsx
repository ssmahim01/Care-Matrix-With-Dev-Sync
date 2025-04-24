import { logOut, useAuthUser } from "@/redux/auth/authActions";
import { Separator } from "../ui/separator";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import useRole from "@/hooks/useRole";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { LogOut, Sparkles, User } from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

const UserAction = () => {
  const user = useAuthUser();
  const [role] = useRole();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useSidebar();

  const handleLogOut = () => {
    dispatch(logOut);
    toast.success("Log out successful");
    navigate("/");
  };

  return (
    <div className="mb-20">
      <div className={`lg:w-[1270px] mx-auto w-full bg-base-200 ${state === "collapsed" && "lg:w-[1470px]"} border-b shadow-sm fixed z-50 flex justify-between items-center py-1 md:pr-6 pr-2`}>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Remove fixed positioning to keep SidebarTrigger in the flex flow */}
            <SidebarTrigger className="-ml-1 bg-[#e2ebee] mb-0" />
          </div>
        </header>

        <div className="flex items-center">
          {/* Notifications */}
          <div className="relative hover:cursor-pointer">
            <IoIosNotifications className="text-[2rem] text-[#4986a4]" />
            <div className="absolute top-[-30%] right-[-10%]  text-secondary min-w-[20px] min-h-[20px] text-center">
              <span className="text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full">
                10
              </span>
            </div>
          </div>
          <FaRegCircleUser className="text-[1.4rem] text-[#ffffff]" />

          {/* Ensure the dropdown is visible and not overlapped */}
          <div className="dropdown dropdown-end avatar-online z-30">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost border-none btn-circle avatar w-12 h-12"
            >
              <img
                src={user?.photoURL}
                alt={user ? user?.displayName : "Guest user"}
                className="w-full h-full border-4 border-sky-500 rounded-full hover:border-gray-300 transition-all duration-300 hover:scale-105 cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 bg-opacity-60 rounded z-30 mt-2 w-80 py-3 shadow-md"
            >
              <div className="pl-2 *:font-bold flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="text-[1rem] font-semibold text-gray-800">
                    {user?.displayName}
                  </h1>
                  <p className="text-sm font-medium text-gray-800">
                    {user?.email}
                  </p>
                </div>

                <Separator />
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                      isActive
                        ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                        : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                    }`
                  }
                >
                  <User size={20} />
                  View Profile
                </NavLink>
                {role === "patient" && (
                  <NavLink
                    to="/dashboard/patient/request-form"
                    className={({ isActive }) =>
                      `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                        isActive
                          ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                          : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                      }`
                    }
                  >
                    <Sparkles size={20} />
                    Upgrade to Pro
                  </NavLink>
                )}

                <Separator />
                {/* Logout button */}
                <div>
                  <button
                    className={
                      "hover:bg-[#f1f5f9] transition-all duration-500 ease-in-out py-[6px] rounded-md cursor-pointer hover:text-red-500 flex items-center gap-2 w-full px-2 text-xs font-medium "
                    }
                    onClick={handleLogOut}
                  >
                    <LogOut className="hover:text-red-500" size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAction;
