
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

    const doctors = [
        {
            "id": 1,
            "name": "Dr. Sarah Johnson",
            "image": "https://i.ibb.co.com/WWp3yKDz/image.png",
            "rating": 4.9,
            "title": "Cardiologist",
            "experience": "12+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Wednesday", "Friday"],
            "consultation_fee": "$150",
            "services": [
                "ECG & ECHO",
                "Blood Pressure Management",
                "Heart Disease Treatment",
                "Cardiac Stress Test",
                "Cholesterol Management"
            ],
            "bio": "Dr. Sarah Johnson is a highly skilled cardiologist specializing in heart-related diseases and treatments. She has helped thousands of patients manage their heart conditions and improve their quality of life.",
            "vote": 120,
            "number_of_feedback": 98,
            "treated_patients": 1500
        },
        {
            "id": 2,
            "name": "Dr. Michael Smith",
            "image": "https://i.ibb.co.com/F4M3hFY4/image.png",
            "rating": 4.8,
            "title": "Neurologist",
            "experience": "10+ years",
            "chamber": "CareMatrix",
            "available_days": ["Tuesday", "Thursday", "Saturday"],
            "consultation_fee": "$140",
            "services": [
                "Migraine Treatment",
                "Epilepsy Management",
                "Stroke Rehabilitation",
                "Spinal Cord Disorders",
                "Neurodiagnostic Tests"
            ],
            "bio": "With years of expertise in neurology, Dr. Michael Smith is known for his exceptional ability to diagnose and treat neurological disorders.",
            "vote": 105,
            "number_of_feedback": 85,
            "treated_patients": 1300
        },
        {
            "id": 3,
            "name": "Dr. Emily Brown",
            "image": "https://i.ibb.co.com/39hPW8d1/image.png",
            "rating": 4.7,
            "title": "Dermatologist",
            "experience": "8+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "consultation_fee": "$120",
            "services": [
                "Acne & Scar Treatment",
                "Laser Therapy",
                "Skin Cancer Screening",
                "Cosmetic Dermatology",
                "Hair Loss Treatment"
            ],
            "bio": "Dr. Emily Brown is an expert in skincare and cosmetic dermatology, helping patients achieve healthy and glowing skin.",
            "vote": 98,
            "number_of_feedback": 78,
            "treated_patients": 1100
        },
        {
            "id": 4,
            "name": "Dr. James Wilson",
            "image": "https://i.ibb.co.com/FbsX85Nn/image.png",
            "rating": 4.6,
            "title": "Orthopedic Surgeon",
            "experience": "15+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Wednesday", "Friday"],
            "consultation_fee": "$180",
            "services": [
                "Joint Replacement Surgery",
                "Arthritis Treatment",
                "Fracture Management",
                "Sports Injury Treatment",
                "Spine Surgery"
            ],
            "bio": "Dr. James Wilson is a renowned orthopedic surgeon specializing in complex joint and spine surgeries, restoring mobility for thousands of patients.",
            "vote": 115,
            "number_of_feedback": 90,
            "treated_patients": 1700
        },
        {
            "id": 5,
            "name": "Dr. Olivia Martinez",
            "image": "https://i.ibb.co.com/6chHc9LB/image.png",
            "rating": 4.9,
            "title": "Pediatrician",
            "experience": "9+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "consultation_fee": "$110",
            "services": [
                "Vaccinations",
                "Child Growth Monitoring",
                "Nutrition Counseling",
                "Allergy Treatment",
                "Neonatal Care"
            ],
            "bio": "Dr. Olivia Martinez is a caring and dedicated pediatrician, ensuring children's health with her compassionate care and expertise.",
            "vote": 130,
            "number_of_feedback": 100,
            "treated_patients": 1600
        },
        {
            "id": 6,
            "name": "Dr. William Anderson",
            "image": "https://i.ibb.co.com/XrWMk0Mh/image.png",
            "rating": 4.8,
            "title": "General Surgeon",
            "experience": "14+ years",
            "chamber": "CareMatrix",
            "available_days": ["Tuesday", "Thursday", "Saturday"],
            "consultation_fee": "$160",
            "services": [
                "Appendectomy",
                "Hernia Repair",
                "Gallbladder Surgery",
                "Laparoscopic Surgery",
                "Wound Care"
            ],
            "bio": "Dr. William Anderson is a highly experienced general surgeon known for his precision in surgical procedures and patient care.",
            "vote": 110,
            "number_of_feedback": 88,
            "treated_patients": 1400
        },
        {
            "id": 7,
            "name": "Dr. Sophia Carter",
            "image": "https://i.ibb.co.com/tTTy0qmj/image.png",
            "rating": 4.7,
            "title": "Endocrinologist",
            "experience": "11+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Wednesday", "Friday"],
            "consultation_fee": "$130",
            "services": [
                "Diabetes Management",
                "Thyroid Disorders",
                "Obesity Treatment",
                "Hormonal Imbalance Therapy",
                "Osteoporosis Treatment"
            ],
            "bio": "Dr. Sophia Carter specializes in hormone-related disorders, helping patients manage conditions like diabetes and thyroid diseases.",
            "vote": 102,
            "number_of_feedback": 80,
            "treated_patients": 1250
        },
        {
            "id": 8,
            "name": "Dr. Daniel Lee",
            "image": "https://i.ibb.co.com/dwkZbPRD/image.png",
            "rating": 4.6,
            "title": "Psychiatrist",
            "experience": "10+ years",
            "chamber": "CareMatrix",
            "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "consultation_fee": "$125",
            "services": [
                "Depression & Anxiety Treatment",
                "Cognitive Behavioral Therapy",
                "PTSD & Trauma Therapy",
                "Substance Abuse Counseling",
                "ADHD Management"
            ],
            "bio": "Dr. Daniel Lee is a compassionate psychiatrist dedicated to improving mental health and providing emotional well-being to his patients.",
            "vote": 95,
            "number_of_feedback": 75,
            "treated_patients": 1150
        }
    ]


    const location = useLocation();
    console.log("State id is ", location.state);
    console.log("doctors are", doctors);

    const doctorInfo = doctors.find(doctor => doctor.id === location.state)

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
                            <span>10 Patients Treated</span>
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
                        <Link><button className="btn hover:bg-[#0E82FD] hover:text-white">Add Feedback</button></Link>
                        <Link><button className="btn hover:bg-[#0E82FD] hover:text-white">Book Appointment</button></Link>
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