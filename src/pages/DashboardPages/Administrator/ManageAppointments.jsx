import useAppointment from '@/hooks/useAppointment';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useDoctors from '@/hooks/useDoctors';
import { Check, MoreVertical, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdPendingActions } from 'react-icons/md';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { FaCircle } from 'react-icons/fa';

const ManageAppointments = () => {
    const [doctors] = useDoctors();
    const [appointments, refetch, isLoading] = useAppointment();
    const axiosSecure = useAxiosSecure();

    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);

        return () => clearTimeout(timer);
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

    const handleConfirmAppointment = (_id) => {
        axiosSecure.patch(`/appointments/${_id}`)
            .then(res => {
                if (res?.data?.result?.modifiedCount > 0) {
                    if (res?.data?.message === "approved") {
                        toast.success("Appointment approved successfully!");
                    } else {
                        toast.success("Appointment pending successfully!");
                    }
                    refetch();
                }
            })
            .catch(() => {
                toast.error("Something went wrong!");
            });
    };

    return (
        <div>
            <div className="overflow-x-auto border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr className='bg-base-300 text-gray-900'>
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
                    <tbody className='font-medium'>
                        {(isLoading || showSkeleton)
                            ? [...Array(8)].map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td><div className="skeleton h-8 w-8"></div></td>
                                    <td><div className="skeleton h-8 w-20"></div></td>
                                    <td><div className="skeleton h-8 w-20"></div></td>
                                    <td><div className="skeleton h-8 w-8"></div></td>
                                    <td><div className="skeleton h-8 w-24"></div></td>
                                    <td><div className="skeleton h-8 w-28"></div></td>
                                    <td><div className="skeleton h-8 w-16"></div></td>
                                    <td><div className="skeleton h-8 w-24"></div></td>
                                    <td><div className="skeleton h-8 w-10"></div></td>
                                </tr>
                            ))
                            : appointments?.map((appointment, index) => (
                                <tr className='hover:bg-gray-50 border border-gray-200' key={appointment._id}>
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
                                            <div tabIndex={0} role='button' className="bg-base-200 cursor-pointer p-2 mx-0 rounded border border-border w-fit">
                                                <MoreVertical className="cursor-pointer text-gray-700" />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0">
                                                {
                                                    appointment?.status === "pending"
                                                        ? <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleConfirmAppointment(appointment._id)}><Check size={16} /><a>Confirm Appointment</a></div>
                                                        : <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleConfirmAppointment(appointment._id)}><MdPendingActions size={16} /><a>Make Pending Appointment</a></div>
                                                }
                                                <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDeleteAppointment(appointment._id)}><Trash size={16} /><a>Remove</a></div>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageAppointments;
