import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ExpertDoctors from "@/pages/Doctors/ExpertDoctors";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/authentication/Login";
import Register from "@/authentication/Register";
import Services from "@/pages/services/Services";
import { logOutUser, setLoading, setUser } from "@/redux/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/firebase.config";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import DoctorDetails from "@/pages/DoctorDetails/DoctorDetails";
import DetailsAboutUs from "@/pages/AboutUs/DetailsAboutUs";
import DashboardLayout from "@/layouts/DashboardLayout";
import Error from "@/ErrorPage/Error";
import AdministratorOverview from "@/pages/DashboardPages/Administrator/AdministratorOverview";

import BookAppointment from "@/pages/BookAppointment/BookAppointment";
import OurPharmacy from "@/pages/OurPharmacy/OurPharmacy";
import StuffManagement from "@/pages/Stuff-Management/StuffManagement";
import ManageBanners from "@/pages/DashboardPages/Pharmacist/ManageBanners";
import DoctorsManagement from "@/pages/DashboardPages/Administrator/DoctorsManagement";
import ManageMedicines from "@/pages/DashboardPages/Pharmacist/ManageMedicines";
import ManageAppointments from "@/pages/DashboardPages/Administrator/ManageAppointments";
import MedicineDetails from "@/pages/OurPharmacy/MedicineDetails";
import Cart from "@/components/Pharmacy/Cart";
import Payment from "@/pages/Payment/Payment";
import SuccessPayment from "@/pages/SuccessPayment/SuccessPayment";
import PharmacistOverview from "@/pages/DashboardPages/Pharmacist/PharmacistOverview";
import RoleRequest from "@/pages/Patient/RequestForRole/RoleRequest";
import ManageOrders from "@/pages/DashboardPages/Pharmacist/ManageOrders/ManageOrders";
import ReceptionistOverview from "@/pages/DashboardPages/Receptionist/ReceptionistOverview";
import ManageBeds from "@/pages/DashboardPages/Receptionist/ManageBeds";
import ManageBedBooking from "@/pages/DashboardPages/Receptionist/ManageBedBooking";
import EidGreetingSection from "@/pages/Home/EidGreetingSection";
import MyAppointments from "@/pages/DashboardPages/User/MyAppointments/MyAppointments";
import RequestHistory from "@/pages/Patient/RequestHistory/RequestHistory";
import Invoice from "../components/Pharmacy/Invoice.jsx";
import PurchaseHistory from "@/pages/Patient/PurchaseHistory/PurchaseHistory";
import Profile from "@/pages/DashboardPages/Profile/Profile";
import MyFavoriteDoctors from "@/pages/DashboardPages/User/MyFavoriteDoctors/MyFavoriteDoctors";
import SalesReport from "@/pages/DashboardPages/Pharmacist/SalesReport/SalesReport";
import MyBedRequests from "@/pages/DashboardPages/User/MyBedRequests/MyBedRequests";
import EmergencyContact from "@/pages/Patient/EmergencyDashboard/EmergencyContact";
import PatientRewards from "@/pages/PatientRewards/PatientRewards";
import EmergencyLayout from "@/pages/emergency/EmergencyLayout";
import Emergency from "@/pages/emergency/Emergency";
import EmergencyContactsList from "@/pages/emergency/emergency-contacts-list";
import EmergencyAmbulanceBooking from "@/pages/emergency/emergency-ambulance-booking";
import EmergencyTriage from "@/pages/emergency/emergency-triage";
import PatientOverview from "@/pages/DashboardPages/PatientOverview/PatientOverview";
import RewardsDashboard from "@/pages/Patient/Rewards/RewardsDashboard";
import ManageBillings from "@/pages/DashboardPages/Administrator/ManageBillings";
import AdminRoute from "./AdminRoute";
import AllDoctors from "@/pages/DashboardPages/Administrator/AllDoctors";

