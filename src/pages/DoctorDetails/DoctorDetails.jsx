
import useDoctors from '@/hooks/useDoctors';
import { Key, LucideCalendar, LucideMessageCircle, LucideUserRoundCog } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { IoLocation, IoLocationOutline } from 'react-icons/io5';
import { MdOutlinePriceChange } from 'react-icons/md';
import { Link, useLocation } from 'react-router';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const DoctorDetails = () => {

   const [doctors] = useDoctors();

    const location = useLocation();

    const doctorInfo = doctors.find(doctor => doctor._id === location.state)


    return (
        <div className='w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24'>
            <div className='flex flex-col gap-6 '>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 border p-4 rounded-md'>
                    <div className=''>
                        <img className='h-[320px] md:h-[270px] lg:h-[200px] w-full object-cover rounded-md' src={doctorInfo.image} alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-semibold text-xl'>{doctorInfo.name}</h3>
                        <h3 className='text-[#0E82FD]'>{doctorInfo.title}</h3>
                        <div>
                       
                        <Rating className='text-center mx-auto'
                            style={{ maxWidth: 90, margin: 0, marginLeft:0,  marginRight: '4px' }}
                            value={doctorInfo.rating}
                            readOnly
                        />
                        </div>
                        <div className='flex items-center gap-2 mt-1'>
                            <button className='p-1 border-2 cursor-pointer hover:text-[#0E82FD] hover:border-[#0E82FD] text-lg rounded-md text-gray-400 bg-white border-gray-400'><FaRegHeart></FaRegHeart></button>
                            {/* <span>Add to favorites</span> */}
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-2'>
                        <div className='flex items-center gap-2'>
                            <FaUser></FaUser>
                            <span>{doctorInfo.treated_patients} Patients Treated</span>
                        </div>
                        <div className='flex justify-between bg-slate-100 p-4 rounded-md mt-4'>
                            <div className=' '>
                                <h3 className='font-medium'>Name</h3>
                                <p>CareMatrix</p>
                            </div>
                            <div className='bg-slate-100'>
                                <h3 className='font-medium'>Location</h3>
                                <p>Mirpur-10, Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-2'>
                        <div className='flex items-center gap-2'>
                            <LucideUserRoundCog size={16}></LucideUserRoundCog>
                            <span>{doctorInfo.experience} experience</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BiLike size={16}></BiLike>
                            <span>{doctorInfo.vote} votes</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <LucideCalendar size={16}></LucideCalendar>

                            <span>{doctorInfo.available_days.map((day, index) => <span key={index}>{day} </span>)}</span>
                        </div>
                    <div className='flex items-center gap-2'>
                        <LucideMessageCircle size={16}></LucideMessageCircle>
                        <span>{doctorInfo.number_of_feedback} Feedback</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <MdOutlinePriceChange size={16}></MdOutlinePriceChange>
                        <span>{doctorInfo.consultation_fee}</span>
                    </div>

                    <div className='flex gap-2 mt-4'>
                        <Link ><button className="btn hover:bg-[#0E82FD] hover:text-white">Add Feedback</button></Link>
                        <Link to={`/book-appointment/${doctorInfo.name}`} state={doctorInfo._id} ><button className="btn hover:bg-[#0E82FD] hover:text-white">Book Appointment</button></Link>
                    </div>

                </div>
            </div>
            {/* About  */}
            <div className='border p-4 rounded-md'>
                <h3 className='text-lg font-semibold'>About "{doctorInfo.name}"</h3>
                <p>{doctorInfo.bio}</p>

                <h3 className='text-base font-semibold mt-4'>{doctorInfo.name}'s services</h3>
                <ul>
                    {
                        doctorInfo.services.map((service, index) => <li key={index}>{service}</li>)
                    }
                </ul>
            </div>
        </div>
        </div >
    );
};

export default DoctorDetails;