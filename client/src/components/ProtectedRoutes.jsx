import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "./Loader";

const ProtectedRoutes = ({ children }) => {
  const { authUser, isgettingProfile } = useAuthStore();

  if (isgettingProfile && !authUser) return <Loader />;

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
