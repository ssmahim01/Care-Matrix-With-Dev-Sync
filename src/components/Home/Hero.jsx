import React, { lazy, Suspense } from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
const HeroSearch = lazy(() => import("@/pages/Home/Hero/HeroSearch"));

export default function Hero() {
  return (
    <div className="relative w-full mx-auto overflow-visible bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q20,45 40,50 T80,50 T100,50 V100 H0 V50"
            fill="white"
          />
          <path d="M0,60 Q25,65 50,60 T100,60 V100 H0 V60" fill="white" />
          <path d="M0,70 Q30,75 60,70 T100,70 V100 H0 V70" fill="white" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,30 L30,30 L45,10 L60,50 L75,10 L90,50 L105,10 L120,50 L135,30 L300,30 L315,10 L330,50 L345,10 L360,50 L375,10 L390,50 L405,30 L600,30 L615,10 L630,50 L645,10 L660,50 L675,10 L690,50 L705,30 L900,30 L915,10 L930,50 L945,10 L960,50 L975,10 L990,50 L1005,30 L1200,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-2"
            >
              Trusted by 500+ Healthcare Facilities
            </motion.div>

            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight">
              Streamline Healthcare{" "}
              <span className="block mt-2">Management With Care Matrix</span>
            </h1>

            <p className="text-base md:text-lg font-medium text-white max-w-[600px]">
              Empower your hospital with an all-in-one management system. From
              patient appointments to medical records and staff coordination,
              Care Matrix ensures efficiency, accuracy, and seamless healthcare
              operations. Experience the future of hospital management today!
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {[
                { value: "98%", label: "Patient Satisfaction" },
                { value: "24/7", label: "Support Available" },
                { value: "100+", label: "Features" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative mt-8 max-w-xl"
            >
              <HeroSearch />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative z-10"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl hidden md:block"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl hidden md:block"></div>

              <motion.div className="relative rounded-xl overflow-hidden shadow shadow-blue-600/80 lg:mt-12">
                <img
                  src="https://i.ibb.co.com/LDPwN7dJ/expert-doctors.png"
                  alt="Expert Medical Team"
                  className="relative w-full h-auto object-cover"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-xl p-4 max-w-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="py-4">
                      <h3 className="font-medium text-gray-900">
                        Expert Medical Team
                      </h3>
                      <p className="text-sm text-gray-500">
                        Board-certified specialists available 24/7
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute -left-4 top-1 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Easy Scheduling
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
