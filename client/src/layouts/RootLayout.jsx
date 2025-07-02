import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sticky navbar with subtle shadow */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Navbar />
      </header>

      {/* Main content area with proper spacing */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer with top border */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* <Footer /> */}
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
