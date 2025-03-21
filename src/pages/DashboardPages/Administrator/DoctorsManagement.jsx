import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
import FileInput from "@/components/FileInput/FileInput";
import {
  addDoctor,
  fetchDoctors,
  updateDoctor,
} from "@/redux/doctors/doctorSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { imgUpload } from "@/lib/imgUpload.js";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const { doctors, status } = useSelector((state) => state.doctors);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    availability_days: "",
    experience: "",
    consultation_fee: "",
  });
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [availability, setAvailability] = useState([]);

  const handleImageUpload = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please provide an image!");
    }

    // Upload image to ImgBB
    const imageURL = await imgUpload(image);
    if (!imageURL) {
      console.error("Image upload failed");
      return toast.error("Failed to upload the image!");
    }

    const formData = {
      name: e.target.name.value,
      specialty: e.target.specialty.value,
      availability_days: availability,
      experience: e.target.experience.value,
      consultation_fee: e.target.consultation_fee.value,
      image: imageURL,
    };

    console.log(formData);

    try {
        await dispatch(addDoctor(formData));
        toast.success("Doctor added successfully");
    } catch (error) {
      console.error("Error adding/updating doctor:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {/* Doctor List */}
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            {!isFormOpen ? (
              <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
                Manage Doctors
              </h2>
            ) : (
              <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
                Add Doctor
              </h2>
            )}
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="lg:w-1/6 md:w-2/5 w-3/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
            >
              <span
                className={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out rounded-md group-hover:mt-0 group-hover:ml-0 ${
                  !isFormOpen ? "bg-primary" : ""
                }`}
              ></span>
              <span
                className={`absolute inset-0 w-full h-full rounded-md ${
                  isFormOpen ? "bg-neutral" : "bg-teal-500"
                }`}
              ></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
              <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
                {isFormOpen ? "Close Form" : "Add Doctor"}
              </span>
            </button>
          </div>

          {isFormOpen && (
            <div className="border border-[#effdf5] shadow-md rounded-box bg-base-200 hover:shadow-xl p-4 w-full mb-7">
              {/* Doctor Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
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
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
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
                      value={form.specialty}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          specialty: e.target.value,
                        })
                      }
                      placeholder="Type the doctor Specialty"
                      className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                      required
                    />
                  </div>
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
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
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
                      value={form.experience}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          experience: e.target.value,
                        })
                      }
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
                      value={form.consultation_fee}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          consultation_fee: e.target.value,
                        })
                      }
                      placeholder="Provide consultation fee"
                      className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <FileInput
                  image={image}
                  setImage={setImage}
                  handleFileChange={handleFileChange}
                  handleImageUpload={handleImageUpload}
                />

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
          )}

          {!isFormOpen ? (
            ""
          ) : (
            <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
              Manage Doctors
            </h2>
          )}

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
        </>
      )}
    </>
  );
};

export default DoctorsManagement;
