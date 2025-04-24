import { Button } from "@/components/ui/button";

const BedCard = ({
  title,
  price,
  image,
  status,
  onRequestBooking,
  onShowDetails,
  bed,
  isLoading,
}) => {
  return (
    <div>
      <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div>
            <p className="text-gray-500 text-end">Room Tariff</p>
            <p className="text-xl font-bold">{price}/day</p>
          </div>
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-md my-2"
        />
        <div className="flex justify-between w-full space-x-2 my-1">
          {status === "requested" ? (
            <Button
              disabled={true} // Disable button if status is requested
              onClick={() => onRequestBooking(bed)}
              className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-300"
            >
              Requested for Booking
            </Button>
          ) : (
            <Button
              onClick={() => onRequestBooking(bed)}
              className="bg-blue-600 text-white  rounded-md hover:bg-blue-700"
            >
              Request for Booking
            </Button>
          )}
          <Button variant={"outline"}
            onClick={() => onShowDetails(bed)}
            className="border border-blue-600 hover:bg-blue-100"
          >
            More Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BedCard;
