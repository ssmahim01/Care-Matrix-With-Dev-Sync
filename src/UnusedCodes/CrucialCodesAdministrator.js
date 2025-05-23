{/* <h2 className="md:text-4xl text-2xl font-bold text-base-content mb-2">
Add Doctor
</h2> */}
{/* <button
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
</button> */}

// const [form, setForm] = useState({
//     name: "",
//     title: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     schedule: "",
//     available_days: "",
//     experience: "",
//     consultation_fee: "",
//   });

// const axiosPublic = useAxiosPublic();
// const [isFormOpen, setIsFormOpen] = useState(false);
// const [image, setImage] = useState("");
// const [previewImage, setPreviewImage] = useState("");
// const [inputValue, setInputValue] = useState("");
// const [serviceValue, setServiceValue] = useState("");
// const [services, setServices] = useState([]);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [availability, setAvailability] = useState([]);
// const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
//   import.meta.env.VITE_IMGBB_API_URL
// }`;
//  // Event handlers remain unchanged for brevity
//  const handleFileChange = (event) => {
//   event.preventDefault();
//   const file = event.target.files[0];
//   if (file) {
//     const imageURL = URL.createObjectURL(file);
//     setPreviewImage(file);
//     setImage(imageURL);
//   }
// };

// const handleInputChange = (e) => setInputValue(e.target.value);
//   const handleServiceChange = (e) => setServiceValue(e.target.value);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const trimmedValue = inputValue.trim();
//       if (trimmedValue && !availability.includes(trimmedValue)) {
//         setAvailability([...availability, trimmedValue]);
//         setInputValue("");
//       }
//     }
//   };

//   const handleServiceKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const trimmedValue = serviceValue.trim();
//       if (trimmedValue && !services.includes(trimmedValue)) {
//         setServices([...services, trimmedValue]);
//         setServiceValue("");
//       }
//     }
//   };

//   const removeAvailability = (availabilityToRemove) =>
//     setAvailability(availability.filter((a) => a !== availabilityToRemove));
//   const removeServices = (serviceToRemove) =>
//     setServices(services.filter((s) => s !== serviceToRemove));

//   const handleAddDoctor = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Submission logic remains unchanged for brevity
//     if (!image) {
//       setIsSubmitting(false);
//       return toast.error("Please provide an image!");
//     }
//     const formData = new FormData();
//     formData.append("image", previewImage);
//     try {
//       const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
//         headers: { "content-type": "multipart/form-data" },
//       });
//       if (!imgResponse.data.success) {
//         setIsSubmitting(false);
//         return toast.error("Failed to upload the image!");
//       }
//       const imageURL = imgResponse.data.data.display_url;
//       const doctorInfo = {
//         ...form,
//         role: "doctor",
//         available_days: availability,
//         services,
//         image: imageURL,
//         createdAt: new Date().toISOString(),
//       };
//       const response = await dispatch(addDoctor(doctorInfo)).unwrap();
//       if (response) {
//         toast.success("Doctor added & registered successfully");
//         dispatch(fetchDoctors());
//       }
//       setForm({
//         name: "",
//         title: "",
//         email: "",
//         password: "",
//         phoneNumber: "",
//         schedule: "",
//         available_days: "",
//         experience: "",
//         consultation_fee: "",
//       });
//       setInputValue("");
//       setServiceValue("");
//       setServices([]);
//       setAvailability([]);
//       setImage("");
//       setPreviewImage("");
//     } catch (error) {
//       console.error("Error registering doctor:", error);
//       toast.error(error.message || "Something went wrong!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   {isFormOpen && (
//     <div className="border border-[#effdf5] shadow-md rounded-box bg-base-200 hover:shadow-xl p-4 w-full mb-7">
//       {isSubmitting ? (
//         <div className="space-y-4">
//           {[...Array(8)].map((_, index) => (
//             <div key={index} className="skeleton h-12 w-full" />
//           ))}
//         </div>
//       ) : (
//         <form onSubmit={handleAddDoctor} className="w-full space-y-4">
//           {/* Doctor Form */}
//           <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
//             <div className="w-full">
//               <label
//                 htmlFor="name"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     name: e.target.value,
//                   })
//                 }
//                 placeholder="Write the doctor name"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>

