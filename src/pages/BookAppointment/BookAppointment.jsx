import useAppointment from '@/hooks/useAppointment';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useDoctors from '@/hooks/useDoctors';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const BookAppointment = () => {
    const [doctors] = useDoctors();
    const { user } = useSelector((state) => state.auth);
    // console.log("User is ", user?.displayName);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const [appointments] = useAppointment()
    console.log("appointments are  ", appointments);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
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

        // console.log("Patients infos ", appointmentInfo)

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

            <div className='border p-4 bg-slate-100 flex gap-2 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <input type="text"  {...register("name", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                />
                                <span
                                    className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Patient name
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <input type="number"  {...register("phone", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                />
                                <span
                                    className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Phone number
                                </span>
                            </label>
                        </div>
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <input type="email" {...register("email", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                    defaultValue={user?.email} readOnly
                                />
                                <span
                                    className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Email address
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-[20px] mt-6">

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <input type="number" {...register("age", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                />
                                <span
                                    className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Patient age
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <input type="date" {...register("date", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                />
                                <span
                                    className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Select date
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <label className="relative">
                                <select {...register("time", { required: true })}
                                    className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300" defaultValue="Pick a browser">
                                    <option >Pick a time slot</option>
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
                                <span
                                    className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Select time
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                        <label className="relative w-full">
                            <textarea {...register("reason", { required: true })}
                                className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            ></textarea>
                            <span
                                className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Reason for visit.
                            </span>
                        </label>
                    </div>


                    <button type="submit" className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px] cursor-pointer">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default BookAppointment;