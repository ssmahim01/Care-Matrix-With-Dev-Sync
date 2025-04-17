import { Button } from "@/components/ui/button";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaRegFile } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdMoney, MdOutlineEmail, MdReviews } from "react-icons/md";
import { Link } from "react-router";
import HeroDoctorSkeleton from "./HeroDoctorSkeleton";

const HeroSearch = () => {
  const wrapperRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const [keyPressOpen, setKeyPressOpen] = useState(false);
  const [department, setDepartment] = useState("");
  const [doctors, setDoctors] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch Doctors
  const { data = {}, isLoading } = useQuery({
    queryKey: ["search-doctor-data", search],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/dashboard/administrator/doctors/search?search=${search}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (department) {
      const filteredDoctors = data?.doctors?.filter(
        (p) => p.title === department
      );
      setDoctors(filteredDoctors || []);
    } else {
      setDoctors(data?.doctors || []);
    }
  }, [department, data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setKeyPressOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full sm:w-full product_search_input z-40"
    >
      <input
        className="px-4 py-2 border border-border bg-white rounded-md w-full pl-[40px] outline-none cursor-pointer"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setKeyPressOpen(true)}
      />
      <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

      {search || department ? (
        <Button
          onClick={() => {
            setSearch("");
            setDepartment(null);
          }}
          size="sm"
          className="absolute top-[4.7px] right-1.5 duration-500 cursor-pointer"
        >
          Reset
        </Button>
      ) : (
        <Button
          size="sm"
          className="absolute top-[4.7px] right-1.5 bg-blue-600 hover:bg-blue-700 duration-500 cursor-pointer"
        >
          Search
        </Button>
      )}

      {/* Dropdown Container */}
      <div
        className={`${
          keyPressOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } fixed sm:absolute top-full mt-2 w-full bg-white shadow-2xl border border-gray-200 transition-all duration-300 transform rounded-md z-50`}
      >
        <div className="p-4">
          {/* Department */}
          <p className="text-[0.9rem] text-gray-500">Filter By Department</p>
          <div className="flex items-center gap-[10px] flex-wrap mt-2">
            {data?.departments?.map((i) => (
              <button
                key={i}
                onClick={() => setDepartment(i)}
                className={`py-[5px] px-[6px] rounded-full border text-[0.7rem] flex items-center gap-[1px] hover:bg-gray-50 cursor-pointer ${
                  department === i
                    ? "bg-blue-100 text-blue-600 font-medium border-blue-500"
                    : "border-gray-300 text-gray-500 "
                }`}
              >
                <p>{i || "Department..."}</p>
              </button>
            ))}
          </div>

          {/* Doctors List */}
          <div className="border-t border-gray-200 mt-5 pt-[15px]">
            <p className="text-[0.9rem] text-gray-500">Doctors</p>

            <div className="mt-4 h-[300px] overflow-y-auto">
              {isLoading ? (
                <HeroDoctorSkeleton />
              ) : (
                doctors?.map((doctor, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap gap-[10px] items-center justify-between w-full hover:bg-gray-100 p-[10px] cursor-pointer rounded-md group"
                  >
                    <div className="flex items-center gap-[15px]">
                      <img
                        src={doctor?.image || ""}
                        alt="avatar"
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[0.8rem] break-all text-gray-500">
                          {doctor?.title || "Department"}
                        </p>
                        <h3 className="text-[1.1rem] font-[500] text-gray-800">
                          {doctor?.name || "Doctor Name"}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-[10px] duration-300">
                        <div className="flex items-center gap-[5px] rounded-full bg-white border py-[2px] px-2 border-gray-200 text-[0.8rem] text-gray-500 cursor-pointer">
                          <MdMoney className="text-[1rem]" />
                          {doctor?.consultation_fee || "$000"}
                        </div>
                        <div className="flex items-center gap-[5px] rounded-full bg-white border py-[2px] px-2 border-gray-200 text-[0.8rem] text-gray-500 cursor-pointer">
                          <MdReviews className="text-[0.9rem]" />
                          {doctor?.rating || "1.0"}
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/doctor-details/${doctor._id}`}
                          state={doctor._id}
                        >
                          <Button
                            size="xs"
                            variant={"outline"}
                            className={
                              "w-[96%] py-1 px-2 text-gray-800 text-xs cursor-pointer"
                            }
                          >
                            Book Appointment
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
