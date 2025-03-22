import { deleteDoctor } from "@/redux/doctors/doctorSlice";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import FileInput from "../FileInput/FileInput";

const DoctorsTableRow = ({ doctor, index, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  const handleDeleteDoctor = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot retrieve this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(deleteDoctor(id));
        if (response) {
          toast.success("Doctor has been deleted");
        }
      }
    });
  };

  return (
    <>
      <tr
        className={`${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:shadow-lg hover:bg-gray-200 transition duration-200 text-gray-700 font-semibold`}
      >
        <th>{index + 1}</th>
        <td>
          <img
            className="w-14 h-12 rounded-lg object-cover"
            src={doctor?.image}
            alt={doctor?.name}
          />
        </td>
        <td>{doctor?.name}</td>
        <td>{doctor?.title}</td>
        <td>{doctor?.experience}</td>
        <td>{doctor?.consultation_fee}</td>
        <td>
          {/* <select
          className="select select-neutral hover:cursor-pointer"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option disabled={true} value={"Select Availability"}>Select Availability</option>
          <option value={doctor.available_days ? "Available" : "Not Available"}>{doctor?.available_days ? "Available" : "Not Available"}</option>
          <option value={"Not Available"}>Not Available</option>
        </select> */}
          <p
            className={`w-full ${
              doctor?.available_days && doctor?.available_days.length > 0
                ? "badge badge-success text-white"
                : "badge badge-error text-white"
            }`}
          >
            {doctor?.available_days && doctor?.available_days.length > 0
              ? "Available"
              : "N/A"}
          </p>
        </td>
        <td className="flex gap-2 lg:py-4 py-10 w-72">
          <button
            onClick={() => handleDeleteDoctor(doctor?._id)}
            className="btn btn-md inline-flex items-center gap-1 bg-rose-600 text-white rounded-none font-semibold px-4"
          >
            <Trash2 />
            <span className="text-base">Remove</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-md inline-flex items-center gap-1 bg-teal-600 text-white rounded-none font-semibold px-4"
          >
            <Edit2 />
            <span className="text-base">Edit</span>
          </button>
        </td>
      </tr>

      <div
        className={`${
          isModalOpen ? " visible" : " invisible"
        } w-full h-screen fixed overflow-auto top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
          } w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
        >
          <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
            <h1 className="text-[1.5rem] font-bold">Updated The Doctor</h1>
            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>

          <form onSubmit={handleUpdate} className="w-11/12 mx-auto space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="text-[15px] text-text font-[400]"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  // value={form.name}
                  // onChange={(e) =>
                  //   setForm({
                  //     ...form,
                  //     name: e.target.value,
                  //   })
                  // }
                  placeholder="Write the doctor name"
                  className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="specialty"
                  className="text-[15px] text-text font-[400]"
                >
                  Specialty <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="specialty"
                  id="specialty"
                  // value={form.title}
                  // onChange={(e) =>
                  //   setForm({
                  //     ...form,
                  //     title: e.target.value,
                  //   })
                  // }
                  placeholder="Type the doctor Specialty"
                  className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                  required
                />
              </div>
            </div>

              <div className="p-4 border rounded w-full">
                <label className="block mb-2">
                  Enter Availability Days (Press Enter or , to add){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 border p-2 rounded">
                  {/* {availability.map((available, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
                    >
                      {available}
                      <button
                        className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
                        // onClick={() => removeAvailability(available)}
                      >
                        <X />
                      </button>
                    </span>
                  ))} */}
                  <input
                    type="text"
                    className="outline-none flex-1"
                    // value={inputValue}
                    // onChange={handleInputChange}
                    // onKeyDown={handleKeyDown}
                    placeholder="Add availability days..."
                  />
                </div>
              </div>

            <div className="flex flex-col items-center">
              <div className="w-full">
                <label
                  htmlFor="experience"
                  className="text-[15px] text-text font-[400]"
                >
                  Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  // value={form.experience}
                  // onChange={(e) =>
                  //   setForm({
                  //     ...form,
                  //     experience: e.target.value,
                  //   })
                  // }
                  placeholder="Provide experience"
                  className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="consultation_fee"
                  className="text-[15px] text-text font-[400]"
                >
                  Consultation Fee <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="consultation_fee"
                  id="consultation_fee"
                  // value={form.consultation_fee}
                  // onChange={(e) =>
                  //   setForm({
                  //     ...form,
                  //     consultation_fee: e.target.value,
                  //   })
                  // }
                  placeholder="Provide consultation fee"
                  className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                  required
                />
              </div>
            </div>

              <div className="p-4 border rounded w-full">
                <label className="block mb-2">
                  Enter Services (Press Enter or , to add){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 border p-2 rounded">
                  {/* {services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
                    >
                      {service}
                      <button
                        className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
                        // onClick={() => removeServices(service)}
                      >
                        <X />
                      </button>
                    </span>
                  ))} */}
                  <input
                    type="text"
                    className="outline-none flex-1"
                    // value={serviceValue}
                    // onChange={handleServiceChange}
                    // onKeyDown={handleServiceKeyDown}
                    placeholder="Add Services..."
                  />
                </div>
              </div>

            <FileInput
              // image={image}
              // setImage={setImage}
              // handleFileChange={handleFileChange}
            />

            <button
              type="submit"
              className="lg:w-1/6 md:w-2/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-teal-500 rounded-md "></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
              <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
                Save Changes
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorsTableRow;
