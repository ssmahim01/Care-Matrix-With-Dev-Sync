// import {
//   Facebook,
//   Twitter,
//   Github,
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
// } from "lucide-react";
// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <footer className="relative pt-16 pb-10 overflow-hidden bg-gradient-to-b from-white to-blue-50">
//       {/* SVG Background Pattern */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <pattern
//               id="medical-pattern"
//               x="0"
//               y="0"
//               width="40"
//               height="40"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M0 20h40M20 0v40"
//                 stroke="#0E82FD"
//                 strokeOpacity="0.05"
//                 strokeWidth="1"
//               />
//               <circle cx="20" cy="20" r="2" fill="#0E82FD" fillOpacity="0.05" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#medical-pattern)" />
//         </svg>

//         {/* Wave SVG */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 320"
//             preserveAspectRatio="none"
//             className="w-full h-auto"
//           >
//             <defs>
//               <linearGradient
//                 id="wave-gradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop offset="0%" stopColor="#0E82FD" stopOpacity="0.05" />
//                 <stop offset="50%" stopColor="#0E82FD" stopOpacity="0.1" />
//                 <stop offset="100%" stopColor="#0E82FD" stopOpacity="0.05" />
//               </linearGradient>
//             </defs>
//             <path
//               fill="url(#wave-gradient)"
//               d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,181.3C960,149,1056,107,1152,122.7C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//             />
//           </svg>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Top Section with Logo and Contact */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
//           {/* Logo and Description */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="w-5 h-5"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800">Care Matrix</h2>
//             </div>

//             <p className="text-gray-600 mb-6">
//               Empower your hospital with an all-in-one management system. From
//               patient appointments to medical records and staff coordination,
//               Care-Matrix ensures efficiency, accuracy, and seamless healthcare
//               operations.
//             </p>
//           </div>

//           {/* Links Sections */}
//           <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {/* Quick Links */}
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link
//                     to="/about"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/contact"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/doctors"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Expert Doctors
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/departments"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Our Departments
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/pharmacy"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Our Pharmacy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             {/* Departments */}
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
//                 Departments
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link
//                     to="/departments/dental"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Dental Department
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/departments/baby-care"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Baby Care Department
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/departments/neurology"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Neurology Department
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/departments/emergency"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Emergency Department
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/departments/surgery"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Surgery Department
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             {/* Features & Legal */}
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
//                 Features & Legal
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link
//                     to="/beds"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Available Beds
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/appointment"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Book Appointment
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/privacy"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/terms"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Terms & Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/billing"
//                     className="text-gray-600 hover:text-primary transition-colors flex items-center"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                     Billing & Payments
//                   </Link>
//                 </li>
//               </ul>
//             </div>{" "}
//             {/* Contact Information */}
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <Phone className="w-5 h-5 text-primary mt-0.5 mr-3" />
//                 <div>
//                   <p className="font-medium text-gray-800">Emergency Hotline</p>
//                   <p className="text-gray-600">+1 (800) 123-4567</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <Mail className="w-5 h-5 text-primary mt-0.5 mr-3" />
//                 <div>
//                   <p className="font-medium text-gray-800">Email Us</p>
//                   <p className="text-gray-600">contact@carematrix.com</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3" />
//                 <div>
//                   <p className="font-medium text-gray-800">Location</p>
//                   <p className="text-gray-600">
//                     123 Healthcare Avenue, Medical District
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <Clock className="w-5 h-5 text-primary mt-0.5 mr-3" />
//                 <div>
//                   <p className="font-medium text-gray-800">Working Hours</p>
//                   <p className="text-gray-600">24/7 Emergency Care</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* Copyright */}
//           <p className="text-gray-600 mb-4 md:mb-0">
//             © {new Date().getFullYear()} DEVSYNC-Care-Matrix. All rights
//             reserved.
//           </p>

//           {/* Social Icons */}
//           <div className="flex space-x-4">
//             <a
//               to="https://www.facebook.com/ssmahim"
//               target="_blank"
//               rel="noreferrer"
//               className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
//             >
//               <Facebook className="w-5 h-5" />
//             </a>
//             <a
//               to="#"
//               target="_blank"
//               rel="noreferrer"
//               className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
//             >
//               <Twitter className="w-5 h-5" />
//             </a>
//             <a
//               to="https://github.com/ssmahim01/Care-Matrix-With-Dev-Sync"
//               target="_blank"
//               rel="noreferrer"
//               className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
//             >
//               <Github className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
