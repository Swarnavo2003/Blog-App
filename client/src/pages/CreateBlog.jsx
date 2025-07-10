import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";
import { useBlogStore } from "../store/useBlogStore";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import CreateBlogTable from "../components/CreateBlogTable";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    getAuthorBlogs,
    isGettingAuthorBlogs,
    authorBlogs,
    createBlog,
    isCreatingBlog,
  } = useBlogStore();

  useEffect(() => {
    getAuthorBlogs();
  }, [getAuthorBlogs, createBlog]);

  if (isGettingAuthorBlogs && !authorBlogs) {
    return <Loader />;
  }

  const submitHandler = async () => {
    try {
      await createBlog({ title, description });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-screen">
      <div className="flex items-center justify-between py-5">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all shadow-sm">
            <FaChevronLeft />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box space-y-2">
            <h3 className="font-bold text-lg">Create Your Blog</h3>
            <p className="py-2 text-gray-600 text-sm">
              Write down the title and description for your blog you can edit
              and publish it later.
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title"
              className="input w-full"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea w-full"
              placeholder="description"
            ></textarea>
            <button onClick={submitHandler} className="btn">
              {isCreatingBlog ? "Creating..." : "Create"}
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <CreateBlogTable authorBlogs={authorBlogs} />
    </div>
  );
};

export default CreateBlog;
