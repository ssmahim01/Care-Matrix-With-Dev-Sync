import React, { useEffect, useState } from 'react';
import { ClipboardPlus, MoreVertical, Trash } from 'lucide-react';
import { BiDetail } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import useMyAppointments from '@/hooks/useMyAppointments';
import DashboardPagesHeader from '@/shared/Section/DashboardPagesHeader';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import AppointmentDetailsModal from '@/components/Modal/AppointmentDetailsModal ';

const MyAppointments = () => {
    const [appointments, refetch, isLoading] = useMyAppointments();
    const axiosSecure = useAxiosSecure();
    const [showSkeleton, setShowSkeleton] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [sortDate, setSortDate] = useState("");

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

    const handleDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setOpenModal(true);
    };

    // Sort appointments based on selected date option
    const sortedAppointments = [...appointments]?.sort((a, b) => {
        if (sortDate === "asc") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortDate === "desc") {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    return (
        <div className='p-7'>
            <div className='flex flex-col md:flex-row justify-between'>
            <DashboardPagesHeader
                title={"My Appointments"}
                subtitle={"All your appointments — upcoming, current, and past — in one place!"}
                icon={ClipboardPlus}
            />

            {/* Sort Controls */}
            <div className="flex gap-4 mb-6 items-center flex-wrap">
                <Select value={sortDate} onValueChange={setSortDate}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Date (Ascending)</SelectItem>
                        <SelectItem value="desc">Date (Descending)</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={() => setSortDate("")}>Reset</Button>
            </div>
            </div>

            {/* Table */}
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
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="font-medium">
                        {isLoading || showSkeleton ? (
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
                            sortedAppointments?.map((appointment, index) => (
                                <tr className="hover:bg-gray-50 border border-gray-300" key={appointment._id}>
                                    <th>{index + 1}</th>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.age}</td>
                                    <td>{appointment.phone}</td>
                                    <td>{appointment.email}</td>
                                    <td>{appointment.date}</td>
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
                                    <td>
                                        <div className="dropdown">
                                            <div tabIndex={0} role="button" className="cursor-pointer p-2 mx-0 rounded w-fit">
                                                <MoreVertical className="text-gray-700" />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-12 top-0">
                                                <div
                                                    className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm'
                                                    onClick={() => handleDetails(appointment)}
                                                >
                                                    <BiDetail size={16} /><a>View Details</a>
                                                </div>
                                                <div
                                                    className='flex items-center gap-4 hover:bg-base-200 cursor-pointer p-2 rounded-sm'
                                                    onClick={() => handleDeleteAppointment(appointment._id)}
                                                >
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

            {/* Modal */}
            {selectedAppointment && (
                <AppointmentDetailsModal
                    open={openModal}
                    onOpenChange={setOpenModal}
                    appointment={selectedAppointment}
                />
            )}
        </div>
    );
};

export default MyAppointments;
