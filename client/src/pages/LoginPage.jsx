import { IoMdMail } from "react-icons/io";
import { FaKey, FaUser } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoggingIn, loginUser } = useAuthStore();

  const submitInputHandler = async () => {
    try {
      await loginUser({ username, email, password });
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="card w-96 bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <div className="justify-center card-actions mb-2">
            <h2 className="card-title text-4xl font-bold">Login</h2>
          </div>

          <div className="w-full">
            <label className="input validator">
              <FaUser className="size-5" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Username"
                title="Only letters, numbers or dash"
                className="placeholder:text-xl text-xl"
              />
            </label>
          </div>

          <div className="w-full">
            <label className="input validator">
              <IoMdMail className="size-5" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="mail@site.com"
                required
                className="placeholder:text-xl text-xl"
              />
            </label>
          </div>

          <div className="w-full">
            <label className="input validator">
              <FaKey className="size-5" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                className="placeholder:text-xl text-xl"
              />
            </label>
          </div>

          <div className="w-full card-actions">
            <button
              onClick={submitInputHandler}
              disabled={isLoggingIn}
              className="btn btn-primary text-xl btn-lg w-full mt-2"
            >
              {isLoggingIn ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Please Wait</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="mt-2 mb-2 border border-accent-content"></div>

          <div className="w-full text-center">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
