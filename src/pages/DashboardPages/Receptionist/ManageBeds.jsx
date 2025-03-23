import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
import FileInput from "@/components/FileInput/FileInput";
import SharedInput from "@/components/InputFields/SharedInput";
import { fetchDoctors } from "@/redux/doctors/doctorSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ManageBeds = () => {
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
    </>
  );
};

export default ManageBeds;
