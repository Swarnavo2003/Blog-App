import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FiLoader className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default Loader;
