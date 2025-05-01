import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useFavoriteDoctors from "@/hooks/useFavoriteDoctors";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { ClipboardPlus, MoreVertical, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiDetail } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Make sure to use react-router-dom not react-router

const MyFavoriteDoctors = () => {
    const [favoriteDoctors, refetch, isLoading] = useFavoriteDoctors();
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleRemove = (_id) => {
        axiosSecure
            .delete(`/favorite-doctors/${_id}`)
            .then((res) => {
                if (res?.data?.deletedCount > 0) {
                    toast.success("Removed successfully!");
                    refetch();
                }
            })
            .catch(() => {
                toast.error("Something went wrong! Please try again.");
            });
    };

    return (
        <div className="p-7 pt-0">
            <DashboardPagesHeader
                title={"Favorite Doctors"}
                subtitle={"View your all favorite doctors"}
                icon={FaUserDoctor}
            />
            <Table className="rounded-md border border-gray-300 mt-4">
                <TableCaption className="mb-2">A list of your favorite doctors.</TableCaption>

                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead>Sl.</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Consultation Fee</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading || showSkeleton
                        ? [...Array(6)].map((_, idx) => (
                            <TableRow key={idx} className="animate-pulse">
                                <TableCell>
                                    <div className="skeleton h-6 w-6 rounded"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <div className="skeleton w-10 h-10 rounded-lg"></div>
                                        <div className="space-y-1">
                                            <div className="skeleton h-4 w-24"></div>
                                            <div className="skeleton h-3 w-20"></div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="skeleton h-4 w-10"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="skeleton h-4 w-20"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="skeleton h-4 w-12"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="skeleton h-4 w-8 ml-auto"></div>
                                </TableCell>
                            </TableRow>
                        ))
                        : favoriteDoctors.reverse()?.map((doctor, index) => (
                            <TableRow key={doctor._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={doctor.doctorInfo.image}
                                            alt="Doctor"
                                            className="w-10 h-10 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="font-semibold">{doctor.doctorInfo.name}</p>
                                            <p className="text-muted-foreground text-sm">{doctor.doctorInfo.title}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar /> {doctor.doctorInfo.rating}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                        {doctor.doctorInfo.experience}
                                    </span>
                                </TableCell>
                                <TableCell>{doctor.doctorInfo.consultation_fee}</TableCell>
                                <TableCell className="text-right">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                            <MoreVertical size={18} />
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <Link
                                                    to={`/doctor-details/${doctor.doctorInfo._id}`}
                                                    state={doctor.doctorInfo._id}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <BiDetail size={16} />
                                                        <span>View Details</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/book-appointment/${doctor.doctorInfo.name}`}
                                                    state={doctor.doctorInfo._id}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ClipboardPlus size={16} />
                                                        <span>Book Appointment</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleRemove(doctor._id)}
                                                    className="flex items-center gap-2 text-red-500"
                                                >
                                                    <Trash size={16} />
                                                    <span>Remove from Favorite</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>

    );
};

export default MyFavoriteDoctors;
