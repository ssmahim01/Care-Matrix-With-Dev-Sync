import SharedInput from "@/components/InputFields/SharedInput";
import { fetchDoctors } from "@/redux/doctors/doctorSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
  });
  const { doctors, status } = useSelector((state) => state.doctors);
  const [editId, setEditId] = useState(null);

  // useEffect(() => {
  //     dispatch(fetchDoctors())
  // }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="">
      <h2 className="md:text-4xl text-base-content text-2xl font-bold mb-5">
        Doctor Management
      </h2>

      {/* Doctor Form */}
      <div className="border border-[#effdf5] shadow-md rounded-box bg-base-200 hover:shadow-xl p-4 flex flex-col lg:flex-row justify-between items-center">
        <form onSubmit={handleSubmit} className="lg:flex-1 space-y-2">
          <SharedInput
            type={"text"}
            name={"name"}
            id={"name"}
            placeholder={"Write the doctor name"}
            label={"Name"}
            form={form}
            setForm={setForm}
          />
          <SharedInput
            type={"text"}
            name={"specialty"}
            id={"specialty"}
            placeholder={"Provide the doctor specialty"}
            label={"Specialty"}
            form={form}
            setForm={setForm}
          />
          <SharedInput
            type={"text"}
            name={"availability"}
            id={"availability"}
            placeholder={"Select availability"}
            label={"Availability"}
            form={form}
            setForm={setForm}
          />
          <button className="lg:w-1/6 md:w-1/2 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2">
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-teal-500 rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
            {editId ? "Update Doctor" : "Add Doctor"}
            </span>
          </button>
        </form>
      </div>

      {/* Doctor List */}
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border mt-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Specialty</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="border p-2">{doctor.name}</td>
                <td className="border p-2">{doctor.specialty}</td>
                <td className="border p-2">{doctor.availability}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white p-1 mx-1"
                    onClick={() => {
                      setEditId(doctor._id);
                      setForm(doctor);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 mx-1"
                    onClick={() =>
                      dispatch(deleteDoctor(doctor._id)).then(() =>
                        toast.success("Doctor deleted")
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      )}
    </div>
  );
};

export default DoctorsManagement;
