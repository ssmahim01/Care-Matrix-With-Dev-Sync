import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { departmentsData } from "@/lib/department";
import {
  CalendarClock,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldPlus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const Departments = () => {
  const { department } = useParams();
  const data = departmentsData.find((d) => d.title === department);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  // Check if content overflows to show "Read More" button
  useEffect(() => {
    const element = contentRef.current;
    if (element.scrollHeight > element.clientHeight) {
      setShowReadMore(true);
    }
  }, []);

  if (!data) {
    return (
      <div className="pt-16 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
        <p className="text-red-500 font-semibold text-center">
          Department Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Departments</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{department}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Department Content */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-8 items-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-full md:w-6/12 h-80 object-cover rounded-xl shadow mb-4"
          />

          <div className="w-full md:w-6/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
              {data.title}
            </h1>
            <div className="mt-5 relative">
              <p
                ref={contentRef}
                className={`text-gray-700 text-lg mb-4 w-full lg:w-[95%] transition-all duration-300 ${
                  isExpanded
                    ? "max-h-none"
                    : "max-h-[140px] md:max-h-[220px] overflow-hidden relative"
                }`}
              >
                {data.description}
                {!isExpanded && showReadMore && (
                  <span className="absolute bottom-0 left-0 right-0 h-12" />
                )}
              </p>
              {showReadMore && (
                <button
                  className="text-sky-500 hover:underline text-sm font-medium"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <Tabs defaultValue="services" className="mt-8 w-full">
          <TabsList className="border w-full">
            <TabsTrigger
              className={"cursor-pointer py-2 px-4 w-full "}
              value="services"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              className={"cursor-pointer py-2 px-4 w-full "}
              value="doctors"
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              className={"cursor-pointer py-2 px-4 w-full "}
              value="contact-hours"
            >
              Contact & Opening Hours
            </TabsTrigger>
          </TabsList>
          {/* 1st */}
          <TabsContent
            value="services"
            className="animate-in fade-in-50 duration-300"
          >
            <Card className="border shadow-sm border-[#e5e7eb] w-full py-4 mt-4 rounded-lg">
              <CardContent className="px-6 md:px-8 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <ShieldPlus className="h-6 w-6 text-sky-700" />
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Services
                      </h2>
                    </div>
                    <Separator />
                    <ul className="space-y-4">
                      {data.services.map((service, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-sky-50 p-1 rounded-full mt-0.5">
                            <ChevronRight className="h-4 w-4 text-sky-600" />
                          </div>
                          <span className="text-slate-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <ShieldPlus className="h-6 w-6 text-sky-700" />
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Facilities
                      </h2>
                    </div>
                    <Separator />
                    <ul className="space-y-4">
                      {data.facilities.map((facility, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-sky-50 p-1 rounded-full mt-0.5">
                            <ChevronRight className="h-4 w-4 text-sky-600" />
                          </div>
                          <span className="text-slate-700">{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* 2nd */}
          <TabsContent value="doctors">
            <Card
              className={
                "border shadow-sm border-[#e5e7eb] w-full py-6 mt-4 rounded-lg"
              }
            >
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.doctors.map((doc, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition"
                  >
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-24 h-24 object-cover rounded-full mb-3"
                    />
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <p className="text-sm text-gray-600">
                      {doc.specialization}
                    </p>
                    <Link to={"/doctors"}>
                      <Button
                        size={"sm"}
                        className={
                          "mt-3 cursor-pointer bg-sky-600 hover:bg-sky-700"
                        }
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          {/* 3rd */}
          <TabsContent
            value="contact-hours"
            className="animate-in fade-in-50 duration-300"
          >
            <Card className="border shadow-sm border-[#e5e7eb] w-full mt-4 rounded-lg">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <Phone className="h-6 w-6 text-sky-700" />
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Contact Information
                      </h2>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-sky-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Phone</p>
                          <p className="text-slate-700 font-medium">
                            {data.contact.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-sky-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Email</p>
                          <p className="text-slate-700 font-medium">
                            {data.contact.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Location</p>
                          <p className="text-slate-700 font-medium">
                            {data.contact.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <Clock className="h-6 w-6 text-sky-700" />
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Operating Hours
                      </h2>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CalendarClock className="h-5 w-5 text-sky-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Weekdays</p>
                          <p className="text-slate-700 font-medium">
                            {data.hours.weekdays}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CalendarClock className="h-5 w-5 text-sky-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500">Weekend</p>
                          <p className="text-slate-700 font-medium">
                            {data.hours.weekend}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-100">
                      <p className="text-slate-700 text-sm">
                        <span className="font-medium">Note:</span> Emergency
                        services are available 24/7. For non-emergency
                        appointments, please call during operating hours.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Departments;
