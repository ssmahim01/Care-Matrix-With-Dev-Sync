import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Lazy load components
const Navbar = lazy(() => import("@/shared/Navbar/Navbar"));
const Footer = lazy(() => import("@/shared/Footer/Footer"));
const MainLayoutLoader = lazy(() =>
  import("@/components/Loader/MainLayoutLoader")
);

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<MainLayoutLoader />}>
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-313px)] py-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default MainLayout;
