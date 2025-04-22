import AppointmentDetailsModal from '@/components/Modal/AppointmentDetailsModal ';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useDoctorsAppointment from '@/hooks/useDoctorsAppointment';
import DashboardPagesHeader from '@/shared/Section/DashboardPagesHeader';
import { ClipboardPlus, MoreVertical, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiDetail } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineCalendarMonth } from 'react-icons/md';


const MyAppointmentDoctor = () => {
    const [selectedSort, setSelectedSort] = useState("")
    const [search, setSearch] = useState("")
    const [sortDate, setSortDate] = useState("")
    const [category, setCategory] = useState("")
    const [appointments, isLoading, refetch] = useDoctorsAppointment(sortDate, search, category)
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setOpenModal(true);
    };

    const handleSortByDate = (value) => {
        console.log(value);
        setSortDate(value)
    }

    const handleCancelAppointment = (appointment) => {
        console.log(appointment);
        axiosSecure.patch(`appointments/${appointment._id}`)
            .then(res => {
                console.log(res);
                if (res.data.result.modifiedCount > 0) {
                    refetch()
                    toast.success("Appointment canceled successful.")
                }
            })

            .catch(err => {
                console.log(err);
                toast.error("Something went wrong try again.")

            })
    }

    console.log("Doctors appointments are ", appointments);
    return (
        <div className='p-7'>
            <div className='flex flex-col md:flex-row justify-between'>
                <DashboardPagesHeader
                    title={"My Appointments"}
                    subtitle={"All your appointments upcoming, current, and past in one place!"}
                    icon={MdOutlineCalendarMonth}
                />
            </div>
            <div className="flex gap-4 mb-6 items-center flex-wrap">

                {/* Searchbar */}
                <div className="relative w-full flex xl:flex-1">
                    <input
                        className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
                        placeholder="Search with name or email..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
                </div>

                {/* Sort category  */}
                <Select value={category} onValueChange={(value) => {
                    setCategory(value)
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categories " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort Controls */}
                <Select value={selectedSort} onValueChange={(value) => {
                    handleSortByDate(value)
                    setSelectedSort(value)
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Date (Ascending)</SelectItem>
                        <SelectItem value="desc">Date (Descending)</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="cursor-pointer" onClick={() => { setSortDate(""); setSelectedSort(""); setSearch(""); setCategory("") }}>Reset</Button>
            </div>

            {/* Table */}
            <Table className="rounded-md border-gray-300 border-b mt-4">
                <TableCaption className="mb-2">A list of your appointments.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Sl.</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="border-0">
                    {(isLoading || showSkeleton) ? (
                        [...Array(5)].map((_, idx) => (
                            <TableRow key={idx} className="animate-pulse">
                                {Array(9).fill().map((_, i) => (
                                    <TableCell key={i}>
                                        <div className="skeleton h-6 w-full max-w-[100px] rounded-md"></div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : 
                        appointments.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={12}
                            className="text-center py-8 text-gray-500"
                          >
                            No appointments found
                          </TableCell>
                        </TableRow>
                      )
                    : (
                        appointments.reverse()?.map((appointment, index) => (
                            <TableRow key={appointment._id} className="hover:bg-gray-50">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell>{appointment.age}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs p-1 rounded-full ${appointment.status === "pending" ? 'bg-yellow-500' : 'bg-green-600'} text-white`}>
                                            <FaCircle size={7} />
                                        </span>
                                        <span className="capitalize text-sm font-medium text-gray-700">
                                            {appointment.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                                <MoreVertical className="h-5 w-5 text-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleDetails(appointment)}
                                                className="flex items-center gap-2"
                                            >
                                                <BiDetail size={16} />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleCancelAppointment(appointment)}
                                                className="flex items-center gap-2"
                                            >
                                                <Trash size={16} />
                                                Cancel Appointment
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

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

export default MyAppointmentDoctor;