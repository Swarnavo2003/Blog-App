import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useBlogStore } from "../store/useBlogStore";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa6";

const BlogPreview = () => {
  const { id } = useParams();
  const { blog, getBlogById, isGettingBlog } = useBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(id);
  }, [getBlogById, id]);

  if (isGettingBlog || !blog) return <Loader />;

  if (blog && !isGettingBlog) console.log("Blog -> ", blog);

  return (
    <div className=" w-full">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/blogs")}
          className="btn btn-active mt-10"
        >
          <FaArrowLeft />
          Back
        </button>
        {blog.coverImage.public_id && (
          <div className="w-full my-2 rounded-3xl">
            <img
              src={blog.coverImage.url}
              alt=""
              className="object-cover rounded-3xl"
            />
          </div>
        )}
        <h1 className="mt-4 text-4xl md:text-6xl font-bold">{blog.title}</h1>
        <p className="text-lg text-gray-700 font-mono my-2">
          {blog.description}
        </p>
        <div className="my-2 flex items-center space-x-8">
          <div className="flex items-center gap-2">
            <img
              src={blog.author.avatar.url}
              alt=""
              className="size-8 rounded-full border border-blue-600"
            />
            <span className="text-lg font-mono">{blog.author.username}</span>
            <button className="btn btn-outline btn-info rounded-xl w-16 h-8">
              Follow
            </button>
          </div>

          <span className="text-sm font-mono">{blog.readTime} min read</span>

          <span className="text-sm font-medium font-mono">
            {blog.createdAt.split("T")[0]}
          </span>
        </div>
        <div className="my-4 flex gap-4 flex-wrap">
          {blog.tags.map((tag, index) => (
            <div key={index} className="badge badge-outline badge-info">
              {tag}
            </div>
          ))}
        </div>

        <div className="my-10 text-sm md:text-xl md:font-normal font-mono">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
