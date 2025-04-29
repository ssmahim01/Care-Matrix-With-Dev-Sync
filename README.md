
  
  🏥 Care Matrix
  A Comprehensive Hospital Management Application

  
    
      
    
    
      
    
    
      
    
  



📖 Overview
Care Matrix is a robust hospital management system designed to digitize and streamline hospital operations, enhance patient care, and improve operational efficiency. It facilitates seamless coordination among medical professionals, administrators, receptionists, pharmacists, and patients, ensuring optimal healthcare delivery through an intuitive and modern platform.

🛠️ Technologies Used
Frontend

React - JavaScript library for building user interfaces
Redux Toolkit - State management
Tailwind CSS - Utility-first CSS framework
Daisy UI - Tailwind CSS component library
Shadcn UI - Accessible UI components
Stripe - Payment integration

Backend

Node.js - JavaScript runtime
Express.js - Web framework for Node.js
MongoDB - NoSQL database

Additional Tools

Firebase Authentication - Secure user authentication
React Router - Client-side routing
Lottie React & Framer Motion - Animations
Firebase - Frontend hosting
Vercel - Backend hosting


🚀 Core Features

Smart Wait-Time Prediction SystemUtilizes advanced algorithms to estimate real-time waiting times, improving patient experience and reducing congestion.

Manage Medical RecordsSecurely stores and manages patient data, prescriptions, and medical history, accessible by both doctors and patients.

Chat-Activated DashboardEnables real-time communication between users for better collaboration, including patient consultations with doctors and pharmacists.

Billing & Payment SystemAutomates billing with Stripe integration for seamless online transactions, with status updates managed by receptionists.

Real-Time Bed AvailabilityTracks and manages hospital bed occupancy in real-time, allowing efficient bed allocation.

Pharmacy & Inventory ManagementMonitors medicine stock and medical supplies with restocking alerts for pharmacists.

Emergency Services CoordinationProvides quick access to emergency contacts, ambulance booking, and urgent care scheduling.

Doctors ManagementA dashboard for administrators to manage doctors’ schedules and availability.

Patient Health Gamification & Rewards SystemEncourages healthy habits with rewards for regular check-ups and medication adherence.

Medicine Add To Cart & Checkout SystemAllows patients to browse, add medicines to their cart, and checkout with dynamic cost updates.

Purchase History TrackingEnables patients to view and download their medicine purchase history as PDF invoices.



📦 Dependencies
Here’s a list of key dependencies used in the project:
{
  "dependencies": {
    "@ag-media/react-pdf-table": "^2.0.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-*": "Various components",
    "@reduxjs/toolkit": "^2.6.1",
    "@smastrom/react-rating": "^1.5.0",
    "@stripe/react-stripe-js": "^3.5.1",
    "@stripe/stripe-js": "^6.1.0",
    "@tanstack/react-query": "^5.69.0",
    "axios": "^1.8.3",
    "date-fns": "^4.1.0",
    "firebase": "^11.4.0",
    "framer-motion": "^12.5.0",
    "lottie-react": "^2.4.1",
    "lucide-react": "^0.483.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.3.0",
    "recharts": "^2.15.1",
    "sweetalert2": "^11.6.13",
    "swiper": "^11.2.5",
    "tailwindcss": "^4.0.12"
  }
}

For the full list, refer to the package.json file.

📥 Installation & Setup
Follow these steps to set up the project locally:
1. Clone the Repository
git clone https://github.com/ssmahim01/Care-Matrix-With-Dev-Sync.git
cd Care-Matrix-With-Dev-Sync

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env.local file in the root directory and add the necessary environment variables (e.g., Firebase config, Stripe keys, ImgBB API key). Example:
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
VITE_IMGBB_API_KEY=your-imgbb-key


🏃 Running the Project Locally
To run the project locally:
npm run dev


The development server will start at:🌐 http://localhost:5173

For backend setup instructions, visit the Backend Repository.

📚 Key npm Packages



Package
Purpose
Documentation



react-pdf-table
Generate PDF tables
Docs


lottie-react
Animations with Lottie
Docs


react-hook-form
Form handling
Docs


react-icons
Icon library
Docs


sweetalert2
Customizable alerts
Docs


swiper
Touch-enabled sliders
Docs


lucide-react
Icon library
Docs


recharts
Data visualization
Docs


react-hot-toast
Toast notifications
Docs



🛠️ Development Setup (React + Vite)
This project uses React with Vite for a fast development experience, including Hot Module Replacement (HMR) and ESLint rules.
Available Vite Plugins

@vitejs/plugin-react - Uses Babel for Fast Refresh
@vitejs/plugin-react-swc - Uses SWC for Fast Refresh

ESLint Configuration
For production applications, consider enhancing the ESLint setup with TypeScript and type-aware lint rules. Check out the React + TypeScript Vite template to integrate TypeScript and typescript-eslint.

🤝 Contributing
Contributions are welcome! To contribute to Care Matrix:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit (git commit -m "Add YourFeature").
Push to your branch (git push origin feature/YourFeature).
Open a Pull Request.

Please ensure your code follows the project’s coding standards and includes appropriate tests.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙌 Acknowledgments

Thanks to the open-source community for providing the tools and libraries that made this project possible.
Special thanks to the contributors and testers who helped improve Care Matrix.