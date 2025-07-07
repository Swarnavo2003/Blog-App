import { useBlogStore } from "../store/useBlogStore";
import BlogCard from "./BlogCard";
import Loader from "./Loader";

const BlogsContainer = () => {
  const { blogs, isGettingBlogs } = useBlogStore();

  if (isGettingBlogs) {
    return <Loader />;
  }

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {blogs.map((blog) => {
          return (
            <div key={blog._id} className="my-8">
              <BlogCard blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsContainer;
