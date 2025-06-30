import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./layouts/RootLayout";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Loader from "./components/Loader";
import BlogsPage from "./pages/BlogsPage";
import BlogPreview from "./pages/BlogPreview";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const { authUser, getProfile, hasFetchedProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!hasFetchedProfile) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route
        path="/blogs"
        element={
          <ProtectedRoutes>
            <BlogsPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <ProtectedRoutes>
            <BlogPreview />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/blog/create"
        element={
          <ProtectedRoutes>
            <CreateBlog />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/login"
        element={!authUser ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
