import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full border-b h-20 z-50">
      <div className="mx-10 md:mx-auto max-w-7xl h-full flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blogify</h1>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-3 ">
            <li className="text-xl font-semibold cursor-pointer hover:underline">
              Our Story
            </li>
            <li className="text-xl font-semibold cursor-pointer hover:underline">
              Write
            </li>
          </ul>
          <button class="btn btn-secondary text-lg font-bold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
