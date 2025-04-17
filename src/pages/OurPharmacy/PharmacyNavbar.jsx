import useCart from "@/hooks/useCart";
import { FaShoppingCart, FaTruck } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";

const PharmacyNavbar = ({ search, setSearch }) => {
  const [cart, cartLoading, refetch] = useCart();
  return (
    <div className="flex justify-between gap-4 items-center flex-wrap">
      {/* Searchbar */}
      <div className="relative w-full min-w-xs flex flex-1 product_search_input">
        <input
          className="px-4 py-2 border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
          placeholder="Search Medicines..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />

        {/* shortcut hint */}
        <div className="absolute top-[5px] right-1.5 text-[0.6rem] font-bold border border-gray-100 p-[8px] rounded-md text-gray-500">
          Ctrl + E
        </div>
      </div>
      {/* My Cart */}
      <div>
        {/* Buttons Container */}
        <div className="flex gap-4">
          {/* My Cart Button */}
          <Link
            to={"/dashboard/patient/manage-cart"}
            className="relative flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <FaShoppingCart className="text-lg" />
            <span>My Cart</span>
            {/* Floating Cart Count Badge */}

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart?.length}
            </span>
          </Link>

          {/* Track My Order Button */}
          <Link to={"/dashboard/patient/purchase-history"}>
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              <FaTruck className="text-lg" />
              Track My Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacyNavbar;
