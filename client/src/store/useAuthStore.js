import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isgettingProfile: false,

  getProfile: async () => {
    set({ isgettingProfile: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      // console.log(res.data);
      set({ authUser: res.data.data });
      // toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isgettingProfile: false });
    }
  },

  loginUser: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      // console.log(res.data);
      set({ authUser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
