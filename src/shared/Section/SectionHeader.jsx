const SectionHeader = ({
  title_1st_slice,
  title_2nd_slice,
  title_3rd_slice,
  subTitle,
}) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-[22px] md:text-[26px] font-extrabold tracking-wide">
        {title_1st_slice && title_1st_slice}{" "}
        <span className="text-[#0E82FD] tracking-wider underline underline-offset-4">
          {title_2nd_slice && title_2nd_slice}
        </span>{" "}
        {title_3rd_slice && title_3rd_slice}
      </h1>
      <h3 className="text-[13px] md:text-base text-[#464646] font-medium tracking-wider md:whitespace-pre-line">
        {subTitle}
      </h3>
    </div>
  );
};

export default SectionHeader;
