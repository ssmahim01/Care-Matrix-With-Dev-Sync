// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Count } from "./Counter";
import { Loader2 } from "lucide-react";

export default function HeroSection() {

  const {data = [], isLoading} = useQuery({
    queryKey: ["doctors"],
    queryFn: async ()=> {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors/all`)
      return res.data
    }
  })

  const {data: patients = {}, isLoading: patientLoading} = useQuery({
    queryKey: ["patient"],
    queryFn: async ()=> {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
      return data
    }
  })


  if(isLoading) return <div className="flex items-center justify-center"><Loader2 className="animate-spin"/></div>
  if(patientLoading) return <div className="flex items-center justify-center"><Loader2 className="animate-spin"/></div>


  return (
    <section className="bg-gradient-to-r from-sky-300/10 via-sky-200/50 to-sky-100/75 rounded-xl p-10 md:p-14 lg:p-16">
      <div className="md:w-11/12 xl:w-10/12 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-900 leading-tight">
                Expert Care for{" "}
                <span className="text-sky-600">Your Health</span>
              </h1>
              <p className="mt-4 text-lg text-sky-700 max-w-lg">
                Discover our comprehensive range of medical specialties and
                services designed to provide you with the highest standard of
                healthcare.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to={"/doctors"}>
                <Button className="bg-sky-600 hover:bg-sky-700 cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
              </Link>
              <Link to={"/contact-us"}>
                <Button
                  variant="outline"
                  className="border-sky-200 text-sky-700 hover:bg-sky-50 cursor-pointer"
                >
                  <Phone className="mr-2 h-4 w-4" /> Contact Us
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-700">25+</div>
                <div className="text-sm text-sky-600">Specialties</div>
              </div>
              <div className="h-10 border-r border-sky-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-700"><Count number={data?.length}/>+</div>
                <div className="text-sm text-sky-600">Doctors</div>
              </div>
              <div className="h-10 border-r border-sky-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-700"><Count number={patients.totalItems}/>+</div>
                <div className="text-sm text-sky-600">Patients</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://storage.googleapis.com/treatspace-prod-media/pracimg/u-1998/shutterstock_2532301281.jpeg"
                alt="Medical professionals"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 text-sky-800">
                <div className="bg-sky-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <div className="font-bold">Book Today</div>
                  <div className="text-sm text-sky-600">
                    Next available: Tomorrow
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
