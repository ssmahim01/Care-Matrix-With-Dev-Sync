import React, { useRef, useState } from "react";

const ImageWithMagnifier = ({ imageURL }) => {
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const [showLens, setShowLens] = useState(false);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const lens = lensRef.current;

    const { left, top, width, height } = img.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const lensSize = 100;
    const zoom = 2;

    if (x > 0 && x < width && y > 0 && y < height) {
      setShowLens(true);

      lens.style.left = `${x - lensSize / 2}px`;
      lens.style.top = `${y - lensSize / 2}px`;

      const bgPosX = (x * zoom - lensSize / 2) * -1;
      const bgPosY = (y * zoom - lensSize / 2) * -1;

      lens.style.backgroundImage = `url(${imageURL})`;
      lens.style.backgroundSize = `${width * zoom}px ${height * zoom}px`;
      lens.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    } else {
      setShowLens(false);
    }
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={imageURL}
        className="w-full max-h-[550px] min-h-[550px] object-cover border border-border"
        alt="Product"
      />
      <div
        ref={lensRef}
        className={`absolute rounded-lg border border-gray-300 pointer-events-none transition-opacity duration-200 cursor-pointer ${
          showLens ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "150px",
          height: "150px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        //   cursor: 
        }}
      />
    </div>
  );
};

export default ImageWithMagnifier;
