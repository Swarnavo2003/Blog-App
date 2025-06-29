import { IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isRegistering, registerUser } = useAuthStore();
  const navigate = useNavigate();

  const submitInputHandler = async () => {
    try {
      await registerUser({ firstname, lastname, username, email, password });
    } catch (error) {
      toast.error(error);
    } finally {
      navigate("/login");
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="card w-96 bg-base-100 card-xl shadow-sm">
        <div className="card-body">
          <div className="justify-center card-actions mb-2">
            <h2 className="card-title text-4xl font-bold">Register</h2>
          </div>

          <div className="w-full flex gap-1">
            <label className="input validator">
              <FaUser className="size-5" />
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                required
                placeholder="Firstname"
                title="Only letters, numbers or dash"
                className="placeholder:text-xl text-xl"
              />
            </label>

            <label className="input validator">
              <FaUser className="size-5" />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                required
                placeholder="Lastname"
                title="Only letters, numbers or dash"
                className="placeholder:text-xl text-xl"
              />
            </label>
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
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="placeholder:text-xl text-xl"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer size-6"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer size-6"
                />
              )}
            </label>
          </div>

          <div className="w-full card-actions">
            <button
              onClick={submitInputHandler}
              disabled={isRegistering}
              className="btn btn-primary text-xl btn-lg w-full mt-2"
            >
              {isRegistering ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Please Wait</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>

          <div className="mt-2 mb-2 border border-accent-content"></div>

          <div className="w-full text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
