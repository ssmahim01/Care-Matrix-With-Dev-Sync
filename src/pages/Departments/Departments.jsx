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
import { ChevronRight, ShieldPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router";

const Departments = () => {
  const { department } = useParams();
  const data = departmentsData.find((d) => d.title === department);

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
            <p className="text-gray-700 text-lg mb-4 w-full lg:w-[95%] max-h-[300px] overflow-auto">
              {data.description}
            </p>
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
                "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
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
                    <p className="text-sm text-gray-500">{doc.experience}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          {/* 3rd */}
          <TabsContent value="contact-hours" className={"flex gap-4"}>
            <Card
              className={
                "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
              }
            >
              <CardContent className="flex gap-y-6 gap-x-10 xl:gap-x-16 flex-col lg:flex-row lg:items-stretch">
                <div className="px-4">
                  <h2 className="text-xl font-semibold mb-3">
                    Contact Information
                  </h2>
                  <p className="text-gray-700 mb-1">
                    <strong>Phone:</strong> {data.contact.phone}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Email:</strong> {data.contact.email}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {data.contact.location}
                  </p>
                </div>
                <div className="flex flex-col lg:border-l-2 pl-8">
                  <h2 className="text-xl font-semibold mb-3">
                    Operating Hours
                  </h2>
                  <p className="text-gray-700 mb-1">
                    <strong>Weekdays:</strong> {data.hours.weekdays}
                  </p>
                  <p className="text-gray-700">
                    <strong>Weekend:</strong> {data.hours.weekend}
                  </p>
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
