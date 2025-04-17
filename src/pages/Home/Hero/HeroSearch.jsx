import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegFile } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
export const peoplesData = [
  {
    name: "Emily Johnson",
    picture:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1724422719~exp=1724426319~hmac=0ef6c552041a747907df66c476c3e7785bd05b39e09c2f54fa04367876376dfa&w=996",
    email: "emily.johnson@example.com",
    emailCount: 12,
    fileCount: null,
  },
  {
    name: "Michael Brown",
    picture:
      "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724422850~exp=1724426450~hmac=7a97c16dbec9136ae629c05ef06d0c108c5f768493a2cd105ed06e1e059ffca2&w=740",
    email: "michael.brown@example.com",
    emailCount: 6,
    fileCount: 3,
  },
  {
    name: "Sophia Williams",
    picture:
      "https://img.freepik.com/free-photo/front-view-smiley-business-man_23-2148479583.jpg?t=st=1724422909~exp=1724426509~hmac=dbbbe6ba54c4c4fd7201076106decb3439f1beb48102a69ce2880283680ee650&w=826",
    email: "sophia.williams@example.com",
    emailCount: 24,
    fileCount: 10,
  },
  {
    name: "James Smith",
    picture:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?t=st=1724422836~exp=1724426436~hmac=170d19af0485e5196848d41f6a7298d320fec8ce665445c9f37ac9ee537bedfc&w=826",
    email: "james.smith@example.com",
    emailCount: 5,
    fileCount: null,
  },
  {
    name: "Olivia Davis",
    picture:
      "https://img.freepik.com/free-photo/indoor-studio-shot-attractive-beautiful-pretty-young-woman-wearing-eyeglasses-yellow-sweatshirt-having-long-fair-hair-posing-isolated-pink-wall-people-emotions-concept_176532-6755.jpg?t=st=1724423006~exp=1724426606~hmac=616b0852a84a45ed1da08a2100bb732bc690b807d840e4cf02a0880aff3d7e68&w=996",
    email: "olivia.davis@example.com",
    emailCount: 1,
    fileCount: 12,
  },
];
const HeroSearch = () => {
  const [keyPressOpen, setKeyPressOpen] = useState(false);

  return (
    <div className="relative w-full sm:w-[80%] product_search_input z-40">
      <input
        className="px-4 py-2 border border-border bg-white rounded-md w-full pl-[40px] outline-none"
        placeholder="Search..."
        onClick={() => setKeyPressOpen(!keyPressOpen)}
      />
      <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

      <Button
        variant="outline"
        size="sm"
        className="absolute top-[4.7px] right-1.5"
      >
        Search
      </Button>

      {/* Dropdown Container */}
      <div
        className={`${
          keyPressOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } fixed sm:absolute top-[110px] left-1/2 -translate-x-1/2 mt-2 w-[95vw] sm:w-[600px] max-w-[95vw] bg-white shadow-2xl border border-gray-200 transition-all duration-300 transform rounded-md z-[9999]`}
      >
        <div className="p-4">
          {/* Last Search */}
          <p className="text-[0.9rem] text-gray-500">Last Search</p>
          <div className="flex items-center gap-[10px] flex-wrap mt-2">
            {["Programming", "ZenUI Library", "Templates", "Blocks"].map(
              (term) => (
                <div
                  key={term}
                  className="py-[5px] px-[10px] rounded-full border border-gray-300 text-gray-500 text-[0.7rem] flex items-center gap-[5px] hover:bg-gray-50 cursor-pointer"
                >
                  <p>{term}</p>
                </div>
              )
            )}
          </div>

          {/* People List */}
          <div className="border-t border-gray-200 mt-5 pt-[15px]">
            <p className="text-[0.9rem] text-gray-500">
              Peoples{" "}
              <span className="text-[0.8rem] text-gray-400">
                ({peoplesData.length})
              </span>
            </p>

            <div className="mt-4 h-[300px] overflow-y-auto">
              {peoplesData?.map((people, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-[10px] items-center justify-between w-full hover:bg-gray-100 p-[10px] cursor-pointer rounded-md group"
                >
                  <div className="flex items-center gap-[15px]">
                    <img
                      src={people.picture}
                      alt="avatar"
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-[1.1rem] font-[500] text-gray-800">
                        {people.name}
                      </h3>
                      <p className="text-[0.8rem] break-all text-gray-500">
                        {people.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px] z-[-1] opacity-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-300">
                    <div className="flex items-center gap-[5px] rounded-full bg-white border py-[2px] px-2 border-gray-200 text-[0.8rem] text-gray-500 cursor-pointer">
                      <MdOutlineEmail className="text-[1rem]" />
                      {people.emailCount}
                    </div>
                    {people.fileCount && (
                      <div className="flex items-center gap-[5px] rounded-full bg-white border py-[2px] px-2 border-gray-200 text-[0.8rem] text-gray-500 cursor-pointer">
                        <FaRegFile className="text-[0.9rem]" />
                        {people.fileCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
