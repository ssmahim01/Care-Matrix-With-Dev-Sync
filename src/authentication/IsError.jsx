import { MdError } from "react-icons/md";

const IsError = ({ isError }) => {
  return (
    <>
      {isError && (
        <div className="text-red-500 flex items-center justify-center gap-2 text-base py-[8px] bg-red-100/80 rounded-lg font-semibold text-center">
          <MdError size={20} />
          {isError}
        </div>
      )}
    </>
  );
};

export default IsError;
