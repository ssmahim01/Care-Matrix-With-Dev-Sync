import useAxiosSecure from '@/hooks/useAxiosSecure';
import useFavoriteDoctors from '@/hooks/useFavoriteDoctors';
import { ClipboardPlus, MoreVertical, Trash, Trash2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { BiDetail, BiTrashAlt } from 'react-icons/bi';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

const MyFavoriteDoctors = () => {
    const [favoriteDoctors, refetch, isLoading] = useFavoriteDoctors()
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    console.log(favoriteDoctors);
    const handleRemove = (_id) => {
        // console.log("REmove ", _id);

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
            <div className="overflow-x-auto border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-gray-900 bg-base-300 border border-gray-200'>
                            <th>Sl.</th>
                            <th>Doctor</th>
                            <th>Rating</th>
                            <th>Experience</th>
                            <th>Consultation Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='font-medium'>

                        {
                            favoriteDoctors?.map((doctor, index) => <tr className='hover:bg-gray-50 border border-gray-200' key={doctor._id}>
                                <th>{index + 1}</th>
                                <td className='flex gap-2'>
                                    <img className='w-10 h-10 object-cover rounded-lg' src={doctor.doctorInfo.image} alt="" />
                                    <div>
                                        <span className='font-bold'>{doctor.doctorInfo.name}</span> <br />
                                        <span>{doctor.doctorInfo.title}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex items-center gap-1'><span className='text-yellow-500'><FaStar></FaStar></span> {doctor.doctorInfo.rating}</div>
                                </td>
                                <td >
                                    <span className='bg-blue-100 px-2 py-1 text-sm rounded-md'>{doctor.doctorInfo.experience} </span>
                                </td>
                                <td >{doctor.doctorInfo.consultation_fee}</td>
                                <td>
                                    <div className="dropdown">
                                        <div tabIndex={0} role='button' className="  cursor-pointer p-2 mx-0 rounded  w-fit">
                                            <MoreVertical className="cursor-pointer text-gray-700" />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0 ">
                                            <div className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm'> <span><BiDetail size={16} /></span><a>View Details</a></div>

                                            <Link to={`/book-appointment/${doctor.doctorInfo.name}`} state={doctor.doctorInfo._id} className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm'> <span><ClipboardPlus size={16} /></span> <a>Book Appointment</a></Link>

                                            <div onClick={() => handleRemove(doctor._id)} className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm'> <span><Trash size={16} /></span> <a>Remove From Favorite</a></div>
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

export default MyFavoriteDoctors;