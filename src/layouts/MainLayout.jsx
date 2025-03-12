
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
    return (
        <section>
            <Outlet />
            <Toaster />
        </section>
    );
};

export default MainLayout;