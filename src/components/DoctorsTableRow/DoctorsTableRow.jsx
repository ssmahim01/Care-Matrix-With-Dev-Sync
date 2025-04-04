import {
  deleteDoctor,
  // fetchSpecificDoctor,
  // updateDoctor,
} from "@/redux/doctors/doctorSlice";
import { BookmarkX, EllipsisVertical, NotebookPen } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { TableCell } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
// import { MdDelete } from "react-icons/md";
// import { IoMdCloudUpload } from "react-icons/io";
// import { useState } from "react";
// import { useAxiosPublic } from "@/hooks/useAxiosPublic";

const DoctorsTableRow = ({
  doctor,
  index,
  dispatch,
  handleAddNote
}) => {
  // const [doctorData, setDoctorData] = useState({});
  // const axiosPublic = useAxiosPublic();

  // const handleImageUpload = () => {
  //   document.getElementById("image_input").click();
  // };

  // const handleFileChange = (event) => {
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setPreviewImage(file);
  //     setImage(imageURL);
  //   }
  // };

  // const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
  //   import.meta.env.VITE_IMGBB_API_URL
  // }`;

  // const handleUpdate = async (e, id) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", previewImage);

  //   const form = e.target;
  //   const name = form.name.value;
  //   const title = form.title.value;
  //   const experience = form.experience.value;
  //   const consultation_fee = form.consultation_fee.value;

  //   try {
  //     // Upload image to ImgBB
  //     const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
  //       headers: { "content-type": "multipart/form-data" },
  //     });

  //     if (imgResponse.data.success) {
  //       const imageURL = imgResponse.data.data.display_url;

  //       if (!imageURL) {
  //         console.error("Image upload failed");
  //         toast.error("Failed to upload the image!");
  //       }

  //       const updatedData = {
  //         name: name,
  //         title: title,
  //         experience: experience,
  //         consultation_fee: consultation_fee,
  //         available_days: availability,
  //         services: services,
  //         image: imageURL,
  //       };

  //       //  console.log(updatedData);
  //       // Use unwrap for handle the async errors
  //       const response = await dispatch(
  //         updateDoctor({ id, updatedData })
  //       ).unwrap();
  //       if (response) {
  //         toast.success("Successfully updated the doctor info");
  //         // Fetch latest doctor list
  //         dispatch(fetchSpecificDoctor());
  //         document.getElementById("update_modal_01").close();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error updating doctor:", error);
  //     toast.error("Something went wrong!");
  //   }
  // };

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
          toast.success("Doctor has been removed");
        }
      }
    });
  };

  return (
    <>
      <tr
        className={`${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:shadow-lg hover:bg-gray-100 transition duration-200 text-gray-700 font-semibold border border-gray-200`}
      >
        <th>{index + 1}</th>
        <td>
          <img
            className="w-14 h-14 rounded-md object-cover"
            src={doctor?.userPhoto}
            alt={doctor?.userName}
          />
        </td>
        <td>{doctor?.userName}</td>
        <td>{doctor?.userEmail}</td>
        <td>{doctor?.contactNumber}</td>
        <td>{doctor?.requestedRole}</td>
        <td>{doctor?.department}</td>
        <td>{new Date(doctor?.requestDate).toLocaleDateString("en-UK")}</td>
        <td>{doctor?.shift}</td>
        <td>
          <p
            className={`w-full ${
              doctor?.status === "Pending"
                && "badge bg-amber-500 text-white"
            } ${doctor?.status === "Cancel" && "badge badge-error text-white"} ${doctor?.status === "Success" && "badge badge-success text-white"}`}
          >
            {doctor?.status === "Pending" && "Pending" 
              || doctor?.status === "Cancel" && "Cancelled" || doctor?.status === "Assign" && "Assigned"}
          </p>
        </td>
        <td className="lg:py-4 py-10">
        <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer border p-2" size="icon">
            <EllipsisVertical className="w-5 h-10" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
              onClick={() => handleDeleteDoctor(doctor?._id)}
            >
              <BookmarkX className="w-4 h-4" />
              <span>Remove</span>
            </DropdownMenuItem>

            <DropdownMenuItem
            className="cursor-pointer flex gap-2 items-center"
            onClick={() => handleAddNote(doctor)}
            >
              <NotebookPen className="w-4 h-4" />
              <span>Add Note</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
          {/* <button
            onClick={() => handleEditModal(doctor)}
            className="btn btn-md inline-flex items-center gap-1 bg-teal-600 text-white rounded-none font-semibold px-4"
          >
            <Edit2 />
            <span className="text-base">Edit</span>
          </button> */}
        </td>
      </tr>

      {/* <dialog
        id="update_modal_01"
        className="modal modal-bottom sm:modal-middle"
      >
        {doctorData && (
          <div className="modal-box">
            <h2 className="md:text-3xl text-2xl font-bold border-b pb-3">
              Update the doctor info
            </h2>

            <form onSubmit={handleUpdate} className="mt-3 space-y-4">
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
                    defaultValue={doctorData?.name}
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
                    name="title"
                    id="title"
                    defaultValue={doctorData?.title}
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
                  {availability.map((available, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
                    >
                      {available}
                      <button
                        className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
                        onClick={() => removeAvailability(available)}
                      >
                        <X />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="outline-none flex-1"
                    defaultValue={doctorData?.available_days || availability}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Update and add availability days..."
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
                    defaultValue={doctorData?.experience}
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
                    defaultValue={doctorData?.consultation_fee}
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
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
                    >
                      {service}
                      <button
                        className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
                        onClick={() => removeServices(service)}
                      >
                        <X />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="outline-none flex-1"
                    defaultValue={doctorData?.services || services}
                    onChange={handleServiceChange}
                    onKeyDown={handleServiceKeyDown}
                    placeholder="Update and add Services..."
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 items-center">
                <input
                  type="file"
                  name="image"
                  id="image_input"
                  className="hidden w-full"
                  onChange={handleFileChange}
                />
                <div className="w-full">
                  {image === "" ? (
                    <div className="flex items-center justify-center flex-col w-full bg-base-100 border border-dashed border-[#3B9DF8] rounded-md py-5">
                      <IoMdCloudUpload className="text-[3rem] text-primary" />
                      <p className="mt-2 text-text">Drag and drop here</p>
                      <p className=" text-text">or</p>

                      <button
                        className="mt-2 btn btn-ghost px-6 py-1.5 text-[#3b9df8]"
                        onClick={handleImageUpload}
                      >
                        Browse
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-[200px]">
                      <img
                        src={doctorData?.image}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                      <MdDelete
                        className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                        onClick={() => setImage("")}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 md:flex-row flex-col justify-between items-center">
                <button
                  onClick={() =>
                    document.getElementById("update_modal_01").close()
                  }
                  className="md:w-1/2 w-full relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#df3b3b] rounded-md group mt-2"
                >
                  <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-rose-500 rounded-md "></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                  <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
                    Cancel
                  </span>
                </button>

                <button
                  type="submit"
                  onClick={(e) => handleUpdate(e, doctor?._id)}
                  className="md:w-1/2 w-full relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#39a73e] rounded-md group mt-2"
                >
                  <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[#39a73e] rounded-md "></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                  <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
                    Save Changes
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog> */}
    </>
  );
};

export default DoctorsTableRow;
