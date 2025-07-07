import { FaChevronLeft } from "react-icons/fa";
import BlogsContainer from "../components/BlogsContainer";
import { useBlogStore } from "../store/useBlogStore";
import { useEffect } from "react";
import { Link } from "react-router";

const BlogsPage = () => {
  const { getBlogs } = useBlogStore();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);
  return (
    <div className="max-w-7xl mx-auto h-screen w-full my-5">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <button className="btn btn-ghost border-2 border-gray-200">
            <FaChevronLeft />
          </button>
        </Link>
        <button className="btn btn-primary">Create Blog</button>
      </div>

      <BlogsContainer />
    </div>
  );
};

export default BlogsPage;
