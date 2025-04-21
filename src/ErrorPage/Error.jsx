import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome, FiWifi, FiAlertTriangle } from "react-icons/fi";

const Error = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-blue-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto relative overflow-hidden bg-white/90 border border-blue-200 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-300">
          {/* Decorative Blue Gradients */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -z-10"></div>

          {/* Circuit-like Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            <div
              className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-600 to-transparent animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row-reverse  items-center">
            {/* Left Side - Message */}
            <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium mb-4 bg-blue-100 text-blue-700 border border-blue-200">
                <FiAlertTriangle className="mr-2" />
                <span>Care-Matrix | Error 404</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 tracking-widest">
                Oops!
              </h1>

              <p className="text-xl md:text-2xl font-bold mb-2 text-blue-800 tracking-wides">
                Page not found
              </p>

              <p className="text-base mb-8 max-w-md text-blue-700">
                The page you're looking for may have been removed, renamed, or
                is currently unavailable.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleGoBack}
                  className="group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                >
                  <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  Go Back
                </button>

                <Link
                  to="/"
                  className="group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                >
                  <FiHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Return to Homepage
                </Link>
              </div>
            </div>

            {/* Right Side - 404 Graphic */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-100/30 border border-blue-200 flex items-center justify-center relative overflow-hidden">
                  {/* Animated Circles */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-dashed animate-spin-slow opacity-20 border-blue-500"></div>
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-4 border-dashed animate-spin-slow opacity-10 border-blue-700"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "30s",
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400">
                      404
                    </div>
                    <div className="mt-4 flex justify-center text-blue-500">
                      <FiWifi size={48} className="animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 w-12 h-1 bg-current transform -translate-x-1/2 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                {/* <div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-lg transform rotate-12 animate-float bg-gradient-to-br from-blue-300/30 to-blue-500/30 backdrop-blur-md border border-blue-400/20"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-lg transform -rotate-12 animate-float bg-gradient-to-br from-blue-500/30 to-blue-700/30 backdrop-blur-md border border-blue-600/20"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 -right-8 w-10 h-10 rounded-full transform animate-float bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-md border border-blue-500/20"
                  style={{ animationDelay: "2s" }}
                ></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
      @keyframes spin-slow {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
  
      @keyframes float {
        0% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-10px) rotate(5deg);
        }
        100% {
          transform: translateY(0px) rotate(0deg);
        }
      }
  
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
  
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `}</style>
    </div>
  );
};

export default Error;
