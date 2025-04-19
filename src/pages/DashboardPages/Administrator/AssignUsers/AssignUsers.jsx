import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import AssignUsersTable from "./AssignUsersTable";
import { IoIosSearch } from "react-icons/io";
import { UserPlus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import AssignUserForm from "./AssignUserForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignUsers = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [sort, setSort] = useState("createdAt-desc");

  const sortOptions = {
    "createdAt-desc": "Created Date (Newest First)",
    "createdAt-asc": "Created Date (Oldest First)",
    "lastLoginAt-desc": "Last Login (Newest First)",
    "lastLoginAt-asc": "Last Login (Oldest First)",
  };

  // Get all assigned users data
  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["assigned-users", sort, search, selectedRole],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/firebase/users?sort=${sort}&search=${search}&role=${selectedRole}`
      );
      return data;
    },
  });

  if (error) return "Error While Fetching Data";

  return (
    <div className="px-7">
      <DashboardPagesHeader
        title={"Assign New Users"}
        subtitle={
          "Easily add and manage assigned users with specific roles like Doctor, Pharmacist, Receptionist, \n or Admin. View existing assignments and onboard new team members in one place."
        }
        icon={UserPlus}
      />
      {/* Searchbar & Select & Add button */}
      <div className="flex justify-between gap-4 items-center flex-wrap">
        {/* Searchbar */}
        <div className="relative w-full flex xl:flex-1">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Users..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          {/* shortcut hint */}
          <button
            onClick={() => setSearch("")}
            className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-300 p-[6px] rounded-md text-gray-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          {/* Select Role */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit"
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter By Role" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value={"administrator"}>
                  {"Administrator"}
                </SelectItem>
                <SelectItem value={"pharmacist"}>{"Pharmacist"}</SelectItem>
                <SelectItem value={"receptionist"}>{"Receptionist"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit text-xs"
              value={sort}
              onValueChange={setSort}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By" className="text-xs">
                  {sortOptions[sort] || "Sort By"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-fit">
                {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={"text-xs"}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Reset & Add Button */}
          <div className="flex items-center flex-wrap gap-2">
            <Button
              onClick={() => {
                setSearch("");
                setSelectedRole("");
                setSort("createdAt-desc");
              }}
              className={"cursor-pointer"}
            >
              Reset
            </Button>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer"}
            >
              Assign New User
            </Button>
            <Button className={"cursor-pointer"}>Assign Doctor</Button>
          </div>
        </div>
      </div>
      {/* Assign User Form */}
      <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
        <AssignUserForm refetch={refetch} setIsFormOpen={setIsFormOpen} />
      </div>
      {/* User Table */}
      <AssignUsersTable users={users} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default AssignUsers;
