import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { BookUser, CalendarCheck, CalendarClock, CircleUser, FileUser, Mail, Stethoscope, Trash } from "lucide-react";

const InfoModal = ({ openDialog, setOpenDialog, consultant }) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent forceMount className="bg-base-200">
        <div className="flex flex-col border-b-2 border-gray-300 pb-3">
          {/* Heading Of The Modal */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center gap-2">
            <Stethoscope className="text-2xl sm:text-3xl text-gray-800" />
            <span>Doctor Info</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base ml-8 font-medium whitespace-pre-line">
            This is the info of {consultant?.name}
          </p>
        </div>

        <div className="border-b-2 border-gray-300 pb-4">
          <figure className="w-40 h-40 sm:w-56 sm:h-56 mx-auto">
            <img
              className="w-full h-full border-[4px] sm:border-[6px] border-[#0E82FD] overflow-hidden rounded-full object-cover"
              src={consultant?.image}
              alt={consultant?.name}
            />
          </figure>
        </div>

        <div className="w-full space-y-3">
          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <CircleUser className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Doctor Name: </span>
            <span className="text-gray-700 font-semibold">{consultant?.name}</span>
          </h4>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <Mail className="w-4 h-4" />
            <span>Doctor Email: </span>
            <span className="text-gray-700 font-semibold">{consultant?.email}</span>
          </h4>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <FileUser className="w-4 h-4" />
            <span>Department: </span>
            <span className="text-gray-700 font-semibold">{consultant?.title}</span>
          </h4>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <CalendarClock className="w-4 h-4" />
            <span>Experience: </span>
            <span className="text-gray-700 font-semibold">{consultant?.experience}</span>
          </h4>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <CalendarClock className="w-4 h-4" />
            <span>Services:</span>
          </h4>
          <ul className="-mt-2">
            {consultant?.services?.map((service, index) => (
              <li className="list-disc ml-5 text-sm sm:text-base" key={index}>
                <p className="text-gray-700 font-semibold">{service}</p>
              </li>
            ))}
          </ul>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <CalendarCheck className="w-4 h-4" />
            <span>Available Days:</span>
          </h4>
          <ul className="-mt-2">
            {consultant?.available_days?.map((day, index) => (
              <li className="list-disc ml-5 text-sm sm:text-base" key={index}>
                <p className="text-gray-700 font-semibold">{day}</p>
              </li>
            ))}
          </ul>

          <h4 className="flex gap-1 items-center text-base sm:text-lg text-gray-900 font-bold">
            <BookUser className="w-4 h-4" />
            <span>Bio: </span>
          </h4>
            <p className="sm:text-base text-sm -mt-2 text-gray-700 font-semibold">{consultant?.bio}</p>
        </div>

        <Button
          onClick={() => setOpenDialog(false)}
          variant={"default"}
          className="hover:text-white/80 cursor-pointer mt-4 flex gap-2 items-center"
        >
          <Trash className="w-4 h-4" />
          <span>Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;