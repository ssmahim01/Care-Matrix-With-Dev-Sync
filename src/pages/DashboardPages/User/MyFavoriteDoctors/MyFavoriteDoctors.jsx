import useAxiosSecure from '@/hooks/useAxiosSecure';
import useFavoriteDoctors from '@/hooks/useFavoriteDoctors';
import React from 'react';
import toast from 'react-hot-toast';
import { BiTrashAlt } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const MyFavoriteDoctors = () => {
    const [favoriteDoctors, refetch, isLoading] = useFavoriteDoctors()
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);

    const handleRemove = (_id) => {
        console.log("REmove ", _id);

        axiosSecure.delete(`/favorite-doctors/${_id}`)
            .then(res => {
                if (res?.data?.deletedCount > 0) {
                    toast.success("Removed successfully!")
                    refetch();
                }
            })
            .catch(err => {
                toast.error("Something went wrong! Please try again.")
            })
    }
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Doctor</th>
                            <th>Rating</th>
                            <th>Experience</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            favoriteDoctors?.map((doctor, index) => <tr className='hover:bg-base-200' key={doctor._id}>
                                <th>{index + 1}</th>
                                <td className='flex gap-2'>
                                    <img className='w-12 h-12 object-cover rounded-full' src={doctor.doctorInfo.image} alt="" />
                                    <div>
                                        <span>{doctor.doctorInfo.name}</span> <br />
                                        <span>{doctor.doctorInfo.title}</span>
                                    </div>
                                </td>
                                <td>{doctor.doctorInfo.rating}</td>
                                <td>{doctor.doctorInfo.experience}</td>
                                <td><button onClick={() => handleRemove(doctor?._id)} className='btn tooltip text-red-700 ' data-tip="Remove from favorite list"><FaTrashAlt size={16}></FaTrashAlt></button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFavoriteDoctors;