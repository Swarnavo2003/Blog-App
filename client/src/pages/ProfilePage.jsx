import {
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaEdit,
  FaHeart,
  FaPen,
  FaUser,
  FaCamera,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";
import UserBlogsList from "../components/UserBlogsList";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { authUser, updateUser, isUpdatingProfile } = useAuthStore();
  const { getAuthorBlogs } = useBlogStore();

  const [firstname, setFirstname] = useState(authUser?.firstname || "");
  const [lastname, setLastname] = useState(authUser?.lastname || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [twitter, setTwitter] = useState(authUser?.socialLinks?.twitter || "");
  const [github, setGithub] = useState(authUser?.socialLinks?.github || "");
  const [website, setWebsite] = useState(authUser?.socialLinks?.website || "");

  useEffect(() => {
    getAuthorBlogs(authUser?._id);
  }, [getAuthorBlogs, authUser]);

  const updateUserHandler = () => {
    const modal = document.getElementById("edit_modal");
    updateUser({ firstname, lastname, bio, twitter, github, website }, modal);
  };

  if (!authUser)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium text-base-content/70">
            Loading your profile...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Profile Header */}
      <div className="relative backdrop-blur-sm bg-white/80 shadow-2xl rounded-3xl mt-12 mx-4 md:mx-12 border border-white/30 overflow-hidden">
        {/* Header gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5"></div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Enhanced Avatar */}
            <div className="avatar relative group">
              <div className="w-36 rounded-full ring-4 ring-gradient-to-r from-violet-500 to-blue-500 ring-offset-4 ring-offset-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                <img
                  src={authUser.avatar?.url || "/default-avatar.png"}
                  alt={authUser.username}
                  className="rounded-full"
                />
              </div>
              <button
                className="btn btn-circle btn-sm bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 border-none text-white absolute -bottom-1 -right-1 shadow-xl transform transition-all duration-300 hover:scale-110"
                onClick={() =>
                  document.getElementById("edit_modal").showModal()
                }
              >
                <FaEdit className="text-sm" />
              </button>
            </div>

            {/* Enhanced Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {firstname} {lastname}
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">
                    @{authUser.username}
                  </p>
                  <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
                    <div className="badge badge-success badge-sm gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Active
                    </div>
                    <div className="badge badge-primary badge-sm">Verified</div>
                  </div>
                </div>
                <button
                  className="btn bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
                  onClick={() =>
                    document.getElementById("edit_modal").showModal()
                  }
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              </div>

              <div className="relative my-6 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl border border-violet-200/50">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {bio ||
                    "✨ Passionate writer sharing thoughts and stories with the world. Always exploring new ideas and connecting with amazing people!"}
                </p>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                {twitter && (
                  <a
                    href={`https://twitter.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <FaTwitter className="mr-1" /> Twitter
                  </a>
                )}
                {github && (
                  <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <FaGithub className="mr-1" /> GitHub
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-gradient-to-r from-emerald-400 to-teal-600 hover:from-emerald-500 hover:to-teal-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <FaGlobe className="mr-1" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              value: authUser.blogs?.length || 0,
              label: "Posts",
              icon: <FaPen />,
              gradient: "from-pink-500 to-rose-500",
              bgGradient: "from-pink-50 to-rose-50",
            },
            {
              value: authUser.followers?.length || 0,
              label: "Followers",
              icon: <FaUser />,
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50",
            },
            {
              value: authUser.following?.length || 0,
              label: "Following",
              icon: <FaUser />,
              gradient: "from-violet-500 to-purple-500",
              bgGradient: "from-violet-50 to-purple-50",
            },
            {
              value: "1.2K",
              label: "Likes",
              icon: <FaHeart />,
              gradient: "from-emerald-500 to-teal-500",
              bgGradient: "from-emerald-50 to-teal-50",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl group cursor-pointer`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}
                ></div>
              </div>
              <div className="relative card-body p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </h2>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Posts Section */}
        <div className="relative backdrop-blur-sm bg-white/80 shadow-2xl border border-white/30 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5"></div>

          <div className="relative">
            <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                    <FaPen className="text-white text-sm" />
                  </div>
                  My Posts
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEye className="text-gray-400" />
                  <span>Recently updated</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <UserBlogsList />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-3xl bg-gradient-to-br from-white via-violet-50/30 to-blue-50/30 backdrop-blur-sm border border-white/50 shadow-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-red-100 hover:text-red-500 transition-colors">
              ✕
            </button>
          </form>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
              <FaEdit className="text-white" />
            </div>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Edit Profile
            </h3>
          </div>

          <div className="space-y-8">
            {/* Enhanced Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="avatar group relative">
                <div className="w-28 rounded-full ring-4 ring-gradient-to-r from-violet-500 to-blue-500 ring-offset-4 ring-offset-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={authUser.avatar?.url || "/default-avatar.png"}
                    alt="Profile"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaCamera className="text-white text-xl" />
                </div>
              </div>
              <button className="btn btn-sm bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <FaCamera className="mr-2" />
                Change Photo
              </button>
            </div>

            {/* Enhanced Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input input-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input input-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Bio
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300 min-h-[100px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-semibold text-gray-700">
                    <FaTwitter className="text-blue-500" /> Twitter
                  </span>
                </label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="input input-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="@username"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-semibold text-gray-700">
                    <FaGithub className="text-gray-700" /> GitHub
                  </span>
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="input input-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-semibold text-gray-700">
                    <FaGlobe className="text-emerald-500" /> Website
                  </span>
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="input input-bordered bg-white/50 backdrop-blur-sm border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <button
              onClick={updateUserHandler}
              className="btn w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform text-lg py-3"
            >
              <FaStar className="mr-2" />
              {isUpdatingProfile ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;
