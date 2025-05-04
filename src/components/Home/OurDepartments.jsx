import { ArrowRight } from "lucide-react";
import React, { lazy } from "react";
import { Link } from "react-router";

// Lazy load the components
const SectionHeader = lazy(() => import("@/shared/Section/SectionHeader"));
const UnderLineButton = lazy(() => import("@/shared/Section/UnderLineButton"));

const OurDepartments = () => {
  // Departments Data --->
  const departments = [
    {
      _id: "1",
      title: "Baby Care Department",
      description:
        "Providing specialized care for newborns and infants, ensuring their healthy growth and development.",
      image:
        "https://img.freepik.com/premium-photo/high-angle-view-food-table_1048944-7643498.jpg?w=1380",
    },
    {
      _id: "2",
      title: "Dental Department",
      description:
        "Comprehensive dental care services, from routine check-ups to advanced treatments for oral health.",
      image:
        "https://img.freepik.com/free-photo/dental-clinic-interior-with-modern-dentistry-equipment-orange-color-stomatology-cabinet-with-nobody-it-orange-equipment-oral-treatment_482257-12486.jpg?t=st=1741740388~exp=1741743988~hmac=0a32faa341ad5922ef3255d29331ef201abb3e5e546f5fd0f65c4f8210b272d6&w=1380",
    },
    {
      _id: "3",
      title: "Neurology Department",
      description:
        "Expert diagnosis and treatment for neurological disorders affecting the brain, spinal cord, and nerves.",
      image:
        "https://img.freepik.com/free-photo/modern-empty-hospital-office-having-computer-with-mri-brain-diagaram-screen-ready-oncology-examination-cabinet-room-equipped-with-medical-professional-tools-brain-tomography-image_482257-32004.jpg?t=st=1741740440~exp=1741744040~hmac=f236cfade4afca2aa0bc48e20f4e4069cdaa110d10977c47c4ec44ab79d7fdbd&w=1380",
    },
    {
      _id: "4",
      title: "Surgery Department",
      description:
        "Advanced surgical procedures with state-of-the-art technology and expert surgeons.",
      image:
        "https://img.freepik.com/free-photo/interior-view-operating-room_1170-2254.jpg?t=st=1741740553~exp=1741744153~hmac=ed4a77b1cf940fc3aae8a28b1f22604a70c8aa2024cf58f1b106b2896b14b631&w=1380",
    },
    {
      _id: "5",
      title: "Emergency Department",
      description:
        "24/7 emergency services for critical and life-threatening conditions.",
      image:
        "https://img.freepik.com/premium-photo/inside-medical-helicopter-with-emergency-life-support-equipment_1048944-21487952.jpg?w=1380",
    },
    {
      _id: "6",
      title: "Gynecology Department",
      description:
        "Specialized care for women's health, pregnancy, and reproductive health.",
      image:
        "https://img.freepik.com/premium-photo/empty-examination-bed-hospital_1048944-3285307.jpg?w=1380",
    },
  ];

  return (
    <div>
      {/* Section Heading */}
      <SectionHeader
        title_1st_slice={"OUR"}
        title_2nd_slice={"MEDICAL"}
        title_3rd_slice={"DEPARTMENTS"}
        subTitle={
          " Delivering Advanced, Specialized Care Across a Wide Range of Medical \n Fields. Compassionate Experts Dedicated to Your Health and Well-Being."
        }
      />
      {/* Main Container */}
      <div className="mt-6 grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {departments?.map((department, i) => (
          <Link
            key={i}
            to={`/departments/${encodeURIComponent(department?.title)}`}
            state={department?.title}
          >
            <div className="z-10 group relative cursor-pointer h-full w-full overflow-hidden rounded-xl bg-white transition-all duration-300 hover:translate-y-[-5px]">
              {/* Card shadow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-100/50 to-blue-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Image container with gradient overlay */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <img
                  src={department?.image || "/placeholder.svg"}
                  alt={department?.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 p-5">
                <h3 className="mb-2 text-xl font-bold text-gray-800 tracking-tight">
                  {department?.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                  {department?.description}
                </p>
                <span className="cursor-pointer group/link inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
                  Read More
                  <ArrowRight className="ml-1 mt-0.5 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </span>
              </div>

              {/* Subtle border */}
              <div className="absolute inset-0 rounded-xl border border-gray-200 shadow-sm" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurDepartments;
