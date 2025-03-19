import { Link } from "react-router";

const Error = () => {
  return (
    <div
      className="boxShadow lg:px-10 px-5 w-full min-h-screen pb-16 flex flex-col justify-center"
      style={{
        background: "url('https://i.ibb.co/02DvRcV/404.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full lg:w-[50%] space-y-3">
        <h1 className="text-4xl lg:text-6xl md:text-5xl font-[600] text-teal-600 mb-5">
          Oops! <br className="lg:hidden block" /> Page Not Found
        </h1>
        <h4 className="lg:w-full md:w-1/2 text-base font-semibold text-gray-100 mb-2">
          The page you're looking for might have been moved, deleted, or doesn't
          exist.
        </h4>
        <p className="lg:w-full md:w-1/2 text-sm text-gray-200">
          Please check the URL for any mistakes or return to the homepage.
        </p>
      </div>

      <Link to="/">
        <button className="btn btn-outline px-8 w-max rounded-md border border-[#5393ec] hover:bg-teal-600 text-base text-white mt-6">
          BACK TO HOME
        </button>
      </Link>
    </div>
  );
};

export default Error;
