import { deleteDoctor } from "@/redux/doctors/doctorSlice";
import { Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DoctorsTableRow = ({ doctor, index, dispatch }) => {
  const handleDeleteDoctor = async(id) => {
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
          { doctor?.available_days && doctor?.available_days.length > 0 ? "Available" : "N/A"}
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
        <button className="btn btn-md inline-flex items-center gap-1 bg-teal-600 text-white rounded-none font-semibold px-4">
          <Edit2 />
          <span className="text-base">Edit</span>
        </button>
      </td>
    </tr>
  );
};

export default DoctorsTableRow;
