import { MessageSquareText } from "lucide-react";

const ProfessionalsMessageCounts = ({ professional, setSelectedPartner, messageCount, userRole }) => {
  return (
    <li
      key={professional.email}
      onClick={() => {
        setSelectedPartner(professional);
      }}
      className="p-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <figure>
          <img
            className="w-14 h-14 rounded-full object-cover border-4 avatar border-blue-500 hover:border-blue-600"
            referrerPolicy="no-referrer"
            src={professional?.photo}
            alt={professional?.name}
          />
        </figure>
        <p className="flex flex-col">
          <span className="font-medium text-sm">{professional.name}</span>

          <div className="flex gap-2 items-center">
            <span className="font-medium text-blue-500 text-sm">
              {professional.role === "pharmacist" ? "Pharmacist" : "Doctor"}
            </span>

            {userRole === "patient" && (
              <>
                {messageCount === 0 ? (
                  <span className="badge bg-blue-400 text-[10px] text-white/90 font-medium border hover:bg-blue-600 px-3 rounded-xl">
                    New
                  </span>
                ) : (
                  <div className="relative flex items-center">
                    <MessageSquareText className="w-5 h-5 text-blue-500" />
                    <span className="absolute -top-1 -right-1 text-xs font-medium text-white bg-blue-500 rounded-full w-[15px] p-1 h-[15px] flex items-center justify-center border-2 border-white/90">
                      {messageCount}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </p>
      </div>
    </li>
  );
};

export default ProfessionalsMessageCounts;
