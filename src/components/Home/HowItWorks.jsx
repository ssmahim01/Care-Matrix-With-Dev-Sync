import {
  Search,
  UserCheck,
  CalendarCheck,
  HeartPulse,
  ClipboardList,
  Bell,
} from "lucide-react";

const HowItWorks = () => {
  const services = [
    {
      icon: <Search size={60} />,
      title: "Search Doctor",
      description:
        "Search for a doctor based on specialization, location, or availability.",
    },
    {
      icon: <UserCheck size={60} />,
      title: "Check Doctor Profile",
      description:
        "Explore detailed doctor profiles on our platform to make informed healthcare decisions.",
    },
    {
      icon: <CalendarCheck size={60} />,
      title: "Schedule Appointment",
      description:
        "Choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
    },
    {
      icon: <HeartPulse size={60} />,
      title: "Get Your Solution",
      description:
        "Discuss your health concerns with the doctor and receive personalized advice & solutions.",
    },
    {
      icon: <ClipboardList size={60} />,
      title: "Manage Medical Records",
      description:
        "Access and manage your medical records securely, ensuring all your health data is in one place.",
    },
    {
      icon: <Bell size={60} />,
      title: "Appointment Reminders",
      description:
        "Receive timely reminders about your upcoming appointments to stay on track with your healthcare.",
    },
  ];

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-wide">
          HOW{" "}
          <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
            IT
          </span>{" "}
          WORKS
        </h1>
        <h3 className="text-lg text-[#464646] font-medium tracking-wider">
          6 easy steps to get your solution
        </h3>
      </div>
      {/* Left Side Contents */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white grid h-full place-content-stretch w-full shadow-sm border border-border rounded-xl p-6 relative overflow-hidden group cursor-pointer before:bg-[#0E82FD] before:w-[38px] before:h-[38px] before:absolute before:top-0 before:right-0 before:rounded-bl-[35px] before:z-[-1] hover:before:scale-[38] before:transition-all before:ease-out before:duration-500 z-[0]"
          >
            {/* Icon */}
            <div className="transition-all duration-500 text-[#0E82FD] group-hover:text-white">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mt-2 tracking-wider transition-all duration-500 group-hover:text-white">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mt-2 whitespace-pre-line font-semibold transition-all duration-500 group-hover:text-white">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
