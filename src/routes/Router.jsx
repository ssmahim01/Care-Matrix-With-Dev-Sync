import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ExpertDoctors from "@/pages/Doctors/ExpertDoctors";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/authentication/Login";
import Register from "@/authentication/Register";
import Services from "@/pages/services/Services";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setLoading, setUser } from "@/redux/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/firebase.config";
import { useEffect } from "react";
import axios from "axios";

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

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
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<ExpertDoctors />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
      {/* Authentication Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Router;
