const UsersMessage = ({
  msg,
  index,
  showDateDivider,
  currentDate,
  isCurrentUser,
  sender,
}) => {
  return (
    <div key={index}>
      {showDateDivider && (
        <div className="flex items-center justify-center my-4">
          <span className="text-xs text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
            {currentDate}
          </span>
        </div>
      )}
      <div
        className={`flex ${
          isCurrentUser ? "justify-end" : "justify-start"
        } mb-4`}
      >
        {!isCurrentUser && (
          <figure className="flex-shrink-0 mr-3">
            <img
              className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500 hover:border-indigo-600"
              referrerPolicy="no-referrer"
              src={sender?.photo}
              alt={sender?.name}
            />
          </figure>
        )}
        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          } max-w-[70%]`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-700">
              {sender?.name}
            </span>
          </div>
          {msg.image && (
            <div className="mb-2">
              <img
                src={msg.image}
                alt="Chat image"
                referrerPolicy="no-referrer"
                className="w-[200px] h-[240px] max-w-[200px] max-h-[200px] rounded-lg object-cover shadow-sm"
              />
            </div>
          )}
          {msg.message && (
            <span
              className={`inline-block p-2 rounded-xl shadow-sm font-medium text-gray-800 ${
                isCurrentUser
                  ? "bg-blue-200 rounded-br-none"
                  : "bg-gray-200 rounded-bl-none"
              }`}
            >
              {msg.message}
            </span>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {isCurrentUser && (
          <figure className="flex-shrink-0 ml-3">
            <img
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 hover:border-blue-600"
              referrerPolicy="no-referrer"
              src={sender?.photo}
              alt={sender?.name}
            />
          </figure>
        )}
      </div>
    </div>
  );
};

export default UsersMessage;
