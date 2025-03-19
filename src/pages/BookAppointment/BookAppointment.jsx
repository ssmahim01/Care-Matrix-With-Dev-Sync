import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

const BookAppointment = () => {

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const location = useLocation();

    const doctorInfo = doctors.find(doctor => doctor.id === location.state)

    const onSubmit = (data) => {
        const name = data.name;
        const phone = data.phone;
        const age = data.age;
        const email = data.email;
        const date = data.date;
        const time = data.time;
        const reason = data.reason;

        console.log(name, phone, email, age, date, time, reason);
    }


    return (
        <div className='w-11/12 lg:w-10/12 mx-auto max-w-screen-2xl pb-12 border-t pt-24 space-y-4'>
            <div className='border p-4 bg-slate-100 flex gap-2 rounded-md'>
               <img className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover' src={doctorInfo?.image} alt="" />
               <div>
                <h3 className='text-lg font-semibold'>{doctorInfo?.name}</h3>
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


                <button type="submit" className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px]">Submit</button>

            </form>
            </div>
        </div>
    );
};

export default BookAppointment;