import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { departmentsData } from "@/lib/department";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

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
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-80 object-cover rounded-xl shadow mb-4"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-1">{data.title}</h1>
        <p className="text-gray-700 text-lg mb-4 w-full lg:w-[95%]">
          {data.description}
        </p>

        {/* Tab Content */}
        <Tabs defaultValue="services" className="w-full">
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
          <TabsContent value="services">
            <Card
              className={
                "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
              }
            >
              <CardContent className="flex gap-y-6 gap-x-10 xl:gap-x-16 flex-col lg:flex-row lg:items-stretch">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Services</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {data.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col lg:border-l-2 pl-8">
                  <h2 className="text-xl font-semibold mb-3">Facilities</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {data.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
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
