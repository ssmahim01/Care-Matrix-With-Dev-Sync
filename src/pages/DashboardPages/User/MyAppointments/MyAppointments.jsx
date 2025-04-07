
import UsersTable from '@/components/Table/UsersTable';
import useMyAppointments from '@/hooks/useMyAppointments';
import { Check, MoreVertical, Trash } from 'lucide-react';
import React from 'react';
import { BiDetail } from 'react-icons/bi';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { MdDetails, MdPendingActions } from 'react-icons/md';

const MyAppointments = () => {
    const [appointments, refetch, isLoading] = useMyAppointments()
    console.log(appointments);

    return (
        <div>
            <div className="overflow-x-auto border border-base-content/5 bg-base-100 ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300 rounded-none text-gray-900'>
                            <th>Sl.</th>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            appointments?.map((appointment, index) => <tr className='hover:bg-gray-100' key={appointment._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {appointment.doctorName}
                                </td>

                                <td>{appointment.name}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <div className="dropdown">
                                        <div tabIndex={0} role='button' className="  cursor-pointer p-2 mx-0 rounded  w-fit">
                                            <MoreVertical className="cursor-pointer text-gray-700" />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0 ">
                                            <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDetails(appointment._id)} > <span><BiDetail size={16} /></span> <a>View Details</a></div>
                                            <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm' onClick={() => handleDeleteAppointment(appointment._id)} > <span><Trash size={16} /></span> <a>Remove</a></div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;