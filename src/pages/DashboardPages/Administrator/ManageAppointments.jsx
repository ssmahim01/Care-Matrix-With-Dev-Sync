// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '@/hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import DashboardPagesHeader from '@/shared/Section/DashboardPagesHeader';
// import { ClipboardPlus, MoreVertical, Trash } from 'lucide-react';
// import { BiDetail } from 'react-icons/bi';
// import { FaCircle } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from '@/components/ui/button';
// import useAppointment from '@/hooks/useAppointment';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import AppointmentDetailsModal from '@/components/Modal/AppointmentDetailsModal ';
// import toast from 'react-hot-toast';
// import { IoIosSearch } from 'react-icons/io';

// const ManageAppointments = () => {
//     const axiosSecure = useAxiosSecure();
//     const [sortDate, setSortDate] = useState('');
//     const [search, setSearch] = useState("")
//     const [category, setCategory] = useState("")
//     const [showSkeleton, setShowSkeleton] = useState(true);
//     const [openModal, setOpenModal] = useState(false);
//     const [selectedAppointment, setSelectedAppointment] = useState(null);
//     const [selectedSort, setSelectedSort] = useState("")
//     const [appointments, refetch, isLoading] = useAppointment(sortDate, search, category);

//     useEffect(() => {
//         const timer = setTimeout(() => setShowSkeleton(false), 2000);
//         return () => clearTimeout(timer);
//     }, []);

//      // delete appointment
//     // const handleDeleteAppointment = (_id) => {
//     //     Swal.fire({
//     //         title: "Are you sure?",
//     //         text: "You won't be able to revert this!",
//     //         icon: "warning",
//     //         showCancelButton: true,
//     //         confirmButtonColor: "#3085d6",
//     //         cancelButtonColor: "#d33",
//     //         confirmButtonText: "Yes, delete it!",
//     //     }).then((result) => {
//     //         if (result.isConfirmed) {
//     //             axiosSecure
//     //                 .delete(`/appointments/${_id}`)
//     //                 .then((res) => {
//     //                     if (res.data.deletedCount > 0) {
//     //                         refetch();
//     //                         Swal.fire("Deleted!", "Appointment has been canceled.", "success");
//     //                     }
//     //                 })
//     //                 .catch((err) => {
//     //                     Swal.fire("Error!", "Appointment has not been canceled.", "error");
//     //                 });
//     //         }
//     //     });
//     // };

//     const handleDetails = (appointment) => {
//         setSelectedAppointment(appointment);
//         setOpenModal(true);
//     };

//     // change status 
//     // const handleChangeAppointmentStatus = (appointment) => {
//     //     // console.log(appointment);
//     //     axiosSecure.patch(`appointments/${appointment._id}`)
//     //         .then(res => {
//     //             // console.log(res);
//     //             if (res.data.result.modifiedCount > 0) {
//     //                 refetch()
//     //                 if (res.data.result.message === "approved") {
//     //                     toast.success("Appointment approved successful.")
//     //                 } else {
//     //                     toast.success("Appointment make pending successful.")
//     //                 }

//     //             }
//     //         })

//     //         .catch(err => {
//     //             // console.log(err);
//     //             toast.err("Something went wrong try again.")

//     //         })
//     // }


//     const handleSortByDate = (value) => {
//         setSortDate(value);
//     }

//     return (
//         <div className="p-7">
//             <div className="flex flex-col md:flex-row justify-between">
//                 <DashboardPagesHeader
//                     title={"Manage Appointments"}
//                     subtitle={"View and manage all appointments in the system."}
//                     icon={ClipboardPlus}
//                 />

//             </div>
//             <div className="flex gap-4 mb-6 items-center flex-wrap">

//                 {/* Searchbar */}
//                 <div className="relative w-full flex xl:flex-1">
//                     <input
//                         className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
//                         placeholder="Search with patient or doctor name..."
//                         onChange={(e) => setSearch(e.target.value)}
//                         value={search}
//                     />
//                     <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
//                 </div>

