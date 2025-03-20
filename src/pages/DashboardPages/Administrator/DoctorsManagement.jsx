import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
import FileInput from "@/components/FileInput/FileInput";
import SharedInput from "@/components/InputFields/SharedInput";
import { fetchDoctors } from "@/redux/doctors/doctorSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const { doctors, status } = useSelector((state) => state.doctors);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    availability_days: "",
    experience: "",
    consultation_fee: "",
  });
  console.log(form);
  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [availability, setAvailability] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !availability.includes(trimmedValue)) {
        setAvailability([...availability, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const removeAvailability = (availabilityToRemove) => {
    setAvailability(
      availability.filter(
        (availability) => availability !== availabilityToRemove
      )
    );
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateDoctor({ id: editId, updatedData: form })).then(() => {
        toast.success("Doctor updated successfully");
      });
    } else {
      dispatch(addDoctor(form)).then(() => {
        toast.success("Doctor added successfully");
      });
    }
    setForm({
      name: "",
      specialty: "",
      availability_days: "",
      experience: "",
      consultation_fee: "",
    });
    setEditId(null);
  };

  return (
    <>
      <h2 className="md:text-4xl text-base-content text-3xl font-bold md:mb-3 mb-2">
        Add & Update Doctor
      </h2>

      {/* Doctor Form */}
      <div className="border border-[#effdf5] shadow-md rounded-box bg-base-200 hover:shadow-xl p-4 w-full">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
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
          </div>

          <div className="lg:w-1/2 md:w-4/5 w-full">
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
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Add availability days..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
            <SharedInput
              type={"text"}
              name={"experience"}
              id={"experience"}
              placeholder={"Provide the doctor experience"}
              label={"Experience"}
              form={form}
              setForm={setForm}
            />
            <SharedInput
              type={"number"}
              name={"consultation_fee"}
              id={"consultation_fee"}
              placeholder={"Type the consultation fee"}
              label={"Consultation Fee"}
              form={form}
              setForm={setForm}
            />
          </div>

          <FileInput />

          <button className="lg:w-1/6 md:w-2/5 w-3/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2">
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
          <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-5">
            Manage Doctors
          </h2>
          <div className="rounded-sm overflow-x-auto w-full">
            <table className="table border border-gray-200 border-collapse">
              <thead>
                <tr className="bg-gray-100 *:text-gray-800 *:font-bold">
                  <th className="p-4">Serial No.</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Specialty</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Consultation Fee</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <DoctorsTableRow
                    key={doctor?._id}
                    doctor={doctor}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorsManagement;
