import useAppointment from '@/hooks/useAppointment';
import useDoctors from '@/hooks/useDoctors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const BookAppointment = () => {
    const [doctors] = useDoctors();
    const { user } = useSelector((state) => state.auth);
    // console.log("User is ", user?.displayName);
    const navigate = useNavigate()

    const [appointments] = useAppointment()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const location = useLocation();

    const doctorInfo = doctors.find(doctor => doctor._id === location.state)

    const onSubmit = (data) => {
        const name = data.name;
        const phone = data.phone;
        const age = data.age;
        const email = data.email;
        const date = data.date;
        const time = data.time;
        const reason = data.reason;


        // console.log(name, phone, email, age, date, time, reason);
        const appointmentInfo = {
            name,
            email,
            phone,
            age,
            date,
            time,
            reason,
            status: "pending",
            doctorId: doctorInfo._id,
            doctorName: doctorInfo.name,
            doctorTitle: doctorInfo.title,
            consultationFee: doctorInfo.consultation_fee
        }

        console.log("Patients infos ", appointmentInfo)

        const handleNavigate = () => {
            navigate('/book-appointment/payment', {
                state: { appointmentInfo }
            });
        };
        handleNavigate();

    }

    // console.log(user);

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24 space-y-4'>
            <div className='border p-4 bg-slate-100 flex gap-2 rounded-md'>
                <img className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover' src={doctorInfo?.image} alt="" />
                <div>
                    <div className='relative'>
                        <h3 className='text-lg font-semibold'>{doctorInfo?.name}</h3>
                        <div className="badge bg-amber-500 absolute top-0 -right-14 p-1"><FaStar></FaStar> {doctorInfo?.rating}</div>
                    </div>
                    <h3 className='text-[#0E82FD]'>{doctorInfo?.title}</h3>
                    <h3 className='text-sm'>{doctorInfo?.chamber}</h3>
                </div>
            </div>

            {/* book form  */}
            <div className='border p-4 bg-slate-100 flex gap-2 rounded-md'>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                Patient Name*
                            </label>
                            <input className="w-full border-2 rounded-md p-1.5 "
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Patient name is required",
                                    minLength: { value: 2, message: "Patient name must be at least 2 characters" },
                                })}

                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="age" className="block text-xs sm:text-sm font-medium text-gray-700">
                                Age*
                            </label>
                            <input className="w-full border-2 rounded-md p-1.5 "
                                type="number"
                                id="age"
                                {...register("age", {
                                    required: "Age is required",
                                    min: { value: 1, message: "Age must be at least 1" },
                                    max: { value: 150, message: "Age cannot be more than 150" },
                                })}

                            />
                            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                Contact Number*
                            </label>
                            <input className="w-full border-2 rounded-md p-1.5 "
                                type="tel"
                                {...register("phone", {
                                    required: "Contact number is required",
                                    pattern: { value: /^[0-9]{11}$/, message: "Contact number must be a valid 11-digit number" },
                                })}

                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                Email*
                            </label>
                            <input type="email" value={user?.email} {...register("email", { required: true })} className="grow w-full border-2 p-1.5 rounded-md " placeholder="index.php" />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                Preferred Admission Date*
                            </label>
                            <input className="w-full border-2 rounded-md p-1.5 "
                                type="date"

                                {...register("date", {
                                    required: "Appointment date is required",
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        return selectedDate >= today || "Admission date must be today or in the future";
                                    },
                                })}

                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                Select time*
                            </label>

                            <select
                                {...register("time", {
                                    required: "Valid time required",
                                    validate: (value) => value !== "Pick a time slot" || "Valid time required",
                                })}
                                className="text-sm w-full p-1.5 border-2 rounded-md"
                                defaultValue="Pick a time slot"
                            >
                                <option disabled>Pick a time slot</option>
                                <option>10:00am - 10:29am</option>
                                <option>10:30am - 10:59am</option>
                                <option>11:00am - 11:29am</option>
                                <option>11:30am - 11:59am</option>
                                <option>12:00am - 12:30am</option>
                                <option>03:30am - 03:59am</option>
                                <option>04:00am - 04:29am</option>
                                <option>04:30am - 04:59am</option>
                                <option>05:00am - 05:29am</option>
                                <option>05:30am - 05:59am</option>
                                <option>06:00am - 06:29am</option>
                                <option>06:30am - 07:00am</option>
                            </select>

                            {errors.time && (
                                <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                            )}
                        </div>

                    </div>

                    <div className="space-y-1 mt-4">
                        <label htmlFor="reason" className="block text-xs sm:text-sm font-medium text-gray-700">
                            Appointment Reason*
                        </label>
                        <textarea input className="w-full border-2 rounded-md p-1.5 " {...register("reason", { required: true })}></textarea>
                        {errors.reason && (
                            <p className="text-red-500 text-xs mt-1">Appointment reason is required </p>)}
                    </div>

                    <button type='submit' className="btn mt-4">Submit Now</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;