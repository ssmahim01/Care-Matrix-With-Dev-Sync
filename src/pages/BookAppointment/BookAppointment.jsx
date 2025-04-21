import useAppointment from '@/hooks/useAppointment';
import useDoctors from '@/hooks/useDoctors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar, FaPhoneAlt, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const BookAppointment = () => {
      const [search, setSearch] = useState("")
      const [selectedSort, setSelectedSort] = useState("")
    const [doctors] = useDoctors(search, selectedSort);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [appointments] = useAppointment();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const doctorInfo = doctors.find((doctor) => doctor._id === location.state);

    const onSubmit = (data) => {
        const appointmentInfo = {
            ...data,
            status: "pending",
            doctorId: doctorInfo._id,
            doctorName: doctorInfo.name,
            doctorTitle: doctorInfo.title,
            consultationFee: doctorInfo.consultation_fee
        };
        navigate('/book-appointment/payment', { state: { appointmentInfo } });
    };

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 pt-24'>
            <div className="shadow rounded-lg space-y-4">
                <div className="bg-gradient-to-r from-[#1664D4] to-[#3B9DF8] text-white rounded-t-lg px-6 py-5 flex gap-4">
                    <img src={doctorInfo?.image} alt="Doctor" className="w-20 h-20 rounded-full border-2 border-white object-cover" />
                    <div>
                        <h2 className="text-xl font-semibold">{doctorInfo?.name}</h2>
                        <p className="text-sm font-medium">{doctorInfo?.title}</p>
                        <p className="text-xs font-medium">{doctorInfo?.chamber}</p>
                    </div>
                    <div className="flex items-center gap-1 max-h-max bg-yellow-500 px-2 py-1 rounded-lg text-sm text-black font-medium">
                        <FaStar className="text-xs" /> {doctorInfo?.rating}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white rounded-b-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Patient Name*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <input type="text" {...register("name", { required: "Patient name is required", minLength: { value: 2, message: "Patient name must be at least 2 characters" } })} placeholder="Enter full name" className="w-full outline-none" />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Age*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <input type="number" {...register("age", { required: "Age is required", min: { value: 1, message: "Age must be at least 1" }, max: { value: 150, message: "Age cannot be more than 150" } })} placeholder="Enter age" className="w-full outline-none" />
                            </div>
                            {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Number*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <FaPhoneAlt className="text-gray-500 mr-2" />
                                <input type="tel" {...register("phone", { required: "Contact number is required", pattern: { value: /^[0-9]{11}$/, message: "Contact number must be a valid 11-digit number" } })} placeholder="Enter phone number" className="w-full outline-none bg-transparent" />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <MdEmail className="text-gray-500 mr-2" />
                                <input type="email" value={user?.email} readOnly {...register("email", { required: true })} className="w-full outline-none bg-transparent" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Preferred Admission Date*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <FaCalendarAlt className="text-gray-500 mr-2" />
                                <input type="date" {...register("date", { required: "Appointment date is required", validate: (value) => { const selectedDate = new Date(value); const today = new Date(); today.setHours(0, 0, 0, 0); return selectedDate >= today || "Admission date must be today or in the future"; } })} className="w-full outline-none" />
                            </div>
                            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Select Time*</label>
                            <div className="flex items-center border rounded-md p-2">
                                <FaClock className="text-gray-500 mr-2" />
                                <select {...register("time", { required: "Valid time required", validate: (value) => value !== "Pick a time slot" || "Valid time required" })} defaultValue="Pick a time slot" className="w-full outline-none">
                                    <option disabled>Pick a time slot</option>
                                    <option>10:00am - 10:29am</option>
                                    <option>10:30am - 10:59am</option>
                                    <option>11:00am - 11:29am</option>
                                    <option>11:30am - 11:59am</option>
                                    <option>12:00pm - 12:30pm</option>
                                    <option>03:30pm - 03:59pm</option>
                                    <option>04:00pm - 04:29pm</option>
                                    <option>04:30pm - 04:59pm</option>
                                    <option>05:00pm - 05:29pm</option>
                                    <option>05:30pm - 05:59pm</option>
                                    <option>06:00pm - 06:29pm</option>
                                    <option>06:30pm - 07:00pm</option>
                                </select>
                            </div>
                            {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Appointment Reason*</label>
                        <textarea {...register("reason", { required: true })} className="w-full border rounded-md p-2" rows="3" placeholder="Briefly describe the reason"></textarea>
                        {errors.reason && <p className="text-xs text-red-500 mt-1">Appointment reason is required</p>}
                    </div>

                    <button type="submit" className="bg-[#3b6df8] hover:bg-blue-600 w-full cursor-pointer text-white font-semibold py-2 px-4 rounded">Submit Now</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;