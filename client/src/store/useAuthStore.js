import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isgettingProfile: false,
  isUpdatingProfile: false,
  hasFetchedProfile: false,

  getProfile: async () => {
    set({ isgettingProfile: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      // console.log(res.data);
      set({ authUser: res.data.data });
      // toast.success(res.data.message);
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response.data.message || "Session expred");
    } finally {
      set({ isgettingProfile: false, hasFetchedProfile: true });
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

  registerUser: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/user/register", data);
      // console.log(res.data);
      set({ authUser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },

  logoutUser: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.get("/user/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateUser: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/update", data);
      toast.success(res.data.message || "Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
