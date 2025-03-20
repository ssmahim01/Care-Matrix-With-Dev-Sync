import { Edit2, Trash2 } from "lucide-react";

const DoctorsTableRow = ({ doctor, index }) => {
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
        <select
          defaultValue={doctor.availability.length > 0 && "Available"}
          className="select select-neutral"
        >
          <option disabled={true} value={"Select Availability"}>Select Availability</option>
          <option value={"Available"}>Available</option>
          <option value={"No Available"}>Not Available</option>
        </select>
      </td>
      <td className="flex gap-2 lg:py-4 py-10 w-72">
        <button
          className="inline-flex items-center gap-1 bg-rose-500 text-white rounded-none font-semibold py-2 px-4"
        >
          <Trash2 />
          Remove
        </button>
        <button
          className="inline-flex items-center gap-1 bg-teal-500 text-white rounded-none font-semibold py-2 px-4"
        >
         <Edit2 />
         Edit
        </button>
      </td>
    </tr>
  );
};

export default DoctorsTableRow;
