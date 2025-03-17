import { MdError } from "react-icons/md";

const IsError = ({ isError }) => {
  return (
    <>
      {isError && (
        <div className="text-red-500 flex items-stretch justify-center gap-2 text-base py-[8px] bg-red-100/80 rounded-lg font-semibold text-center whitespace-pre-line">
          <MdError size={20} className="mt-[2px]" />
          {isError}
        </div>
      )}
    </>
  );
};

export default IsError;
