import DoctorsTableRow from "@/components/DoctorsTableRow/DoctorsTableRow";
import FileInput from "@/components/FileInput/FileInput";
import {
  addDoctor,
  assignDoctor,
  convertRole,
  fetchDoctors,
  rejectDoctor,
  updateDoctor,
} from "@/redux/doctors/doctorSlice";
import {
  BadgePlus,
  Ban,
  BriefcaseMedical,
  CalendarCheck,
  CalendarDays,
  CalendarSearch,
  CircleCheckBig,
  CircleUser,
  CircleUserRound,
  CopyX,
  Cross,
  HeartPulse,
  Mail,
  NotebookPen,
  PhoneCall,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const DoctorsManagement = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteModal, setNoteModal] = useState({});
  const [detailsModal, setDetailsModal] = useState({});
  const { doctors, status } = useSelector((state) => state.doctors);
  const axiosPublic = useAxiosPublic();

  const FormSchema = z.object({
    note: z
      .string()
      .min(10, {
        message: "Note must be at least 10 characters.",
      })
      .max(160, {
        message: "Note must not be longer than 160 characters.",
      }),
  });

  const form2 = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    const id = noteModal?._id;
    if (!id) {
      toast.error("Doctor ID is missing");
      return;
    }

    try {
      const result = await dispatch(
        updateDoctor({ id, noteOfAdministrator: data.note })
      ).unwrap();
      if (result) {
        toast.success("Note added successfully");
        form2.reset();
        document.getElementById("note_modal_01").close();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to add note");
    }
  };

  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
    phoneNumber: "",
    schedule: "",
    available_days: "",
    experience: "",
    consultation_fee: "",
  });
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState([]);
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_URL
  }`;

  // Event handlers remain unchanged for brevity
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(file);
      setImage(imageURL);
    }
  };

  const handleReject = async () => {
    const id = detailsModal?._id;
    if (!id) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const result = await dispatch(rejectDoctor(id)).unwrap();
      if (result) {
        toast.success("Rejected the request");
        document.getElementById("doctor_modal_02").close();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to reject the user");
    }
  };

  const handleAssign = async () => {
    const id = detailsModal?._id;
    if (!id) {
      toast.error("User ID is missing");
      return;
    }

    const email = detailsModal?.userEmail;
    if (!email) {
      toast.error("User email is missing");
      return;
    }

    try {
      const response = await dispatch(assignDoctor(id)).unwrap();
      const update_role = await dispatch(convertRole(email)).unwrap();
      if (response && update_role) {
        toast.success("Assigned the doctor");
        document.getElementById("doctor_modal_02").close();
        dispatch(fetchDoctors());
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign the user");
    }
  };

  const handleAddNote = (doctor) => {
    setNoteModal(doctor);
    document.getElementById("note_modal_01").showModal();
  };

  const handleDoctorDetails = (doctor) => {
    setDetailsModal(doctor);
    document.getElementById("doctor_modal_02").showModal();
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleServiceChange = (e) => setServiceValue(e.target.value);

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

  const handleServiceKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = serviceValue.trim();
      if (trimmedValue && !services.includes(trimmedValue)) {
        setServices([...services, trimmedValue]);
        setServiceValue("");
      }
    }
  };

  const removeAvailability = (availabilityToRemove) =>
    setAvailability(availability.filter((a) => a !== availabilityToRemove));
  const removeServices = (serviceToRemove) =>
    setServices(services.filter((s) => s !== serviceToRemove));

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submission logic remains unchanged for brevity
    if (!image) {
      setIsSubmitting(false);
      return toast.error("Please provide an image!");
    }
    const formData = new FormData();
    formData.append("image", previewImage);
    try {
      const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (!imgResponse.data.success) {
        setIsSubmitting(false);
        return toast.error("Failed to upload the image!");
      }
      const imageURL = imgResponse.data.data.display_url;
      const doctorInfo = {
        ...form,
        role: "doctor",
        available_days: availability,
        services,
        image: imageURL,
        createdAt: new Date().toISOString(),
      };
      const response = await dispatch(addDoctor(doctorInfo)).unwrap();
      if (response) {
        toast.success("Doctor added & registered successfully");
        dispatch(fetchDoctors());
      }
      setForm({
        name: "",
        title: "",
        email: "",
        password: "",
        phoneNumber: "",
        schedule: "",
        available_days: "",
        experience: "",
        consultation_fee: "",
      });
      setInputValue("");
      setServiceValue("");
      setServices([]);
      setAvailability([]);
      setImage("");
      setPreviewImage("");
    } catch (error) {
      console.error("Error registering doctor:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        {!isFormOpen ? (
          <div className="flex flex-col">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
              <BriefcaseMedical className="text-3xl text-gray-800" />
              <span>Manage Doctors</span>
            </h2>
            <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
              View requests for doctor and modify
            </p>
          </div>
        ) : (
          <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-2">
            Add Doctor
          </h2>
        )}
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="lg:w-1/6 md:w-2/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
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
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100"></span>
          <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
            {isFormOpen ? "Close Form" : "Add Doctor"}
          </span>
        </button>
      </div>

      {isFormOpen && (
        <div className="border border-[#effdf5] shadow-md rounded-box bg-base-200 hover:shadow-xl p-4 w-full mb-7">
          {isSubmitting ? (
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="skeleton h-12 w-full" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddDoctor} className="w-full space-y-4">
              {/* Doctor Form */}
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
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    placeholder="Type the doctor Specialty"
                    className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between lg:flex-row flex-col gap-4 items-center">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="text-[15px] text-text font-[400]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="Provide an email"
                    className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="schedule"
                    className="text-[15px] text-text font-[400]"
                  >
                    Schedule <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="schedule"
                    id="schedule"
                    value={form.schedule}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        schedule: e.target.value,
                      })
                    }
                    placeholder="Select a schedule"
                    className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-[15px] text-text font-[400]"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="********"
                    className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="text-[15px] text-text font-[400]"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phoneNumber: e.target.value,
                      })
                    }
                    placeholder="Provide a valid phone number"
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

              <div className="lg:w-1/2 md:w-4/5 w-full">
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
                      value={serviceValue}
                      onChange={handleServiceChange}
                      onKeyDown={handleServiceKeyDown}
                      placeholder="Add Services..."
                    />
                  </div>
                </div>
              </div>

              <FileInput
                image={image}
                setImage={setImage}
                handleFileChange={handleFileChange}
              />

              <button
                type="submit"
                className="lg:w-1/6 md:w-2/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                <span className="absolute inset-0 w-full h-full bg-teal-500 rounded-md "></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
                  Add Doctor
                </span>
              </button>
            </form>
          )}
        </div>
      )}

      {!isFormOpen ? null : (
        <h2 className="md:text-4xl text-3xl font-bold text-base-content mb-2">
          Manage Doctors
        </h2>
      )}

      <div className="rounded-sm overflow-x-auto w-full">
        <table className="table border border-gray-200 border-collapse">
          <thead>
            <tr className="bg-gray-50 border border-gray-200 *:text-gray-800 *:font-semibold">
              <th className="p-4">No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Contact Number</th>
              <th className="p-4">Role</th>
              <th className="p-4">Department</th>
              <th className="p-4">Request Date</th>
              <th className="p-4">Shift</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading"
              ? [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="p-4">
                      <div className="skeleton h-4 w-4" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-10 w-10 rounded-full" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-32" />
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-8 w-8" />
                    </td>
                  </tr>
                ))
              : doctors.map((doctor, index) => (
                  <DoctorsTableRow
                    key={doctor?._id}
                    doctor={doctor}
                    dispatch={dispatch}
                    index={index}
                    handleAddNote={handleAddNote}
                    handleDoctorDetails={handleDoctorDetails}
                  />
                ))}
          </tbody>
        </table>
      </div>

      <dialog id="note_modal_01" className="modal modal-middle">
        {noteModal && (
          <div className="w-full flex justify-center items-center">
            <div className="modal-box">
              <div className="flex flex-col">
                {/* Heading Of The Modal */}
                <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                  <NotebookPen className="text-3xl text-gray-800" />
                  <span>Add Note For Doctor</span>
                </h2>
                <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                  This note will send to the doctor
                </p>
              </div>
              <div className="divider"></div>

              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <figure className="w-44 h-44 mx-auto mt-3">
                    <img
                      className="w-full h-full border-4 border-muted overflow-hidden rounded-full object-cover"
                      src={noteModal?.userPhoto}
                      alt={noteModal?.userName}
                    />
                  </figure>

                  <div className="divider"></div>

                  <div className="w-full space-y-3">
                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      User Name: <CircleUser className="w-5 h-5" />
                      <span className="text-gray-700 font-semibold">
                        {noteModal?.userName}
                      </span>
                    </h4>

                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      User Email: <Mail className="w-4 h-4" />
                      <span className="text-gray-700 font-semibold">
                        {noteModal?.userEmail}
                      </span>
                    </h4>

                    <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                      Request Date: <CalendarDays className="w-4 h-4" />
                      <span className="text-gray-700 font-semibold">
                        {new Date(noteModal?.requestDate).toLocaleDateString(
                          "en-UK"
                        )}
                      </span>
                    </h4>

                    <FormField
                      control={form2.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="w-11/12">
                          <FormLabel className="text-lg font-bold">
                            Note:
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write brief note for doctor"
                              className="resize-none h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can <span>Add</span> note with mention the
                            doctor name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="py-3 flex md:flex-row flex-col flex-wrap justify-between items-center">
                      <Button
                        type="button"
                        onClick={() =>
                          document.getElementById("note_modal_01").close()
                        }
                        className="md:px-14 px-10 btn bg-rose-500 text-base text-white font-bold rounded-md flex gap-2 items-center"
                      >
                        <CopyX className="w-4 h-4" />
                        <span>Close</span>
                      </Button>

                      <Button
                        type="submit"
                        className="md:px-14 px-10 btn bg-teal-600 text-base text-white font-bold rounded-md flex gap-2 items-center"
                      >
                        <BadgePlus className="w-6 h-6" />
                        <span>Add Note</span>
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </dialog>

      <dialog id="doctor_modal_02" className="modal modal-middle">
        {detailsModal && (
          <div className="w-full flex justify-center items-center">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-6">
                  <X className="w-5 h-5" />
                </button>
              </form>
              <div className="flex flex-col">
                {/* Heading Of The Modal */}
                <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                  <BriefcaseMedical className="text-3xl text-gray-800" />
                  <span>Details of Doctor</span>
                </h2>
                <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                  The full details of doctor is show here
                </p>
              </div>
              <div className="divider"></div>

              <div className="flex gap-y-2 flex-col">
                <figure className="w-48 h-48 mx-auto">
                  <img
                    className="w-full h-full border-4 border-sky-500 overflow-hidden rounded-full object-cover"
                    src={detailsModal?.userPhoto}
                    alt={detailsModal?.userName}
                  />
                </figure>

                <div className="divider"></div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <h4 className="flex gap-2 items-center font-semibold">
                      <CircleUserRound className="w-4 h-4" />
                      <span className="text-base text-gray-800">
                        {detailsModal?.userName}
                      </span>
                    </h4>

                    <p className="flex gap-2 items-center font-semibold">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm text-gray-800">
                        {detailsModal?.userEmail}
                      </span>
                    </p>

                    <p className="flex gap-2 items-center font-semibold">
                      <PhoneCall className="w-4 h-4" />
                      <span className="text-base text-gray-800">
                        {detailsModal?.emergencyContact}
                      </span>
                    </p>

                    <p className="flex gap-2 items-center font-semibold">
                      <HeartPulse className="w-4 h-4" />
                      <span className="text-base text-gray-800">
                        {detailsModal?.requestedRole}
                      </span>
                    </p>
                  </div>

                  <p className="flex gap-2 items-center font-semibold">
                    <Cross className="w-4 h-4" />
                    <span className="text-gray-900 font-bold">
                      Department:{" "}
                    </span>
                    <span className="text-base text-gray-800">
                      {detailsModal?.department}
                    </span>
                  </p>

                  <p className="flex gap-2 items-center font-semibold">
                    <CalendarSearch className="w-4 h-4" />
                    <span className="text-gray-900 font-bold">
                      Available Date:{" "}
                    </span>
                    <span className="text-base text-gray-800">
                      {new Date(detailsModal?.availableDate).toLocaleDateString(
                        "en-UK"
                      )}
                    </span>
                  </p>
                  <p className="flex gap-2 items-center font-semibold">
                    <CalendarCheck className="w-4 h-4" />
                    <span className="text-gray-900 font-bold">
                      Selected Shift:{" "}
                    </span>
                    <span className="text-base text-gray-800">
                      {detailsModal?.shift}
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-5 flex md:flex-row flex-col flex-wrap justify-between items-center">
                <Button
                  type="button"
                  onClick={handleReject}
                  className="btn bg-rose-500 hover:bg-rose-700 text-base text-white font-bold rounded-md flex gap-2 items-center"
                >
                  <Ban className="w-4 h-4" />
                  <span>Reject</span>
                </Button>

                <Button
                  type="submit"
                  onClick={handleAssign}
                  className="btn bg-sky-600 hover:bg-sky-700 text-base text-white font-bold rounded-md flex gap-2 items-center"
                >
                  <CircleCheckBig className="w-4 h-4" />
                  <span>Assign Doctor</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default DoctorsManagement;
