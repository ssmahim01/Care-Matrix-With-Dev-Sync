import useAppointment from '@/hooks/useAppointment';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useDoctors from '@/hooks/useDoctors';
import React from 'react';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

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

    console.log("doctors from manage appointment ", doctors);
    console.log("appointments from manage appointment ", appointments);

    // const handleConfirmAppointment = (_id) => {

    //     const changeAppointmentStatus = {

    //     }
    //     axiosSecure.patch(`/appointments/status/${_id}`,)


    // }


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
                                    {doctors?.find(doctor => doctor._id === appointment.doctorId)?.name}
                                </td>

                                <td>{appointment.name}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <div>
                                        {/* onClick={() => handleConfirmAppointment(appointment._id)} */}
                                        <button className='btn btn-sm bg-green-500 text-white'><FaCheck></FaCheck></button>
                                        <button onClick={() => handleDeleteAppointment(appointment._id)} className='btn btn-sm bg-red-500 text-white'><FaTrashAlt ></FaTrashAlt></button>
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

export default ManageAppointments;