const Router = () => {
  const dispatch = useDispatch();
  // const user = useAuthUser();
  // console.log(user);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            createdAt: currentUser.metadata.creationTime,
            lastLoginAt: currentUser.metadata.lastSignInTime,
          })
        );

        // Set Token in Cookies
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/jwt`,
          { email: currentUser.email },
          { withCredentials: true }
        );
      } else {
        dispatch(logOutUser());

        // Clear Token from Cookies
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/logout`,
          {},
          { withCredentials: true }
        );
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="doctors" element={<ExpertDoctors />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="services" element={<Services />} />
        <Route path="pharmacy" element={<OurPharmacy />} />
        <Route path="about-us" element={<DetailsAboutUs />} />
        <Route path="medicine/:id" element={<MedicineDetails />} />
        <Route path="patient-rewards" element={<PatientRewards />} />
        <Route path="book-appointment/payment" element={<Payment />} />
        <Route
          path="book-appointment/payment-success"
          element={<SuccessPayment />}
        />
        <Route path="about-us" element={<DetailsAboutUs />} />
        <Route path="book-appointment/:name" element={<BookAppointment />} />
        <Route path="doctor-details/:id" element={<DoctorDetails />} />
        <Route
          path="eid-greetings"
          element={
            <div className="pt-24 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl">
              <EidGreetingSection />
            </div>
          }
        />
      </Route>

      <Route path="emergency" element={<EmergencyLayout />}>
        <Route index element={<Emergency />} />
        <Route path="contacts" element={<EmergencyContactsList />} />
        <Route
          path="ambulance-booking"
          element={<EmergencyAmbulanceBooking />}
        />
        <Route path="triage" element={<EmergencyTriage />} />
      </Route>

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Admin Routes */}
        <Route
          path="/dashboard/administrator-overview"
          element={
            <AdminRoute>
              <AdministratorOverview />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/administrator/manage-doctors"
          element={
            <AdminRoute>
              <DoctorsManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/administrator/manage-users"
          element={
            <AdminRoute>
              <StuffManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/administrator/manage-billing-payments"
          element={
            <AdminRoute>
              <ManageBillings />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/administrator/doctors"
          element={
            <AdminRoute>
              <AllDoctors />
            </AdminRoute>
          }
        />

        {/* Pharmacist Routes */}
        <Route
          path="/dashboard/pharmacist-overview"
          element={<PharmacistOverview />}
        />
        <Route
          path="/dashboard/pharmacist/sales-report"
          element={<SalesReport />}
        />
        <Route
          path="/dashboard/pharmacist/manage-orders"
          element={<ManageOrders />}
        />
        <Route
          path="/dashboard/pharmacist/manage-medicines"
          element={<ManageMedicines />}
        />
        <Route
          path="/dashboard/pharmacist/manage-banner"
          element={<ManageBanners />}
        />

        {/* Doctors Routes */}

        {/* Receptionist Routes */}
        <Route
          path="/dashboard/receptionist-overview"
          element={<ReceptionistOverview />}
        />
        <Route
          path="/dashboard/receptionist/manage-beds"
          element={<ManageBeds />}
        />
        <Route
          path="/dashboard/receptionist/manage-bedBooking"
          element={<ManageBedBooking />}
        />
        <Route
          path="/dashboard/receptionist/manage-appointments"
          element={<ManageAppointments />}
        />

        {/* Patient Routes */}
        <Route
          path="/dashboard/patient-overview"
          element={<PatientOverview />}
        />
        <Route path="/dashboard/patient/manage-cart" element={<Cart />} />
        <Route
          path="/dashboard/patient/rewards"
          element={<RewardsDashboard />}
        />
        <Route
          path="/dashboard/patient/request-form"
          element={<RoleRequest />}
        />
        <Route
          path="/dashboard/patient/appointments"
          element={<MyAppointments />}
        />
        <Route
          path="/dashboard/patient/favorite-doctors"
          element={<MyFavoriteDoctors />}
        />
        <Route
          path="/dashboard/patient/my-bedRequest"
          element={<MyBedRequests />}
        />
        <Route
          path="/dashboard/patient/request-history"
          element={<RequestHistory />}
        />
        <Route
          path="/dashboard/patient/purchase-history"
          element={<PurchaseHistory />}
        />
        <Route path="/dashboard/invoice/:invoiceId" element={<Invoice />} />
        <Route
          path="/dashboard/patient/emergency-cases"
          element={<EmergencyContact />}
        />

        {/* Common Routes */}
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>

      {/* Catch-all for 404 Error Page */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
