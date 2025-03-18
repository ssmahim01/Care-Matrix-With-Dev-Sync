
import React from "react";

const ContactForm = () => {
    return (
        <section className="w-full">

            {/* form area */}
            <form className="w-full">
                <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="text"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Patient name
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="number"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Phone number
                            </span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="email"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Email address
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-[20px] mt-6">

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="number"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Patient age
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="date"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Select date
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            {/* <input type="date"
                                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            /> */}
                             <select className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300" defaultValue="Pick a browser">
                                <option >Pick a time</option>
                                <option>10:00am - 10:29am</option>
                                <option>10:30am - 10:59am</option>
                                <option>11:00am - 11:29am</option>
                                <option>11:30am - 11:59am</option>
                                <option>12:00am - 11:30am</option>
                                <option>11:30am - 11:59am</option>
                                <option>12:00am - 12:30am</option>
                                <option>03:30am - 03:59am</option>
                                <option>04:00am - 04:29am</option>
                                <option>04:30am - 04:59am</option>
                                <option>05:00am - 05:29am</option>
                                <option>05:30am - 05:59am</option>
                           

                            </select>
                            <span
                                className="  absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                Select time
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <label className="relative w-full">
                        <textarea
                            className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                        ></textarea>
                        <span
                            className=" absolute -top-3 peer-focus:bg-white left-5 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                            Reason for visit.
                        </span>
                    </label>
                </div>


                <button type="submit" className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px]">Submit</button>

            </form>
        </section>
    );
};

export default ContactForm;
