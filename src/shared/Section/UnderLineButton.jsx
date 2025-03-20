const UnderLineButton = ({ text }) => {
  return (
    <button className="btn border-none hover:bg-[#0e6efd] text-[1rem] duration-500 bg-[#0E82FD] text-white mt-4 relative group">
      <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
        {text}
      </span>
    </button>
  );
};

export default UnderLineButton;
