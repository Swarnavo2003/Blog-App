import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logoutUser } = useAuthStore();

  return (
    <div className="fixed top-0 left-0 w-full border-b h-20 z-50">
      <div className="mx-10 md:mx-auto max-w-7xl h-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogify</h1>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-3 ">
            <li className="text-sm font-semibold cursor-pointer hover:underline">
              Our Story
            </li>
            <li className="text-sm font-semibold cursor-pointer hover:underline">
              Write
            </li>
          </ul>
          {authUser ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                      <img src={authUser.avatar.url} />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <p onClick={logoutUser}>Logout</p>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to={"/login"}>
              <button class="btn">Get Started</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
