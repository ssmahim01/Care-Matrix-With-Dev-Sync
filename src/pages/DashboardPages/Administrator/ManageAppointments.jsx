import useAppointment from '@/hooks/useAppointment';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useDoctors from '@/hooks/useDoctors';
import { Check, MoreVertical, Trash } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { MdPendingActions } from 'react-icons/md';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";

const ManageAppointments = () => {
    const [doctors] = useDoctors()
    const [appointments, refetch, isLoading] = useAppointment()
    const axiosSecure = useAxiosSecure();

    const handleDeleteAppointment = (_id) => {
        // console.log("Delete appointment ", _id);
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
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Appointment has been canceled.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: "Appointment has not been canceled.",
                            icon: "error"
                        });
                    })
            }
        });
    }


    const handleConfirmAppointment = (_id) => {

        axiosSecure.patch(`/appointments/${_id}`)
            .then(res => {
                if (res?.data?.result?.modifiedCount > 0) {
                    if (res?.data?.message === "approved") {
                        toast.success("Appointment approved successfully!")
                    } else {
                        toast.success("Appointment pending successfully!")
                    }
                    refetch();
                }
            })
            .catch(err => {
                console.log("Error happen ", err);
                toast.error("Something went wrong!")

            })

    }

    return (
        <div>
             <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            appointments?.map((appointment, index) => <tr className='hover:bg-base-200' key={appointment._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {doctors?.find(doctor => doctor._id === appointment.doctorId)?.name}
                                </td>

                                <td>{appointment.name}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <div className="dropdown">
                                        <div tabIndex={0} role='button' className="bg-base-200 cursor-pointer p-2 mx-0 rounded border border-border w-fit">
                                            <MoreVertical className="cursor-pointer text-gray-700" />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0 ">
                                            {
                                                appointment?.status === "pending" ? <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleConfirmAppointment(appointment._id)} > <span><Check size={16} /></span><a>Confirm Appointment</a></div> : <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleConfirmAppointment(appointment._id)} > <span><MdPendingActions size={16} /></span><a>Make Pending Appointment</a></div>
                                            }

                                            <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDeleteAppointment(appointment._id)} > <span><Trash size={16} /></span> <a>Remove</a></div>
                                        </ul>
                                    </div>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            </motion.div>
        </div>
    );
};

export default ManageAppointments;