//                 {/* Sort category  */}
//                 <Select value={category} onValueChange={(value) => {
//                     setCategory(value)
//                 }}>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Categories " />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All</SelectItem>
//                         <SelectItem value="upcoming">Upcoming</SelectItem>
//                         <SelectItem value="past">Past</SelectItem>
//                     </SelectContent>
//                 </Select>

//                 {/* Sort Controls */}
//                 <Select value={selectedSort} onValueChange={(value) => {
//                     handleSortByDate(value)
//                     setSelectedSort(value)
//                 }}>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Sort By " />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="asc">Date (Newest to oldest)</SelectItem>
//                         <SelectItem value="desc">Date (Oldest to newest)</SelectItem>
//                     </SelectContent>
//                 </Select>

//                 <Button className="cursor-pointer" onClick={() => { setSortDate(""); setSelectedSort(""); setSearch(""); setCategory("") }}>Reset</Button>
//             </div>

//             {/* Table */}
//             <Table className="rounded-md border border-gray-300 mt-4">
//                 <TableCaption className="mb-2">A list of all appointments.</TableCaption>
//                 <TableHeader>
//                     <TableRow className="bg-muted/50 border-b">
//                         <TableHead>Sl.</TableHead>
//                         <TableHead>Doctor</TableHead>
//                         <TableHead>Patient</TableHead>
//                         <TableHead>Age</TableHead>
//                         <TableHead>Phone</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Action</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {isLoading || showSkeleton ? (
//                         [...Array(9)].map((_, idx) => (
//                             <TableRow key={idx} className="animate-pulse">
//                                 <TableCell>
//                                     <div className="h-8 w-8 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-4 w-20 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-20 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-8 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-24 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-28 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-16 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-24 bg-muted rounded"></div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="h-8 w-10 bg-muted rounded"></div>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     ) : (
//                         appointments.reverse()?.map((appointment, index) => (
//                             <TableRow
//                                 key={appointment._id}
//                                 className="hover:bg-muted/50 border-b"
//                             >
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{appointment.doctorName}</TableCell>
//                                 <TableCell>{appointment.name}</TableCell>
//                                 <TableCell>{appointment.age}</TableCell>
//                                 <TableCell>{appointment.phone}</TableCell>
//                                 <TableCell>{appointment.email}</TableCell>
//                                 <TableCell>{appointment.date}</TableCell>
//                                 <TableCell>
//                                     <div className="flex items-center gap-2">
//                                         <span
//                                             className={`text-xs p-1 rounded-full ${appointment.status === "pending"
//                                                 ? "bg-yellow-500"
//                                                 : "bg-green-600"
//                                                 } text-white`}
//                                         >
//                                             <FaCircle size={7} />
//                                         </span>
//                                         <span className="capitalize text-sm font-medium text-foreground">
//                                             {appointment.status}
//                                         </span>
//                                     </div>
//                                 </TableCell>
//                                 <TableCell>
//                                     <DropdownMenu>
//                                         <DropdownMenuTrigger asChild>
//                                             <Button variant="ghost" size="icon">
//                                                 <MoreVertical className="h-5 w-5 text-foreground" />
//                                             </Button>
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent align="end">
//                                             {/* <DropdownMenuItem
//                                                 onClick={() => handleChangeAppointmentStatus(appointment)}
//                                                 className="flex items-center gap-2"
//                                             >
//                                                 <ClipboardPlus size={16} />
//                                                 {appointment?.status === "pending" ? "Confirm Appointment" : "Make Pending Appointment"}
//                                             </DropdownMenuItem> */}

