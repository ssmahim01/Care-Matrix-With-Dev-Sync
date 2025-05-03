import { MessageSquareText } from "lucide-react";

const PatientsMessageCounts = ({
  patient,
  setSelectedPartner,
  messageCount,
  userRole,
}) => {
  return (
    <li
      key={patient.email}
      onClick={() => {
        setSelectedPartner(patient);
      }}
      className="p-2 rounded cursor-pointer hover:bg-blue-100 flex justify-between items-center"
    >
      {patient?.email && (
        <div className="flex gap-2 items-center">
          <figure>
            <img
              className="w-14 h-14 rounded-full object-cover border-4 avatar border-blue-400 hover:border-blue-600"
              referrerPolicy="no-referrer"
              src={patient?.photo}
              alt={patient?.name}
            />
          </figure>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{patient.name}</span>

            <div className="mt-1 flex gap-3 items-center">
              <span className="font-medium text-blue-500 text-sm">
                {patient.role === "patient" && "Patient"}
              </span>

              {(userRole === "doctor" || userRole === "pharmacist") && (
                <>
                  {messageCount === 0 ? (
                    <span className="badge bg-blue-400 text-[12px] text-white/90 font-medium border px-3 hover:bg-blue-600 rounded-xl">
                      New
                    </span>
                  ) : (
                    <div className="relative flex items-center">
                      <MessageSquareText className="w-6 h-6 text-blue-500" />
                      <span className="absolute -top-1 -right-1 text-xs font-medium text-white bg-blue-500 rounded-full w-[18px] py-1 px-2 h-[18px] flex items-center justify-center border-2 border-white/90">
                        {messageCount}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default PatientsMessageCounts;
