const DashboardPagesHeader = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-4 ">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 flex items-center gap-3">
          {Icon && <Icon className="text-3xl text-gray-700" />}
          {title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg lg:text-xl mt-1 ml-[2px] font-medium lg:whitespace-pre-line">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default DashboardPagesHeader;
