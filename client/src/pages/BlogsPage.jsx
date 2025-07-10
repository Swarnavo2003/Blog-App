import { FaChevronLeft } from "react-icons/fa";
import BlogsContainer from "../components/BlogsContainer";
import { useBlogStore } from "../store/useBlogStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const BlogsPage = () => {
  const { getBlogs } = useBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all shadow-sm">
            <FaChevronLeft />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <button
          onClick={() => navigate("/blog/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition-all"
        >
          Create Blog
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <BlogsContainer />
      </div>
    </div>
  );
};

export default BlogsPage;
