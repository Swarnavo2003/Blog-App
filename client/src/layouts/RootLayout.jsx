import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="relative h-screen overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
