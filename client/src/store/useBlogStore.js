import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../api/axios";

export const useBlogStore = create((set, get) => ({
  blogs: [],
  authorBlogs: [],
  blog: null,
  isGettingBlogs: false,
  isGettingAuthorBlogs: false,
  isGettingBlog: false,
  isCreatingBlog: false,
  isDeletingBlog: false,

  getBlogs: async () => {
    set({ isGettingBlogs: true });
    try {
      const res = await axiosInstance.get(`/blog/all`);
      set({ blogs: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isGettingBlogs: false });
    }
  },

  getAuthorBlogs: async () => {
    set({ isGettingAuthorBlogs: true });
    try {
      const res = await axiosInstance.get(`/blog/author`);
      // console.log(res.data.data);
      set({ authorBlogs: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isGettingAuthorBlogs: false });
    }
  },

  getBlogById: async (id) => {
    set({ isGettingBlog: true });
    try {
      const res = await axiosInstance.get(`/blog/${id}`);
      set({ blog: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message || "Session expred");
    } finally {
      set({ isGettingBlog: false });
    }
  },

  createBlog: async (data) => {
    set({ isCreatingBlog: true });
    try {
      const res = await axiosInstance.post(`/blog/create`, data);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Session expred");
    } finally {
      set({ isCreatingBlog: false });
    }
  },

  deleteBlog: async (id) => {
    set({ isDeletingBlog: true });
    try {
      const res = await axiosInstance.delete(`/blog/delete/${id}`);
      if (res.data.success) {
        const updatedAuthorBlogs = get().authorBlogs.filter(
          (blog) => blog._id !== id
        );
        set({ authorBlogs: updatedAuthorBlogs });
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Blog Deletion Error");
    } finally {
      set({ isDeletingBlog: false });
    }
  },
}));
