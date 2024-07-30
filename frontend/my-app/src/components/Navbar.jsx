import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/headerpic.avif";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import { checkrole } from "../slice/staffcustomerSlice";
import { BsCart2 } from "react-icons/bs";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Button from "./common/Button";


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCustomer = useSelector((state) => state.role.isCustomer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isCustomer) {
      dispatch(checkrole(false));
    }
    toast.success("Logout successfully");
    dispatch(logout());
    navigate("/");
  };

  const closeMenu = () => {
    setToggleMenu(false);
  };

  return (
    <header className="shadow-md sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20">
      <div className="flex justify-between items-center py-3 w-11/12 mx-auto">
        <Link to="/" className="flex justify-center items-center">
          <img className="h-11" src={image1} alt="app__logo" />
          <p className=" text-xl font-bold">Greedy-Guts</p>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            <li className="group relative">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative font-semibold ${
                    isActive ? "text-yellow-400" : "text-gray-600"
                  }`
                }
              >
                Home
              </NavLink>
              <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            </li>

            <li className="group relative">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `relative font-semibold ${
                    isActive ? "text-yellow-400" : "text-gray-600"
                  }`
                }
              >
                Menu
              </NavLink>
              <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            </li>
            {isLoggedIn && isCustomer && (
              <li className="flex items-center gap-x-1 group relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  Cart
                </NavLink>
                <BsCart2 />
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
            )}
            {isLoggedIn && isCustomer && (
              <li className="group relative">
                <NavLink
                  to="/myorders"
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  My Orders
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
            )}
            {isLoggedIn && !isCustomer && (
              <li className="group relative">
                <NavLink
                  to="/vieworders"
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  View Orders
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
            )}

            {isLoggedIn && !isCustomer && (
              <li className="group relative">
                <NavLink
                  to="/additem"
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  Add Items
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
            )}

            <li className="group relative">
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `relative font-semibold ${
                    isActive ? "text-yellow-400" : "text-gray-600"
                  }`
                }
              >
                Contact Us
              </NavLink>
              <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            </li>
          </ul>
        </nav>

        {isLoggedIn ? (
          <div className="hidden md:block">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="hidden md:flex gap-x-4 items-center justify-center">
            <Button linkto={"/login"} onClick={closeMenu}>
              Login
            </Button>
            <Button linkto={"/signup"} onClick={closeMenu}>
              Signup
            </Button>
          </div>
        )}

        {!toggleMenu && (
          <GiHamburgerMenu
            className="block md:hidden text-xl cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
        {toggleMenu && (
          <div className="fixed top-0 right-0 w-[33%] h-[100vh] backdrop-blur-2xl bg-[#fffefc8c]  flex flex-col justify-center items-center z-50  md:hidden ">
            <MdOutlineRestaurantMenu
              className="absolute top-4 left-2 text-xl cursor-pointer"
              onClick={closeMenu}
            />
            <ul className="text-black text-xl text-center space-y-4 absolute top-10 flex flex-col  justify-center items-center">
              <li className="group relative">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  Home
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
              <li className="group relative">
                <NavLink
                  to="/menu"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  Menu
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>
              {isLoggedIn && isCustomer && (
                <li className="flex items-center gap-x-1 group relative">
                  <NavLink
                    to="/cart"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `relative font-semibold ${
                        isActive ? "text-yellow-400" : "text-gray-600"
                      }`
                    }
                  >
                    Cart
                  </NavLink>
                  <BsCart2 />
                  <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </li>
              )}
              {isLoggedIn && isCustomer && (
                <li className="group relative">
                  <NavLink
                    to="/myorders"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `relative font-semibold ${
                        isActive ? "text-yellow-400" : "text-gray-600"
                      }`
                    }
                  >
                    My Orders
                  </NavLink>
                  <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </li>
              )}
              {isLoggedIn && !isCustomer && (
                <li className="group relative">
                  <NavLink
                    to="/vieworders"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `relative font-semibold ${
                        isActive ? "text-yellow-400" : "text-gray-600"
                      }`
                    }
                  >
                    View Orders
                  </NavLink>
                  <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </li>
              )}

              {isLoggedIn && !isCustomer && (
                <li className="group relative">
                  <NavLink
                    to="/additem"
                    className={({ isActive }) =>
                      `relative font-semibold ${
                        isActive ? "text-yellow-400" : "text-gray-600"
                      }`
                    }
                  >
                    Add Items
                  </NavLink>
                  <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </li>
              )}
              <li className="group relative">
                <NavLink
                  to="/contactus"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `relative font-semibold ${
                      isActive ? "text-yellow-400" : "text-gray-600"
                    }`
                  }
                >
                  Contact Us
                </NavLink>
                <div className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </li>

              {isLoggedIn ? (
                <div>
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <div className=" flex  flex-col gap-x-4 items-center">
                  <div className="mb-4">
                    <Button linkto={"/login"} onClick={closeMenu}>
                      Login
                    </Button>
                  </div>
                  <Button linkto={"/signup"} onClick={closeMenu}>
                    Signup
                  </Button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
