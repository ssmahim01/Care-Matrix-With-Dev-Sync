const BedDetails = ({ title, details, image, onRequestBooking }) => {
    return (
      <div className="flex flex-col md:flex-row border rounded-lg shadow-lg p-4 mt-4 bg-blue-50">
        <div className="md:w-1/2 p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <button
            onClick={() => onRequestBooking(title)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
          >
            Request for Booking
          </button>
        </div>
        <div className="md:w-1/2 p-4 relative">
          <img src={image} alt={title} className="w-full h-64 object-cover rounded-md" />
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            &lt;
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            &gt;
          </button>
        </div>
      </div>
    );
  };
  
  export default BedDetails;