//             <div className="w-full">
//               <label
//                 htmlFor="specialty"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Specialty <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="specialty"
//                 id="specialty"
//                 value={form.title}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     title: e.target.value,
//                   })
//                 }
//                 placeholder="Type the doctor Specialty"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex justify-between lg:flex-row flex-col gap-4 items-center">
//             <div className="w-full">
//               <label
//                 htmlFor="email"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     email: e.target.value,
//                   })
//                 }
//                 placeholder="Provide an email"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>

//             <div className="w-full">
//               <label
//                 htmlFor="schedule"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Schedule <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="datetime-local"
//                 name="schedule"
//                 id="schedule"
//                 value={form.schedule}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     schedule: e.target.value,
//                   })
//                 }
//                 placeholder="Select a schedule"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
//             <div className="w-full">
//               <label
//                 htmlFor="password"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     password: e.target.value,
//                   })
//                 }
//                 placeholder="********"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>

//             <div className="w-full">
//               <label
//                 htmlFor="phoneNumber"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="phoneNumber"
//                 id="phoneNumber"
//                 value={form.phoneNumber}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     phoneNumber: e.target.value,
//                   })
//                 }
//                 placeholder="Provide a valid phone number"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>
//           </div>

//           <div className="lg:w-1/2 md:w-4/5 w-full">
//             <div className="p-4 border rounded w-full">
//               <label className="block mb-2">
//                 Enter Availability Days (Press Enter or , to add){" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               <div className="flex flex-wrap gap-2 border p-2 rounded">
//                 {availability.map((available, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
//                   >
//                     {available}
//                     <button
//                       className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
//                       onClick={() => removeAvailability(available)}
//                     >
//                       <X />
//                     </button>
//                   </span>
//                 ))}
//                 <input
//                   type="text"
//                   className="outline-none flex-1"
//                   value={inputValue}
//                   onChange={handleInputChange}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Add availability days..."
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
//             <div className="w-full">
//               <label
//                 htmlFor="experience"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Experience <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="experience"
//                 id="experience"
//                 value={form.experience}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     experience: e.target.value,
//                   })
//                 }
//                 placeholder="Provide experience"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>

//             <div className="w-full">
//               <label
//                 htmlFor="consultation_fee"
//                 className="text-[15px] text-text font-[400]"
//               >
//                 Consultation Fee <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="consultation_fee"
//                 id="consultation_fee"
//                 value={form.consultation_fee}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     consultation_fee: e.target.value,
//                   })
//                 }
//                 placeholder="Provide consultation fee"
//                 className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
//                 required
//               />
//             </div>
//           </div>

//           <div className="lg:w-1/2 md:w-4/5 w-full">
//             <div className="p-4 border rounded w-full">
//               <label className="block mb-2">
//                 Enter Services (Press Enter or , to add){" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               <div className="flex flex-wrap gap-2 border p-2 rounded">
//                 {services.map((service, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-[#3794da] text-white rounded flex items-center gap-1"
//                   >
//                     {service}
//                     <button
//                       className="ml-2 text-gray-600 font-bold hover:cursor-pointer hover:text-rose-500"
//                       onClick={() => removeServices(service)}
//                     >
//                       <X />
//                     </button>
//                   </span>
//                 ))}
//                 <input
//                   type="text"
//                   className="outline-none flex-1"
//                   value={serviceValue}
//                   onChange={handleServiceChange}
//                   onKeyDown={handleServiceKeyDown}
//                   placeholder="Add Services..."
//                 />
//               </div>
//             </div>
//           </div>

//           <FileInput
//             image={image}
//             setImage={setImage}
//             handleFileChange={handleFileChange}
//           />

//           <button
//             type="submit"
//             className="lg:w-1/6 md:w-2/5 relative inline-flex items-center justify-center px-6 btn font-bold tracking-tighter text-white bg-[#469ade] rounded-md group mt-2"
//           >
//             <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
//             <span className="absolute inset-0 w-full h-full bg-teal-500 rounded-md "></span>
//             <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
//             <span className="relative text-white transition-colors duration-200 ease-in-out delay-100 group-hover:text-white/80">
//               Add Doctor
//             </span>
//           </button>
//         </form>
//       )}
//     </div>
//   )}

{/* <button
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
        </button> */}
