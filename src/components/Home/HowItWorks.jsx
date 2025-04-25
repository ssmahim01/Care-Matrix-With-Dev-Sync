import { useState, useEffect } from "react";
import {
  Search,
  UserCheck,
  CalendarCheck,
  HeartPulse,
  ClipboardList,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Enhanced data structure with more detailed information
  const services = [
    {
      icon: <Search size={60} />,
      title: "Search Doctor",
      description:
        "Search for a doctor based on specialization, location, or availability.",
      detailedDescription:
        "Our intelligent search system helps you find the perfect doctor for your needs. Filter by specialty, location, ratings, and available time slots to find healthcare professionals who match your requirements.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <UserCheck size={60} />,
      title: "Check Doctor Profile",
      description:
        "Explore detailed doctor profiles on our platform to make informed healthcare decisions.",
      detailedDescription:
        "View comprehensive doctor profiles including qualifications, experience, patient reviews, success rates, and areas of expertise. Make informed decisions about your healthcare provider based on transparent information.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <CalendarCheck size={60} />,
      title: "Schedule Appointment",
      description:
        "Choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
      detailedDescription:
        "Our intuitive scheduling system allows you to book appointments in just a few clicks. Select your preferred date and time, and receive instant confirmation. Manage your appointments easily through your personal dashboard.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <HeartPulse size={60} />,
      title: "Get Your Solution",
      description:
        "Discuss your health concerns with the doctor and receive personalized advice & solutions.",
      detailedDescription:
        "Connect with your doctor through secure video consultations or in-person visits. Discuss your health concerns in detail and receive personalized treatment plans tailored to your specific needs and medical history.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <ClipboardList size={60} />,
      title: "Manage Medical Records",
      description:
        "Access and manage your medical records securely, ensuring all your health data is in one place.",
      detailedDescription:
        "Keep all your medical information in one secure place. Upload and access your medical records, prescriptions, test results, and treatment history anytime. Share records with healthcare providers when needed with just a few taps.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <Bell size={60} />,
      title: "Appointment Reminders",
      description:
        "Receive timely reminders about your upcoming appointments to stay on track with your healthcare.",
      detailedDescription:
        "Never miss an appointment with our smart reminder system. Receive notifications via email, SMS, or push notifications based on your preferences. Get prepared with pre-appointment instructions and post-appointment follow-ups.",
      color: "#0E82FD",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % services.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleStepClick = (index) => {
    setIsAutoPlaying(false);
    setActiveStep(index);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            HOW{" "}
            <span className="text-[#0E82FD] tracking-wider underline underline-offset-4 decoration-2">
              IT
            </span>{" "}
            WORKS
          </h2>
          <p className="text-xl text-gray-600 font-medium tracking-wider max-w-2xl mx-auto">
            Your healthcare journey simplified in 6 easy steps
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  index === activeStep
                    ? "w-10 h-3 bg-[#0E82FD] rounded-full"
                    : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#0E82FD]">
                  {services[activeStep].icon}
                </div>
                <div>
                  <span className="text-[#0E82FD] font-bold">
                    Step {activeStep + 1}/6
                  </span>
                  <h3 className="text-2xl font-bold">
                    {services[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6">
                {services[activeStep].detailedDescription}
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Key Benefits:</h4>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#0E82FD] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {activeStep === 0 &&
                          item === 1 &&
                          "Find specialists based on your specific health needs"}
                        {activeStep === 0 &&
                          item === 2 &&
                          "Filter by location, availability, and insurance acceptance"}
                        {activeStep === 0 &&
                          item === 3 &&
                          "View doctor ratings and patient feedback at a glance"}

                        {activeStep === 1 &&
                          item === 1 &&
                          "Verify credentials and professional experience"}
                        {activeStep === 1 &&
                          item === 2 &&
                          "Read authentic patient reviews and testimonials"}
                        {activeStep === 1 &&
                          item === 3 &&
                          "Understand the doctor's approach to patient care"}

                        {activeStep === 2 &&
                          item === 1 &&
                          "Book appointments 24/7 at your convenience"}
                        {activeStep === 2 &&
                          item === 2 &&
                          "Receive instant confirmation and calendar integration"}
                        {activeStep === 2 &&
                          item === 3 &&
                          "Reschedule or cancel with ease when needed"}

                        {activeStep === 3 &&
                          item === 1 &&
                          "Get personalized treatment plans tailored to your needs"}
                        {activeStep === 3 &&
                          item === 2 &&
                          "Follow-up consultations to track your progress"}
                        {activeStep === 3 &&
                          item === 3 &&
                          "Access to digital prescriptions and treatment instructions"}

                        {activeStep === 4 &&
                          item === 1 &&
                          "Centralized storage for all your medical documents"}
                        {activeStep === 4 &&
                          item === 2 &&
                          "Secure sharing with healthcare providers"}
                        {activeStep === 4 &&
                          item === 3 &&
                          "Track health metrics and progress over time"}

                        {activeStep === 5 &&
                          item === 1 &&
                          "Customizable notification preferences"}
                        {activeStep === 5 &&
                          item === 2 &&
                          "Pre-appointment preparation instructions"}
                        {activeStep === 5 &&
                          item === 3 &&
                          "Follow-up care reminders and medication alerts"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Side - Visual Representation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-lg aspect-video"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0E82FD]/80 to-blue-400/50 z-10 flex items-center justify-center">
                <div className="text-white p-8 text-center">
                  <div className="flex justify-center mb-6 text-white">
                    {services[activeStep].icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    {services[activeStep].title}
                  </h3>
                  <p className="text-lg opacity-90">
                    {services[activeStep].description}
                  </p>
                </div>
              </div>
              <img
                src={services[activeStep].image || "/placeholder.svg"}
                alt={services[activeStep].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center mt-10 gap-4">
          <Button
            onClick={handlePrev}
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0 border-[#0E82FD] text-[#0E82FD] hover:bg-[#0E82FD] hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous step</span>
          </Button>

          <Button
            onClick={handleNext}
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0 border-[#0E82FD] text-[#0E82FD] hover:bg-[#0E82FD] hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next step</span>
          </Button>
        </div>

        {/* Step Overview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={cn(
                "p-4 rounded-xl transition-all duration-300 text-center flex flex-col items-center gap-2",
                activeStep === index
                  ? "bg-[#0E82FD] text-white shadow-lg scale-105"
                  : "bg-white hover:bg-blue-50 border border-gray-100"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  activeStep === index
                    ? "bg-white text-[#0E82FD]"
                    : "bg-blue-100 text-[#0E82FD]"
                )}
              >
                <span className="font-bold">{index + 1}</span>
              </div>
              <span className="text-sm font-medium">{service.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
