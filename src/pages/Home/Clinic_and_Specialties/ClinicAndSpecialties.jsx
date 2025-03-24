/* eslint-disable no-unused-vars */

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Phone,
  ChevronRight,
  Heart,
  Brain,
  Stethoscope,
  Baby,
  Bone,
  Eye,
  Pill,
  SmileIcon,
} from "lucide-react";
import { doctors, facilities, services, specialties } from "@/lib/data";
import HeroSection from "./HeroSection";
import SpecialtyCard from "./SpecieltiesCard";
import DoctorCard from "./DoctorsCard";
import ServiceCard from "./ServicesCard";
import FacilityCard from "./FacilityCard";
import { Link } from "react-router";

export default function ClinicAndSpecialties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setActiveTab] = useState("specialties");

  return (
    <section className="max-w-screen-2xl">
      {/* Hero Section */}
      <div className="-mt-8" />
      <div className="mb-12">
      <HeroSection />
      </div>

      {/* Main Content */}
      <main className="mx-auto w-11/12 xl:w-10/12 pb-8">
        {/* Search and Quick Actions */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-4 w-4" />
            <Input
              placeholder="Search specialties, doctors, services..."
              className="pl-10 border-sky-200 focus:border-sky-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
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
        </div>

        {/* Tabs Navigation */}
        <Tabs
          className="w-full"
          defaultValue="specialties"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-sky-50 w-full grid grid-cols-2 sm:flex sm:justify-start flex-wrap h-full sm:flex-nowrap mb-8">
            <TabsTrigger
              value="specialties"
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white cursor-pointer py-2"
            >
              Medical Specialties
            </TabsTrigger>
            <TabsTrigger
              value="doctors"
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white cursor-pointer py-2"
            >
              Our Doctors
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white cursor-pointer py-2"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="facilities"
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white cursor-pointer py-2"
            >
              Facilities
            </TabsTrigger>
          </TabsList>

          {/* Specialties Tab */}
          <TabsContent value="specialties" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <div className="mb-8">
                <h2 className="text-3xl font-bold text-sky-800 mb-2">
                  Our Medical Specialties
                </h2>
                <p className="text-sky-600 max-w-3xl">
                  Horizon Medical Center offers comprehensive care across
                  multiple specialties, with state-of-the-art facilities and
                  experienced specialists.
                </p>
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {specialties.map(
                  ({
                    id,
                    Icon,
                    title,
                    description,
                    patientCount,
                    doctorCount,
                  }) => (
                    <SpecialtyCard
                      key={id}
                      icon={<Icon className="h-8 w-8 text-sky-600" />}
                      title={title}
                      description={description}
                      patientCount={patientCount}
                      doctorCount={doctorCount}
                    />
                  )
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <div className="mb-8">
                <h2 className="text-3xl font-bold text-sky-800 mb-2">
                  Our Medical Experts
                </h2>
                <p className="text-sky-600 max-w-3xl">
                  Meet our team of highly qualified and experienced doctors
                  dedicated to providing exceptional care.
                </p>
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <div className="mb-8">
                <h2 className="text-3xl font-bold text-sky-800 mb-2">
                  Our Services
                </h2>
                <p className="text-sky-600 max-w-3xl">
                  We offer a wide range of medical services to meet all your
                  healthcare needs.
                </p>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(({ id, Icon, description, features, title }) => (
                  <ServiceCard
                    key={id}
                    icon={<Icon className="h-8 w-8 text-sky-600" />}
                    description={description}
                    features={features}
                    title={title}
                  />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Facilities Tab */}
          <TabsContent value="facilities" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <div className="mb-8">
                <h2 className="text-3xl font-bold text-sky-800 mb-2">
                  Our Facilities
                </h2>
                <p className="text-sky-600 max-w-3xl">
                  Explore our state-of-the-art facilities designed to provide
                  the highest standard of care.
                </p>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
}
