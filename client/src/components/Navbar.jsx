import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { FaPen, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { authUser, logoutUser } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-2xl shadow-xl" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Blogify
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/blogs"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Stories
            </Link>

            {authUser ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/blog/create"
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200 text-sm font-medium"
                >
                  <FaPen size={12} />
                  Write
                </Link>

                {/* User Menu */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-8 rounded-full ring-2 ring-violet-200 hover:ring-violet-400 transition-colors">
                      <img src={authUser.avatar.url} alt="Avatar" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-52 border border-gray-100"
                  >
                    <li className="menu-title">
                      <span className="text-xs text-gray-500">
                        {authUser.firstname} {authUser.lastname}
                      </span>
                    </li>
                    <li>
                      <Link to="/profile">
                        <FaUser size={12} />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/write">
                        <FaPen size={12} />
                        New Story
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button onClick={logoutUser} className="text-red-600">
                        <FaSignOutAlt size={12} />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/20"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-16 right-4 left-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              <Link
                to="/story"
                onClick={toggleMobileMenu}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Story
              </Link>

              {authUser ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={authUser.avatar.url}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {authUser.firstname} {authUser.lastname}
                      </p>
                      <p className="text-xs text-gray-500">
                        @{authUser.username}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FaUser size={14} />
                    Profile
                  </Link>
                  <Link
                    to="/write"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FaPen size={14} />
                    Write Story
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors w-full text-left"
                  >
                    <FaSignOutAlt size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="block p-3 text-center hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMobileMenu}
                    className="block bg-gradient-to-r from-violet-600 to-blue-600 text-white p-3 rounded-lg text-center font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
