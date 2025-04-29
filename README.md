<div align="center">
  <img width="100%" height="340" src="/public/care-matrix-ui.png"  />
</div>

---

# 🏥Care Matrix - Hospital Management Application

**Care Matrix is a comprehensive hospital management system designed to digitize and streamline hospital operations, enhance patient care, and improve efficiency for medical professionals, administrators, receptionists, pharmacists, and patients. The platform facilitates seamless coordination among hospital staff and ensures optimal healthcare delivery.**

[![Website](https://img.shields.io/badge/Live%20Demo-Chill%20Gamer%20Platform-brightgreen)](https://care-matrix.web.app)
[![Backend Repository](https://img.shields.io/badge/Backend%20Repository-Click%20Here-blue)](https://github.com/ssmahim01/Care-Matrix-Backend)

---

## 🛠️ Used Main Technologies

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Daisy UI, Shadcn UI, Stripe
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Routing:** React Router
- **Animation:** Lottie React, Framer Motion
- **Hosting:** Firebase (Frontend), Vercel (Backend)

---

## 🚀 Core Features

✔ **Smart Wait-Time Prediction System** – Uses advanced algorithms to estimate and display real-time waiting times for patients, enhancing hospital visit experiences and reducing congestion.  
✔ **Manage Medical Records** – Securely stores and manages patient data, prescriptions, and medical history. Doctors can update records, and patients can access their medical history and prescriptions.  
✔ **Chat-Activated Dashboard** – Enables real-time communication between users for better collaboration. Patients can consult doctors or pharmacists for health advice.  
✔ **Billing & Payment System** – Automates billing with online payment integration for seamless transactions. Once payment is completed, the status is updated, and the receptionist manages appointment statuses. 
✔ **Real-Time Bed Availability** – A live dashboard to track and manage hospital bed occupancy. The system updates bed availability status, allowing authorized users to book or allocate beds efficiently.
✔ **Pharmacy & Inventory Management** – Real-time tracking of medicine stock, medical supplies, and restocking alerts. Pharmacists manage inventory, dispense medications, and ensure the availability of essential drugs for patient care.
✔ **Emergency Services Coordination** – Provides quick access to emergency contacts, ambulance booking, and urgent care scheduling. The receptionist prioritizes emergency cases and assigns doctors accordingly.
✔ **Doctors Management** – A dedicated dashboard for managing doctors’ availability. Administrators have full control to update schedules and available days.
✔ **Patient Health Gamification & Rewards System** – Encourages healthy habits by rewarding patients for regular check-ups, medication adherence, and lifestyle improvements, promoting better health outcomes.
✔ **Medicine Add To Cart & Checkout System** – Patients can browse available medicines and add them to their cart. Quantity selection and total cost are dynamically updated. Medicines can be removed or updated before checkout.
✔ **Purchase History Tracking** – Patients can view their previous medicine purchases with date and transaction details. Pharmacists can track and manage all sales records. Patients can download their purchase invoice paper in pdf format.

---

## 📦 Used Dependencies

```json
"dependencies": {
    "@ag-media/react-pdf-table": "^2.0.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.10",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.11",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.5",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@react-pdf/renderer": "^4.3.0",
    "@reduxjs/toolkit": "^2.6.1",
    "@smastrom/react-rating": "^1.5.0",
    "@stripe/react-stripe-js": "^3.5.1",
    "@stripe/stripe-js": "^6.1.0",
    "@tailwindcss/vite": "^4.0.12",
    "@tanstack/react-query": "^5.69.0",
    "axios": "^1.8.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.0",
    "date-fns": "^4.1.0",
    "dom-to-image": "^2.6.0",
    "firebase": "^11.4.0",
    "framer-motion": "^12.5.0",
    "lodash": "^4.17.21",
    "lottie-react": "^2.4.1",
    "lucide-react": "^0.483.0",
    "moment": "^2.30.1",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-confetti": "^6.4.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "react-router": "^7.3.0",
    "react-router-dom": "^7.3.0",
    "react-slick": "^0.30.3",
    "react-to-pdf": "^2.0.0",
    "react-use": "^17.6.0",
    "recharts": "^2.15.1",
    "redux": "^5.0.1",
    "slick-carousel": "^1.8.1",
    "sonner": "^2.0.3",
    "sweetalert2": "^11.6.13",
    "swiper": "^11.2.5",
    "tailwind-merge": "^3.0.2",
    "tailwindcss": "^4.0.12",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "xlsx": "^0.18.5",
    "zod": "^3.24.2"
  }
```

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ssmahim01/Care-Matrix-With-Dev-Sync.git
cd Care-Matrix-With-Dev-Sync
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory and add the keys with URLs

---

## 🏃 Project Run Locally

To run the project locally, use the following command:

```sh
npm run dev
```

🔹 This will start the development server, and you can access it at:  
📌 **`http://localhost:5173`**

For backend setup, refer to the **[Backend Repository](https://github.com/ssmahim01/Care-Matrix-Backend)**.

---

## 📚 Used npm Packages

| Package                     | Documentation                                                 |
| --------------------------- | ------------------------------------------------------------- |
| **react-pdf-table**      | [Docs](https://www.npmjs.com/package/@ag-media/react-pdf-table)                    |
| **lottie-react**            | [Docs](https://www.npmjs.com/package/lottie-react)            |
| **react-hook-form**                | [Docs](https://react-hook-form.com)                               |
| **react-icons**             | [Docs](https://react-icons.github.io/react-icons)             |
| **sweetalert2**             | [Docs](https://sweetalert2.github.io)                         |
| **swiper-js**               | [Docs](https://swiperjs.com)                                  |
| **lucide-react** | [Docs](https://lucide.dev/guide/packages/lucide-react) |
| **recharts**           | [Docs](https://recharts.org/en-US)           |
| **react-hot-toast**          | [Docs](https://react-hot-toast.com)          |

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
