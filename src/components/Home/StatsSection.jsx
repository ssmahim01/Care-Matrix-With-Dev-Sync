import { Award, Heart } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-300/80 rounded p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center">
      {/* Medical Experts */}
      <div className="flex gap-2 items-center w-fit">
        <div>
          <img
            src="https://i.ibb.co.com/5h0wZxY2/doctor-removebg-preview.png"
            alt="doctor_icon"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">348</h1>
          <h3 className="text-lg font-semibold text-white tracking-wide">
            Medical Experts
          </h3>
        </div>
      </div>
      {/* Hospital Rooms*/}
      <div className="flex gap-2 items-center w-fit">
        <div>
          <img
            src="https://i.ibb.co.com/GfJy06t4/bed-Photoroom.png"
            alt="bed_icon"
            className="w-30 h-30 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">123</h1>
          <h3 className="text-lg font-semibold text-white tracking-wide">
            Hospital Rooms
          </h3>
        </div>
      </div>
      {/* Happy Patient */}
      <div className="flex gap-4 items-center w-fit">
        <div>
          <Heart color="#fff" size={70} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">5230</h1>
          <h3 className="text-lg font-semibold text-white tracking-wide">
            Happy Patient
          </h3>
        </div>
      </div>
      {/* Awards Won */}
      <div className="flex gap-4 items-center w-fit">
        <div>
          <Award color="#fff" size={70} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">234</h1>
          <h3 className="text-lg font-semibold text-white tracking-wide">
            Award Won
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
