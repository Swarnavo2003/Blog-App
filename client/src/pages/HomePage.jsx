import Footer from "../components/Footer";
import anime from "../assets/anime.webp";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="pt-20 min-h-screen relative">
      <div className="w-full h-[610px]">
        <div className="mx-auto max-w-7xl h-full grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 pt-30">
            <h1 className="text-6xl font-extrabold px-10">Human</h1>
            <h1 className="text-6xl font-extrabold px-10">stories & ideas</h1>
            <p className="text-xl font-semibold px-10 pt-5">
              A place to read, write, and deepen your understanding Start
              reading
            </p>
            <div className="px-10 pt-5">
              {authUser ? (
                <Link to="blogs">
                  <button className="btn btn-lg rounded-full">
                    Write Something...
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn btn-xl rounded-full">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block col-span-1">
            <div className="h-full flex items-center justify-center">
              <div className="border border-yellow-800/90 shadow-2xl shadow-yellow-800/90 rounded-2xl">
                <img
                  src={anime}
                  alt="image"
                  className="w-200 h-100 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
