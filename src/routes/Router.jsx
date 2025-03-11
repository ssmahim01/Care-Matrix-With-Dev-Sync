import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

const Router = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
     </Route>
    </Routes>
    </>
  );
};

export default Router;