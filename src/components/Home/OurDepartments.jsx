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
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
          OUR{" "}
          <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
            MEDICAL
          </span>{" "}
          DEPARTMENTS
        </h1>
        <h3 className="text-lg md:text-xl text-[#464646] font-medium tracking-wider">
          Delivering Advanced, Specialized Care Across a Wide Range of{" "}
          <br className="hidden md:block" />
          Medical Fields. Compassionate Experts Dedicated to Your Health and
          Well-Being.
        </h3>
      </div>
      {/* Main Container */}
      <div className="mt-6 grid gap-7 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {departments?.map((department) => (
          <div
            key={department?._id}
            className="w-full h-full grid place-content-stretch shadow-[0px_4px_10px_#0E82FD50] hover:shadow-none z-0 bg-white rounded relative cursor-pointer group 
            before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] 
            before:w-full before:h-full before:rounded before:bg-[#0E82FD20] before:transition-all before:duration-500 before:z-[-1] 
            after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] 
            after:rounded after:bg-[#0E82FD10] after:z-[-2] after:transition-all after:duration-500"
          >
            {/*  image  */}
            <img
              src={department?.image}
              alt="animated_card"
              className="w-full h-[200px] rounded-t object-cover"
            />

            {/*  contents  */}
            <div className="p-[18px] pt-2.5 bg-white rounded-b">
              <h3 className="text-[1.5rem] font-bold text-[#272727] tracking-wide">
                {department?.title}
              </h3>
              <p className="text-[1rem] mt-1 font-[400] text-gray-600">
                {department?.description}
              </p>
              <button className="btn border-none hover:bg-[#0e81fdc6] text-[1rem] duration-500 bg-[#0E82FD] text-white mt-4">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurDepartments;
