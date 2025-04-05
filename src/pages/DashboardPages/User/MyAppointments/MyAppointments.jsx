
import useMyAppointments from '@/hooks/useMyAppointments';
import React from 'react';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

const MyAppointments = () => {
    const [appointments, refetch, isLoading] = useMyAppointments()
    console.log(appointments);

    return (
        <div>
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
                            <th>reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            appointments?.map((appointment, index) => <tr key={appointment._id}>
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
                                    <div>
                                        {/* onClick={() => handleConfirmAppointment(appointment._id)} */}
                                        {/* <button className='btn btn-sm bg-green-500 text-white'><FaCheck></FaCheck></button> */}
                                        <button onClick={() => handleDeleteAppointment(appointment._id)} className='btn btn-sm bg-red-700 text-white'><FaTrashAlt ></FaTrashAlt></button>
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