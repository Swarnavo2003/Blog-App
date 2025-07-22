import { HiDotsVertical } from "react-icons/hi";
import { useBlogStore } from "../store/useBlogStore";
import { useNavigate } from "react-router";

const CreateBlogTable = ({ authorBlogs }) => {
  const { deleteBlog } = useBlogStore();
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {authorBlogs.length <= 0 ? (
            <tr>
              <td colSpan="100%" className="text-center">
                <span>No blogs found</span>
              </td>
            </tr>
          ) : (
            authorBlogs.map((blog, index) => (
              <tr key={blog._id}>
                <th>{index + 1}</th>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{blog.createdAt.split("T")[0]}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <button>
                        <HiDotsVertical />
                      </button>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li className="flex gap-2">
                        {/* <FiEdit className="text-black" /> */}
                        <span>Edit</span>
                      </li>
                      <li
                        className="flex gap-2"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        {/* <FaRegTrashCan /> */}
                        <span>Delete</span>
                      </li>
                      <li
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="flex gap-2"
                      >
                        {/* <FiEdit className="text-black" /> */}
                        <span>Preview</span>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreateBlogTable;