//                                             <DropdownMenuItem
//                                                 onClick={() => handleDetails(appointment)}
//                                                 className="flex items-center gap-2"
//                                             >
//                                                 <BiDetail size={16} />
//                                                 View Details
//                                             </DropdownMenuItem>
//                                             {/* <DropdownMenuItem
//                                                 onClick={() => handleDeleteAppointment(appointment._id)}
//                                                 className="flex items-center gap-2"
//                                             >
//                                                 <Trash size={16} />
//                                                 Cancel Appointment
//                                             </DropdownMenuItem> */}
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>

//             {/* Modal */}
//             {selectedAppointment && (
//                 <AppointmentDetailsModal
//                     open={openModal}
//                     onOpenChange={setOpenModal}
//                     appointment={selectedAppointment}
//                 />
//             )}
//         </div>
//     );
// };

// export default ManageAppointments;



import React, { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import DashboardPagesHeader from '@/shared/Section/DashboardPagesHeader';
import { ClipboardPlus, MoreVertical, Trash } from 'lucide-react';
import { BiDetail } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import useAppointment from '@/hooks/useAppointment';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppointmentDetailsModal from '@/components/Modal/AppointmentDetailsModal ';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';

const ManageAppointments = () => {
    const [sortDate, setSortDate] = useState('');
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedSort, setSelectedSort] = useState("")
    const [appointments, refetch, isLoading] = useAppointment(sortDate, search, category);

    useEffect(() => {
        const timer = setTimeout(() => setShowSkeleton(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // delete appointment
    // const handleDeleteAppointment = (_id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure
    //                 .delete(`/appointments/${_id}`)
    //                 .then((res) => {
    //                     if (res.data.deletedCount > 0) {
    //                         refetch();
    //                         Swal.fire("Deleted!", "Appointment has been canceled.", "success");
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     Swal.fire("Error!", "Appointment has not been canceled.", "error");
    //                 });
    //         }
    //     });
    // };

    const handleDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setOpenModal(true);
    };


    const handleSortByDate = (value) => {
        setSortDate(value);
    }

    const approvedAppointments = appointments.filter(appointment => appointment?.status === "Approved")
    const prescribedAppointments = appointments.filter(appointment => appointment?.status === "Prescribed")
    console.log(appointments);


    return (
        <div className="p-7">
            <div className="flex flex-col md:flex-row justify-between">
                <DashboardPagesHeader
                    title={"Manage Appointments"}
                    subtitle={"View and manage all appointments in the system."}
                    icon={ClipboardPlus}
                />

            </div>
            <div className="flex gap-4 mb-6 items-center flex-wrap">

                {/* Searchbar */}
                <div className="relative w-full flex xl:flex-1">
                    <input
                        className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
                        placeholder="Search with patient or doctor name..."
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
                        <SelectItem value="asc">Date (Newest to oldest)</SelectItem>
                        <SelectItem value="desc">Date (Oldest to newest)</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="cursor-pointer" onClick={() => { setSortDate(""); setSelectedSort(""); setSearch(""); setCategory("") }}>Reset</Button>
            </div>

        

            <Tabs defaultValue="approved-appointments" className="space-y-4 ">
                {/* All Tablist */}
                <TabsList className="border w-full data-[state=selected]:bg-muted border-b transition-colors bg-base-200 hover:bg-base-200">
                    <TabsTrigger
                        value="approved-appointments"
                        className="cursor-pointer py-2 px-4"
                    >
                        Approved Appointments
                    </TabsTrigger>
                    <TabsTrigger
                        value="prescribed-appointments"
                        className="cursor-pointer py-2 px-4"
                    >
                        Prescribed Appointments
                    </TabsTrigger>

                    <TabsTrigger value="all-appointments" className="cursor-pointer py-2 px-4">
                        All Appointments
                    </TabsTrigger>
                </TabsList>

                {/* 1rd Tab Content: Approved Appointments */}
                <TabsContent value="approved-appointments" className="space-y-6">
                    <Table className="rounded-md border-gray-200">
                        <TableCaption className="mb-2">A list of all appointments.</TableCaption>
                        <TableHeader>
                            <TableRow className="data-[state=selected]:bg-muted border-b transition-colors bg-base-200 hover:bg-base-200">
                                <TableHead>Sl.</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading || showSkeleton ? (
                                [...Array(9)].map((_, idx) => (
                                    <TableRow key={idx} className="animate-pulse">
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-28 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-16 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-10 bg-muted rounded"></div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                approvedAppointments.reverse()?.map((appointment, index) => (
                                    <TableRow
                                        key={appointment._id}
                                        className="hover:bg-muted/50 border-b"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{appointment.doctorName}</TableCell>
                                        <TableCell>{appointment.name}</TableCell>
                                        <TableCell>{appointment.age}</TableCell>
                                        <TableCell>{appointment.phone}</TableCell>
                                        <TableCell>{appointment.email}</TableCell>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs p-1 rounded-full ${appointment.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-600"
                                                        } text-white`}
                                                >
                                                    <FaCircle size={7} />
                                                </span>
                                                <span className="capitalize text-sm font-medium text-foreground">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
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

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TabsContent>


                {/* 2nd Tab Content: Prescribed Appointment */}
                <TabsContent value="prescribed-appointments" className="space-y-6">

                    <Table className="rounded-md border-gray-200">
                        <TableCaption className="mb-2">A list of all appointments.</TableCaption>
                        <TableHeader>
                            <TableRow className="data-[state=selected]:bg-muted border-b transition-colors bg-base-200 hover:bg-base-200">
                                <TableHead>Sl.</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading || showSkeleton ? (
                                [...Array(9)].map((_, idx) => (
                                    <TableRow key={idx} className="animate-pulse">
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-28 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-16 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-10 bg-muted rounded"></div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                prescribedAppointments.reverse()?.map((appointment, index) => (
                                    <TableRow
                                        key={appointment._id}
                                        className="hover:bg-muted/50 border-b"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{appointment.doctorName}</TableCell>
                                        <TableCell>{appointment.name}</TableCell>
                                        <TableCell>{appointment.age}</TableCell>
                                        <TableCell>{appointment.phone}</TableCell>
                                        <TableCell>{appointment.email}</TableCell>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs p-1 rounded-full ${appointment.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-600"
                                                        } text-white`}
                                                >
                                                    <FaCircle size={7} />
                                                </span>
                                                <span className="capitalize text-sm font-medium text-foreground">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
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

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                </TabsContent>

                {/* 3rd Tab Content: all-appointments */}
                <TabsContent value="all-appointments" className="space-y-6">

                    <Table className="rounded-md ">
                        <TableCaption className="mb-2">A list of all appointments.</TableCaption>
                        <TableHeader>
                            <TableRow className="data-[state=selected]:bg-muted border-b transition-colors bg-base-200 hover:bg-base-200 ">
                                <TableHead>Sl.</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading || showSkeleton ? (
                                [...Array(9)].map((_, idx) => (
                                    <TableRow key={idx} className="animate-pulse border-0">
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-20 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-8 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-28 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-16 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-24 bg-muted rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-8 w-10 bg-muted rounded"></div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                appointments.reverse()?.map((appointment, index) => (
                                    <TableRow
                                        key={appointment._id}
                                        className="hover:bg-muted/50 border-b"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{appointment.doctorName}</TableCell>
                                        <TableCell>{appointment.name}</TableCell>
                                        <TableCell>{appointment.age}</TableCell>
                                        <TableCell>{appointment.phone}</TableCell>
                                        <TableCell>{appointment.email}</TableCell>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs p-1 rounded-full ${appointment.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-600"
                                                        } text-white`}
                                                >
                                                    <FaCircle size={7} />
                                                </span>
                                                <span className="capitalize text-sm font-medium text-foreground">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
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

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                </TabsContent>

            </Tabs>





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

export default ManageAppointments;