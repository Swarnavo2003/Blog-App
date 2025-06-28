import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./layouts/RootLayout";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

function App() {
  const { getProfile, isgettingProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  if (isgettingProfile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <FiLoader className="w-20 h-20 animate-spin" />
      </div>
    );
  }
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/blogs" element={<h1>Blogs</h1>} />
      <Route path="/blog/:id" element={<h1>Blog Preview</h1>} />
      <Route path="/blog/create" element={<h1>Blog Creation</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
