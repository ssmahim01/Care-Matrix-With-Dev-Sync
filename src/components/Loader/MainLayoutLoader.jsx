const MainLayoutLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 space-y-6">
      {/* Spinner Circle + Logo */}
      <div className="relative w-15 h-15">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-[#009EE4] animate-spin" />
        <img
          src={"https://i.ibb.co.com/r1ZQS6t/Screenshot-2025-04-21-141051.png"}
          alt="Care Matrix Logo"
          className="absolute inset-0 ml-[8.3px] w-10 h-10 m-auto rounded-full"
        />
      </div>

      {/* Heading */}
      <h1 className="text-xl font-bold text-gray-700 max-w-xl">
        Streamline Healthcare
      </h1>

      {/* Subheading */}
      <p className="text-[16px] text-gray-500 max-w-xl -mt-3.5">
        Join 100+ healthcare facilities with Care Matrix!
      </p>

      {/* Optional Loading Animation */}
      <p className="text-xs text-gray-400 flex items-center gap-1 -mt-4.5">
        Loading Healthcare
        <span className="animate-bounce text-[#009EE4] text-3xl -mt-1.5">.</span>
        <span className="animate-bounce [animation-delay:200ms] text-[#009EE4] text-3xl -mt-1.5">
          .
        </span>
        <span className="animate-bounce [animation-delay:400ms] text-[#009EE4] text-3xl -mt-1.5">
          .
        </span>
      </p>
    </div>
  );
};

export default MainLayoutLoader;
