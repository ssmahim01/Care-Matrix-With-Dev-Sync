import { Button } from "@/components/ui/button";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { UserPlus } from "lucide-react";
import AssignUsersTable from "./AssignUsersTable";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import AssignUserForm from "./AssignUserForm";

const AssignUsers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
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
            // onChange={(e) => setSearch(e.target.value)}
            // value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          {/* shortcut hint */}
          <div className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-100 p-[6px] rounded-md text-gray-500">
            Ctrl + E
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          {/* Select Role */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit"
              // value={selectedCategory} onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {/* <SelectItem>{"Administrator"}</SelectItem> */}
                {/* <SelectItem>{"Pharmacist"}</SelectItem> */}
                {/* <SelectItem>{"Receptionist"}</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit"
              // value={sort} onValueChange={setSort}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By">
                  {/* {sort ? sortOptions[sort] : "Sort By"} */}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-fit">
                {/* {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>
          {/* Reset & Add Button */}
          <div className="flex items-center flex-wrap gap-2">
            <Button>Reset</Button>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer"}
            >
              Assign New User
            </Button>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer"}
            >
              Assign Doctor
            </Button>
          </div>
        </div>
      </div>
      {/* Assign User Form */}
      <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
        <AssignUserForm />
      </div>
      {/* User Table */}
      <AssignUsersTable />
    </div>
  );
};

export default AssignUsers;
