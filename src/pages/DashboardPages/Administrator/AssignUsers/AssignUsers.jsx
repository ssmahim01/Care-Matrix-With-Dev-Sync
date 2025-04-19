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
import AddMedicine from "@/components/Modal/AddMedicine";
import { medicine_categories } from "@/lib/pharmacy";

const AssignUsers = () => {
  return (
    <div className="px-7">
      <DashboardPagesHeader
        title={"Assign New Users"}
        subtitle={
          "Easily add and manage assigned users with specific roles like Doctor, Pharmacist, Receptionist, \n or Admin. View existing assignments and onboard new team members in one place."
        }
        icon={UserPlus}
      />
      {/* Assign User */}
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
          <div className="flex flex-1 w-full">
            <Select
            // value={selectedCategory} onValueChange={setCategory}
            >
              <SelectTrigger className="w-[100%] md:w-[150px] lg:w-[200px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem>{"Administrator"}</SelectItem> */}
                {/* <SelectItem>{"Pharmacist"}</SelectItem> */}
                {/* <SelectItem>{"Receptionist"}</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-full">
            <Select
            // value={sort} onValueChange={setSort}
            >
              <SelectTrigger className="w-[100%] md:w-[150px] lg:w-[200px]">
                <SelectValue placeholder="Sort By">
                  {/* {sort ? sortOptions[sort] : "Sort By"} */}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
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
            <Button>Assign New User</Button>
          </div>
        </div>
      </div>
      {/* User Table */}
      <AssignUsersTable />
    </div>
  );
};

export default AssignUsers;
