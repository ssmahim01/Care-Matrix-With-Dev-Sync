import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const UsersTable = () => {
  const initialData = Array.from({ length: 35 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));

  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const selectRef = useRef(null);
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handlePageChange3 = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const toggleAllInPage = (event) => {
    const newSelected = new Set(selectedRows);
    paginatedData.forEach((item) => {
      if (event.target.checked) {
        newSelected.add(item.id);
      } else {
        newSelected.delete(item.id);
      }
    });
    setSelectedRows(newSelected);
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const isAllInPageSelected = paginatedData.every((item) =>
    selectedRows.has(item.id)
  );

  const handleBulkDelete = () => {
    console.log("Deleting selected rows:", Array.from(selectedRows));
  };

  const handleOptionClick = (value) => {
    setPageSize(Number(value));
    setCurrentPage(1);
    setIsOpen(false);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", () => {
        handleOutsideClick();
      });
  }, []);

  return (
    <div className="customTable overflow-y-auto mb-4 flex items-center flex-col gap-5 justify-center">
      <div className="w-full mx-auto">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm py-2.5 px-4 lg:w-2/5 md:w-1/2 border border-gray-200 rounded-md outline-none focus:border-blue-300"
            />
            {selectedRows.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 text-red-500"
              >
                <BiSolidTrash className="h-4 w-4" />
                Delete Selected ({selectedRows.size})
              </button>
            )}
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden w-full">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 w-14">
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAllInPageSelected}
                      className="hidden"
                      onChange={toggleAllInPage}
                    />
                    <div className="relative">
                      <span
                        className={`${
                          isAllInPageSelected
                            ? "opacity-100 z-20 scale-[1]"
                            : "opacity-0 scale-[0.4] z-[-1]"
                        } transition-all duration-200 absolute top-0 left-0`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Group 335">
                            <rect
                              id="Rectangle 331"
                              x="-0.00012207"
                              y="6.10352e-05"
                              width="20"
                              height="20"
                              rx="4"
                              className="fill-[#3B9DF8]"
                              stroke="#3B9DF8"
                            ></rect>
                            <path
                              id="Vector"
                              d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                              fill="white"
                            ></path>
                          </g>
                        </svg>
                      </span>

                      <span
                        className={`${
                          !isAllInPageSelected
                            ? "opacity-100 z-20 scale-[1]"
                            : "opacity-0 scale-[0.4] z-[-1]"
                        } transition-all duration-200`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Group 335">
                            <rect
                              id="Rectangle 331"
                              x="-0.00012207"
                              y="6.10352e-05"
                              width="20"
                              height="20"
                              rx="4"
                              className="fill-transparent"
                              stroke="#ccc"
                            ></rect>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </label>
                </th>
                {Object.keys(initialData[0]).map(
                  (key) =>
                    key !== "id" && (
                      <th
                        key={key}
                        className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center gap-[5px]">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                        </div>
                      </th>
                    )
                )}
                <th className="p-3 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-gray-200 cursor-pointer ${
                    selectedRows.has(item.id)
                      ? "bg-blue-50 hover:bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    <label className="flex items-center gap-[10px] cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() => toggleRow(item.id)}
                      />
                      <div className="relative">
                        <span
                          className={`${
                            selectedRows.has(item.id)
                              ? "opacity-100 z-20 scale-[1]"
                              : "opacity-0 scale-[0.4] z-[-1]"
                          } transition-all duration-200 absolute top-0 left-0`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Group 335">
                              <rect
                                id="Rectangle 331"
                                x="-0.00012207"
                                y="6.10352e-05"
                                width="20"
                                height="20"
                                rx="4"
                                className="fill-[#3B9DF8]"
                                stroke="#3B9DF8"
                              ></rect>
                              <path
                                id="Vector"
                                d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                                fill="white"
                              ></path>
                            </g>
                          </svg>
                        </span>

                        <span
                          className={`${
                            !selectedRows.has(item.id)
                              ? "opacity-100 z-20 scale-[1]"
                              : "opacity-0 scale-[0.4] z-[-1]"
                          } transition-all duration-200`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Group 335">
                              <rect
                                id="Rectangle 331"
                                x="-0.00012207"
                                y="6.10352e-05"
                                width="20"
                                height="20"
                                rx="4"
                                className="fill-transparent"
                                stroke="#ccc"
                              ></rect>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </label>
                  </td>
                  {Object.entries(item).map(
                    ([key, value]) =>
                      key !== "id" && (
                        <td key={key} className="p-3">
                          {value}
                        </td>
                      )
                  )}
                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(item.id)}
                      className="action-btn action-btn text-gray-600 cursor-pointer"
                    />

                    <div
                      className={`${
                        openActionMenuId === item.id
                          ? "opacity-100 scale-[1] z-30"
                          : "opacity-0 scale-[0.8] z-[-1]"
                      }
                                        ${
                                          index > 2
                                            ? "bottom-[90%]"
                                            : "top-[90%]"
                                        }
                                        zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdOutlineEdit />
                        Edit
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdDeleteOutline />
                        Delete
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!paginatedData?.length && (
            <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
              No data found!
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <div className="text-sm w-full text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
              {sortedData.length} results
            </div>

            <div ref={selectRef} className="relative w-44">
              <button
                onClick={handleToggle}
                className="w-max px-2 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
              >
                {pageSize}

                <IoIosArrowDown
                  className={`${
                    isOpen ? "rotate-[180deg]" : "rotate-0"
                  } transition-all duration-200`}
                />
              </button>
              {isOpen && (
                <div className="absolute w-max overflow-hidden mt-1 bg-white border border-gray-300 rounded shadow-lg">
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick(5)}
                  >
                    5
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick(10)}
                  >
                    10
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick(20)}
                  >
                    20
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick(50)}
                  >
                    50
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange3(currentPage - 1)}
              disabled={currentPage === 1}
              className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronLeft />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange3(pageNum)}
                    className={`${
                      pageNum === currentPage && "bg-black text-white"
                    } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange3(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
