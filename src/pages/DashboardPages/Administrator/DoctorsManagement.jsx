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
       Add & Update Doctor
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
        <div className="py-8">
          <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-5">Manage Doctors</h2>
           <div className="rounded-md overflow-x-auto w-full">
          <table className="table border border-gray-200 border-collapse">
            <thead>
              <tr className="bg-gray-100 *:text-gray-800 *:font-bold">
                <th className="p-4">Serial No.</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Availability</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <DoctorsTableRow
                  key={doctor?._id}
                  doctors={doctors}
                  doctor={doctor}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsManagement;
