import useDoctors from '@/hooks/useDoctors';
import { LucideMessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegClock, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useSelector } from 'react-redux';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { RiGroupLine } from 'react-icons/ri';
import { HiOutlineCheckBadge } from 'react-icons/hi2';
import { IoLocationOutline } from 'react-icons/io5';
import { FiCalendar } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';

const DoctorDetails = () => {
    const { user } = useSelector((state) => state.auth);
    const [doctors] = useDoctors();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const doctorInfo = doctors.find(doctor => doctor._id === location.state);

    // State for active tab
    const [activeTab, setActiveTab] = useState('About');


    const timeSlots = [
        "10:00 am",
        "10:30 am",
        "11:00 am",
        "11:30 am",
        "12:00 am",
        "3:00 pm",
        "3:30 pm",
        "4:00 pm",
        "4:30 pm",
        "5:00 pm"
    ];



    const handleAddToFavorite = () => {
        const info = {
            email: user?.email,
            doctorInfo: doctorInfo,
        };
        axiosSecure.post('/favorite-doctors', info)
            .then(res => {
                if (res?.data?.insertedId) {
                    toast.success(`${doctorInfo?.name} is added to your favorite list!`);
                }
            })
            .catch(err => {
                toast.error("Something went wrong! Please try again.");
            });
    };

    return (
        <div className="w-11/12 lg:w-10/12 mt-10 mx-auto max-w-screen-2xl py-12">
            {/* Header Section */}
            <div className='shadow-md rounded-lg'>
                <div className=" rounded-tl-lg rounded-tr-md bg-green-50  p-6 flex flex-col lg:flex-row gap-6">
                    {/* Doctor Image */}
                    <div className=" w-full md:w-40 h-60 md:h-40 relative">
                        <img
                            className="w-full h-full object-cover rounded-lg"
                            src={doctorInfo?.image}
                            alt={doctorInfo?.name}
                        />
                        <div className='absolute rounded-full -top-3 -right-3 badge bg-blue-500 px-3 text-gray-100 gap-1.5 '>
                            <FaStar></FaStar>
                            <span className="text-sm font-semibold">{doctorInfo?.rating}</span>
                        </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h3 className=" text-2xl font-bold">{doctorInfo?.name}</h3>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <p className="text-blue-500 text-sm font-medium border px-2 border-blue-500 rounded-md">{doctorInfo?.title}</p>
                                    <Rating
                                        style={{ maxWidth: 80 }}
                                        value={doctorInfo?.rating} // Hardcoding as per image; replace with doctorInfo.rating if dynamic
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="tooltip" data-tip="Add to favorite">
                                <button
                                    onClick={handleAddToFavorite}
                                    className="p-2 btn min-h-0 h-auto rounded-full bg-white cursor-pointer hover:bg-blue-500 hover:text-white"
                                >
                                    <span >
                                        <FaRegHeart />
                                    </span>
                                </button>
                            </div>

                        </div>
                        {/* flex flex-wrap justify-between line gap-4 */}
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 text-sm">
                            <div className="flex items-center gap-2  py-1 rounded-full">
                                <div className='bg-blue-100 p-4 text-blue-500 rounded-full '>
                                    <RiGroupLine size={24} />
                                </div>
                                <div className='flex flex-col text-lg'>
                                    <span className=' font-medium text-gray-500'>Patients</span>
                                    <span className='font-semibold'>{doctorInfo?.treated_patients} Treated</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2  py-1 rounded-full">
                                <div className='bg-green-100 p-4 text-green-500 rounded-full '>
                                    <HiOutlineCheckBadge size={24} />
                                </div>
                                <div className='flex flex-col text-lg'>
                                    <span className=' text-base font-medium text-gray-500'>Experience</span>
                                    <span className='font-semibold'>{doctorInfo?.experience}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2  py-1 rounded-full">
                                <div className='bg-orange-100 p-4 text-orange-500 rounded-full '>
                                    <BiLike size={24} />
                                </div>
                                <div className='flex flex-col text-lg'>
                                    <span className=' text-base font-medium text-gray-500'>Votes</span>
                                    <span className='font-semibold'>{doctorInfo?.vote} Positives</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-1 rounded-full">
                                <div className='bg-purple-100 p-4 text-purple-500 rounded-full '>
                                    <LucideMessageCircle size={24} />
                                </div>
                                <div className='flex flex-col text-lg'>
                                    <span className=' text-base font-medium text-gray-500'>Feedback</span>
                                    <span className='font-semibold '>{doctorInfo?.number_of_feedback} Reviews</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Location, Availability, and Fee */}
                <div className="rounded-tl-lg rounded-tr-md bg-white p-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-start">
                        <div className="flex items-center gap-2 py-1 rounded-full">
                            <div className='text-gray-500'>
                                <IoLocationOutline size={20} />
                            </div>
                            <div className='flex flex-col text-lg'>
                                <span className=' text-base font-medium text-gray-500'>Location</span>
                                <span className='font-semibold text-gray-900'>CareMatrix, Mirpur-10, Dhaka, Bangladesh</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 py-1 rounded-full">
                            <div className='text-gray-500'>
                                <FiCalendar size={20} />
                            </div>
                            <div className='flex flex-col text-lg'>
                                <span className=' text-base font-medium text-gray-500'>Available</span>
                                <span className='font-semibold text-gray-900'>{doctorInfo?.available_days.join(', ')}</span>
                            </div>
                        </div>


                        <div className="flex items-center gap-2 py-1 rounded-full">
                            <div className='text-gray-500'>
                                <BsCurrencyDollar size={20} />
                            </div>
                            <div className='flex flex-col text-lg'>
                                <span className=' text-base font-medium text-gray-500'>Consultation Fee</span>
                                <span className='font-semibold text-gray-900'>{doctorInfo?.consultation_fee.replace("$", "")}</span>
                            </div>
                        </div>

                        <div>
                            <Link to={`/book-appointment/${doctorInfo?.name}`} state={doctorInfo?._id}>
                                <button className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg flex items-center w-full md:w-auto justify-center gap-2">
                                    <span><FiCalendar /></span>
                                    Book Appointment
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* Tabs and Content */}
            <div className="mt-6">
                {/* Tabs */}
                <div className="flex border-b">
                    {['About', 'Services', 'Reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                    {activeTab === 'About' && (
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold">About {doctorInfo?.name}</h3>
                            <p className='text-sm text-gray-500 font-medium'>Professional background and specialization</p>
                            <p className="text-gray-600 mt-2">{doctorInfo?.bio}</p>
                        </div>
                    )}
                    {activeTab === 'Services' && (
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold">Services offered</h3>
                            <p className='text-sm text-gray-500 font-medium'>Specialized treatments and procedures</p>
                            <ul className="list-disc pl-5 mt-2 text-gray-600">
                                {doctorInfo?.services.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'Reviews' && (
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold">Reviews</h3>
                            <p className="text-sm text-gray-500 font-medium">Feedback from previous patients</p>

                            <p className="text-gray-600 mt-2">No reviews available yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointment Slots */}
            <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
                    <h3 className="text-xl font-semibold">Available Appointment Slots</h3>
                    <p className="text-sm mt-1">Select a date and time that works for you</p>
                </div>

                {/* Appointment Slots Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {
                            doctorInfo?.available_days?.map(day => (
                                <div key={day} className="border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 text-center">{day}</h4>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {timeSlots.map(time => (
                                            <div
                                                key={time}
                                                className="flex hover:bg-blue-500 hover:text-white cursor-pointer items-center justify-center px-4 py-2 rounded-lg border bg-white text-gray-600 border-gray-300"
                                            >
                                                <span className="mr-2"><FaRegClock></FaRegClock></span>
                                                <span>{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;