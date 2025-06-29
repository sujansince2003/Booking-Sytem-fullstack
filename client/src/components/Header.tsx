import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogOutBtn from "./LogOutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BOOKING GARA</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-bookings"}
                className="flex items-center text-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="flex items-center text-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
              >
                My Hotels
              </Link>
              <LogOutBtn />
            </>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center text-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
