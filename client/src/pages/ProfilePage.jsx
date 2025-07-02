import {
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaEdit,
  FaHeart,
  FaPen,
  FaLink,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";
import UserBlogsList from "../components/UserBlogsList";
import { useEffect } from "react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { getAuthorBlogs } = useBlogStore();

  useEffect(() => {
    getAuthorBlogs(authUser?._id);
  }, [getAuthorBlogs, authUser]);

  if (!authUser)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100">
      {/* Profile Header */}
      <div className="bg-base-100 shadow-lg rounded-2xl mt-12 border border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar with edit button */}
            <div className="avatar relative">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={authUser.avatar?.url || "/default-avatar.png"}
                  alt={authUser.username}
                />
              </div>
              <button
                className="btn btn-circle btn-sm btn-primary absolute bottom-0 right-0"
                onClick={() =>
                  document.getElementById("edit_modal").showModal()
                }
              >
                <FaEdit />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">
                    {authUser.firstname} {authUser.lastname}
                  </h1>
                  <p className="text-lg opacity-70">@{authUser.username}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("edit_modal").showModal()
                  }
                >
                  Edit Profile
                </button>
              </div>

              <p className="my-4">
                {authUser.bio ||
                  "Passionate writer sharing thoughts and stories with the world."}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 justify-center md:justify-start">
                {authUser.twitter && (
                  <a
                    href={`https://twitter.com/${authUser.twitter}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaTwitter /> Twitter
                  </a>
                )}
                {authUser.github && (
                  <a
                    href={`https://github.com/${authUser.github}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {authUser.website && (
                  <a href={authUser.website} className="btn btn-ghost btn-sm">
                    <FaGlobe /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              value: authUser.blogs?.length || 0,
              label: "Posts",
              icon: <FaPen />,
            },
            {
              value: authUser.followers?.length || 0,
              label: "Followers",
              icon: <FaUser />,
            },
            {
              value: authUser.following?.length || 0,
              label: "Following",
              icon: <FaUser />,
            },
            { value: "1.2K", label: "Likes", icon: <FaHeart /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="card bg-base-200 shadow-2xl rounded-2xl border border-gray-200"
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="text-primary">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm font-semibold opacity-70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="card bg-base-200 shadow-2xl rounded-2xl border border-gray-200">
          <div className="tabs">
            <a className="tab tab-bordered tab-active">
              <span className="font-semibold">My Posts</span>
            </a>
          </div>
          <UserBlogsList />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Edit Profile</h3>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={authUser.avatar?.url || "/default-avatar.png"}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm mx-auto block">
              Change Photo
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.firstname}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.lastname}
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                defaultValue={authUser.bio || ""}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaTwitter /> Twitter
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.twitter || ""}
                  className="input input-bordered"
                  placeholder="@username"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaGithub /> GitHub
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.github || ""}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaGlobe /> Website
                  </span>
                </label>
                <input
                  type="url"
                  defaultValue={authUser.website || ""}
                  className="input input-bordered"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6">
              Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;
