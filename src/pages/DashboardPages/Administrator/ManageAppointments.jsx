import useAppointment from '@/hooks/useAppointment';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ManageAppointments = () => {
    const [appointments] = useAppointment()

    console.log("Appoints from manage page", appointments);
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
    appointments?.map((appointment, index) =>  <tr key={appointment._id}>
        <th>{index + 1}</th>
        <td>{}</td>
        <td>{appointment.name}</td>
        <td>{appointment.age}</td>
        <td>{appointment.phone}</td>
        <td>{appointment.email}</td>
        <td>{appointment.reason}</td>
        <td>
            <div>
                <button className='btn btn-sm bg-red-500 text-white'><FaTrashAlt ></FaTrashAlt></button>
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