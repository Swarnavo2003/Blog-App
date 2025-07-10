import { HiDotsVertical } from "react-icons/hi";

const CreateBlogTable = ({ authorBlogs }) => {
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
            authorBlogs.map((blog) => (
              <tr key={blog._id}>
                <th>1</th>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{blog.createdAt.split("T")[0]}</td>
                <td>
                  <button className="btn btn-ghost">
                    <HiDotsVertical />
                  </button>
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
