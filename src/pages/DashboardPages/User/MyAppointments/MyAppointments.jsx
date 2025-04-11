import React, { useEffect, useState } from 'react';
import { ClipboardPlus, MoreVertical, Trash } from 'lucide-react';
import { BiDetail } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import useMyAppointments from '@/hooks/useMyAppointments';
import DashboardPagesHeader from '@/shared/Section/DashboardPagesHeader';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const MyAppointments = () => {
    const [appointments, refetch, isLoading] = useMyAppointments();
    const axiosSecure = useAxiosSecure()

    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        // Minimum 2 seconds skeleton
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);

        return () => clearTimeout(timer); // cleanup
    }, []);

     const handleDeleteAppointment = (_id) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/appointments/${_id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire("Deleted!", "Appointment has been canceled.", "success");
                            }
                        })
                        .catch(err => {
                            Swal.fire("Error!", "Appointment has not been canceled.", "error");
                        });
                }
            });
        };

    return (
        <div className='p-7'>
            <DashboardPagesHeader
                title={"My Appointments"}
                subtitle={"All your appointments — upcoming, current, and past — in one place!"}
                icon={ClipboardPlus}
            />
            {/* Table  */}
            <div className="overflow-x-auto border border-base-content/5 bg-base-100 ">
                <table className="table">
                    <thead>
                        <tr className={`bg-base-200 border border-gray-200 text-gray-900`}>
                            <th>Sl.</th>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="font-medium">
                        {isLoading || showSkeleton ? (
                            // Show 5 rows of skeletons as placeholders
                            [...Array(9)].map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td><div className="skeleton h-8 w-8"></div></td>
                                    <td><div className="skeleton h-4 w-20"></div></td>
                                    <td><div className="skeleton h-8 w-20"></div></td>
                                    <td><div className="skeleton h-8 w-8"></div></td>
                                    <td><div className="skeleton h-8 w-24"></div></td>
                                    <td><div className="skeleton h-8 w-28"></div></td>
                                    <td><div className="skeleton h-8 w-16"></div></td>
                                    <td><div className="skeleton h-8 w-24"></div></td>
                                    <td><div className="skeleton h-8 w-10"></div></td>
                                </tr>
                            ))
                        ) : (
                            appointments?.map((appointment, index) => (
                                <tr className="hover:bg-gray-50 border border-gray-300" key={appointment._id}>
                                    <th>{index + 1}</th>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.age}</td>
                                    <td>{appointment.phone}</td>
                                    <td>{appointment.email}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs p-1 rounded-full ${appointment.status === "pending" ? 'bg-yellow-500' : 'bg-green-600'} text-white`}>
                                                <FaCircle size={7} />
                                            </span>
                                            <span className="capitalize text-sm font-medium text-gray-700">
                                                {appointment.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{appointment.reason}</td>
                                    <td>
                                        <div className="dropdown">
                                            <div tabIndex={0} role="button" className="cursor-pointer p-2 mx-0 rounded w-fit">
                                                <MoreVertical className="text-gray-700" />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0">
                                                <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDetails(appointment._id)} >
                                                    <BiDetail size={16} /><a>View Details</a>
                                                </div>
                                                <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDeleteAppointment(appointment._id)} >
                                                    <Trash size={16} /><a>Cancel Appointment</a>
                                                </div>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;
