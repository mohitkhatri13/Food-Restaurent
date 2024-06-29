import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/headerpic.avif";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import { checkrole } from "../slice/staffcustomerSlice";
import { BsCart2 } from "react-icons/bs";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCustomer = useSelector((state) => state.role.isCustomer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isCustomer) {
      dispatch(checkrole(false)); // Resetting isCustomer state on logout
    }
    dispatch(logout());
    navigate("/"); // Navigate to home page after logout
  };

  const closeMenu = () => {
    setToggleMenu(false);
  };

  return (
    <div className="w-full bg-orange-600 flex items-center justify-center">
      <nav className="text-white px-4 py-3 md:px-8 md:py-4 flex justify-between items-center w-11/12">
        <div className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <img className="h-10" src={image1} alt="app__logo" />
            </Link>
          </div>
          <ul className="hidden md:flex space-x-4">
            <Link to="/" className="hover:scale-105 hover:text-gray-700">
              {" "}
              Home{" "}
            </Link>
            <Link to="/menu" className="hover:scale-105 hover:text-gray-700">
              {" "}
              Menu{" "}
            </Link>

            {isLoggedIn && isCustomer ? (
              <div className="flex gap-x-1 items-center">
                <Link
                  to="/orders"
                  className="hover:scale-105 hover:text-gray-700"
                >
                  {" "}
                  Orders{" "}
                </Link>
                <BsCart2 />
              </div>
            ) : null}

            <Link
              to="/contact-us"
              className="hover:scale-105 hover:text-gray-700"
            >
              {" "}
              Contact-us{" "}
            </Link>
            {isLoggedIn && !isCustomer ? (
              <Link
                to="/vieworders"
                className="hover:scale-105 hover:text-gray-700"
              >
                View orders
              </Link>
            ) : null}
             {isLoggedIn && !isCustomer ? (
              <Link
                to="/additem"
                className="hover:scale-105 hover:text-gray-700"
              >
                Add Items
              </Link>
            ) : null}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-4">
              <button
                onClick={handleLogout}
                className="hover:text-gray-700 border p-1 rounded-md lg:w-[100px] text-center hover:scale-90"
              >
                Logout
              </button>
              <div className="w-px h-5 bg-gray-500"></div>
              <a href="/" className="hover:text-gray-700">
                Book Table
              </a>
            </div>
          ) : (
            <div className="flex gap-x-4 items-center justify-center">
              <Link
                to="/login"
                className="hover:text-gray-700 border p-1 rounded-md lg:w-[100px] text-center hover:scale-90"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-700 border p-1 rounded-md lg:w-[100px] text-center hover:scale-90"
              >
                Sign Up
              </Link>
              <div className="w-px h-5 bg-gray-500"></div>
              <a href="/" className="hover:text-gray-700">
                Book Table
              </a>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <GiHamburgerMenu
            color="#fff"
            fontSize={27}
            onClick={() => setToggleMenu(!toggleMenu)}
          />
          {toggleMenu && (
            <div className="fixed top-0 left-0 w-full h-full bg-orange-100 bg-opacity-90 flex justify-center items-center z-50">
              <div className="text-black text-2xl">
                <MdOutlineRestaurantMenu
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={closeMenu}
                />
                <ul className="text-center space-y-4">
                  <li className="hover:scale-105">
                    <Link to="/" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li className="hover:scale-105">
                    <Link to="/menu" onClick={closeMenu}>
                      Menu
                    </Link>
                  </li>
                  <li className="hover:scale-105">
                    <Link to="/orders" onClick={closeMenu}>
                      Orders
                    </Link>
                  </li>
                  <li className="hover:scale-105">
                    <Link to="/contact-us" onClick={closeMenu}>
                      Contact
                    </Link>
                  </li>
                  {isLoggedIn && !isCustomer ? (
                    <li className="hover:scale-105">
                      <Link to="/vieworders" onClick={closeMenu}>
                        View Orders
                      </Link>
                    </li>
                  ) : null}
                  {isLoggedIn && !isCustomer ? (
                    <li className="hover:scale-105">
                      <Link to="/additem" onClick={closeMenu}>
                        Add New Item
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
