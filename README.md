<div align="center">
  <img src="/public/care-matrix-ui.png" alt="Care Matrix UI" width="100%" height="340"/>
  <h1>🏥 Care Matrix</h1>
  <p>A Comprehensive Hospital Management Application</p>

  <p>
    <a href="https://care-matrix.web.app">
      <img src="https://img.shields.io/badge/Live%20Demo-Care%20Matrix-brightgreen" alt="Live Demo"/>
    </a>
    <a href="https://github.com/ssmahim01/Care-Matrix-Backend">
      <img src="https://img.shields.io/badge/Backend%20Repository-Click%20Here-blue" alt="Backend Repository"/>
    </a>
    <a href="https://github.com/ssmahim01/Care-Matrix-With-Dev-Sync/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License: MIT"/>
    </a>
  </p>
</div>

---

## 📖 Overview

**Care Matrix** is a robust hospital management system designed to digitize and streamline hospital operations, enhance patient care, and improve operational efficiency. It facilitates seamless coordination among medical professionals, administrators, receptionists, pharmacists, and patients, ensuring optimal healthcare delivery through an intuitive and modern platform.

---

## 🛠️ Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Daisy UI** - Tailwind CSS component library
- **Shadcn UI** - Accessible UI components
- **Stripe** - Payment integration

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database

### Additional Tools
- **Firebase Authentication** - Secure user authentication
- **React Router** - Client-side routing
- **Lottie React** & **Framer Motion** - Animations
- **Firebase** - Frontend hosting
- **Vercel** - Backend hosting

---

## 🚀 Core Features

- **Smart Wait-Time Prediction System**  
  Utilizes advanced algorithms to estimate real-time waiting times, improving patient experience and reducing congestion.

- **Manage Medical Records**  
  Securely stores and manages patient data, prescriptions, and medical history, accessible by both doctors and patients.

- **Chat-Activated Dashboard**  
  Enables real-time communication between users for better collaboration, including patient consultations with doctors and pharmacists.

- **Billing & Payment System**  
  Automates billing with Stripe integration for seamless online transactions, with status updates managed by receptionists.

- **Real-Time Bed Availability**  
  Tracks and manages hospital bed occupancy in real-time, allowing efficient bed allocation.

- **Pharmacy & Inventory Management**  
  Monitors medicine stock and medical supplies with restocking alerts for pharmacists.

- **Emergency Services Coordination**  
  Provides quick access to emergency contacts, ambulance booking, and urgent care scheduling.

- **Doctors Management**  
  A dashboard for administrators to manage doctors’ schedules and availability.

- **Patient Health Gamification & Rewards System**  
  Encourages healthy habits with rewards for regular check-ups and medication adherence.

- **Medicine Add To Cart & Checkout System**  
  Allows patients to browse, add medicines to their cart, and checkout with dynamic cost updates.

- **Purchase History Tracking**  
  Enables patients to view and download their medicine purchase history as PDF invoices.

---

## 📦 Dependencies

Here’s a list of key dependencies used in the project:

```json
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
```

For the full list, refer to the `package.json` file.

---

## 📥 Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ssmahim01/Care-Matrix-With-Dev-Sync.git
cd Care-Matrix-With-Dev-Sync
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the necessary environment variables. Example:

```env
VITE_apiKey=Provide-firebase-api-key
VITE_authDomain=Provide-firebase-authDomain
VITE_projectId=Provide-firebase-projectId
VITE_storageBucket=Provide-firebase-storageBucket
VITE_messagingSenderId=Provide-firebase-messagingSenderId
VITE_appId=Provide-firebase-appId
VITE_API_URL=Provide-backend-url
VITE_IMGBB_API_URL=Provide-imgbb-key
VITE_STRIPE_PUBLISHABLE_KEY=Provide-stripe-key
```

---

## 🏃 Running the Project Locally

To run the project locally:

```bash
npm run dev
```

- The development server will start at:  
  🌐 **`http://localhost:5173`**

For backend setup instructions, visit the [Backend Repository](https://github.com/ssmahim01/Care-Matrix-Backend).

---

## 📚 Key npm Packages

| Package               | Purpose                          | Documentation                                      |
|-----------------------|----------------------------------|----------------------------------------------------|
| **react-pdf-table**   | Generate PDF tables             | [Docs](https://www.npmjs.com/package/@ag-media/react-pdf-table) |
| **lottie-react**      | Animations with Lottie          | [Docs](https://www.npmjs.com/package/lottie-react) |
| **react-hook-form**   | Form handling                   | [Docs](https://react-hook-form.com)                |
| **react-icons**       | Icon library                    | [Docs](https://react-icons.github.io/react-icons)  |
| **sweetalert2**       | Customizable alerts             | [Docs](https://sweetalert2.github.io)              |
| **swiper**            | Touch-enabled sliders           | [Docs](https://swiperjs.com)                       |
| **lucide-react**      | Icon library                    | [Docs](https://lucide.dev/guide/packages/lucide-react) |
| **recharts**          | Data visualization              | [Docs](https://recharts.org/en-US)                 |
| **react-hot-toast**   | Toast notifications             | [Docs](https://react-hot-toast.com)                |

---

## 🛠️ Development Setup (React + Vite)

This project uses **React** with **Vite** for a fast development experience, including Hot Module Replacement (HMR) and ESLint rules.

### Available Vite Plugins
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC for Fast Refresh

### ESLint Configuration
For production applications, consider enhancing the ESLint setup with TypeScript and type-aware lint rules. Check out the [React + TypeScript Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

---

## 🤝 Contributing

Contributions are welcome! To contribute to Care Matrix:

1. Clone the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit (`git commit -m "Add YourFeature"`).
4. Push to your branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please ensure your code follows the project’s coding standards and includes appropriate tests.

---

## 🙌 Acknowledgments

- Thanks to the open-source community for providing the tools and libraries that made this project possible.
- Special thanks to the contributors who helped improve Care Matrix.

---

<div align="center">
  <p>Built with ❤️ <a href="https://github.com/ssmahim01">SS Mahim</a></p>
</div>