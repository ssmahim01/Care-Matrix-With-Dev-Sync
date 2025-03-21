import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const FileInput = () => {
  const [image, setImage] = useState("");

  const handleImageUpload = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (event) => {
    e.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <input
        type="file"
        name="image"
        id="image_input"
        className="hidden w-full"
        onChange={handleFileChange}
      />
      {image === "" ? (
        <div className="w-full md:w-[90%] flex items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 ">
          <IoMdCloudUpload className="text-[3rem] text-primary" />
          <p className="mt-2 text-text">Drag and drop here</p>
          <p className=" text-text">or</p>

          <button
            className="px-6 py-1.5 text-[#3B9DF8]"
            onClick={handleImageUpload}
          >
            Browse
          </button>
        </div>
      ) : (
        <div className="relative w-full md:w-[80%] h-[200px]">
          <img src={image} alt="image" className="w-full h-full object-cover" />
          <MdDelete
            className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
            onClick={() => setImage("")}
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
