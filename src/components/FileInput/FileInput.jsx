import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const FileInput = ({image, setImage, handleFileChange, handleImageUpload}) => {

  return (
    <div className="flex flex-col gap-5 items-center">
      <input
        type="file"
        name="image"
        id="image_input"
        className="hidden w-full"
        onChange={handleFileChange}
      />
      <div className="w-full">
      <label htmlFor="image" className="text-[15px] pb-2 text-text font-[400]">
        Image <span className="text-red-500">*</span>
      </label>
      
      {image === "" ? (
        <div className="flex items-center justify-center flex-col w-full bg-base-100 border border-dashed border-[#3B9DF8] rounded-md py-5">
          <IoMdCloudUpload className="text-[3rem] text-primary" />
          <p className="mt-2 text-text">Drag and drop here</p>
          <p className=" text-text">or</p>

          <button
            className="mt-2 btn btn-ghost px-6 py-1.5 text-[#3b9df8]"
            onClick={handleImageUpload}
          >
            Browse
          </button>
        </div>
      ) : (
        <div className="relative w-full h-[200px]">
          <img src={image} alt="image" className="w-full h-full object-cover" />
          <MdDelete
            className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
            onClick={() => setImage("")}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default FileInput;
