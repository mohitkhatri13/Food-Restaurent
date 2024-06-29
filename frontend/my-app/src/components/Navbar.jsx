import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import image1 from "../assets/headerpic.avif"
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="bg-orange-600 text-white px-4 py-3 md:px-8 md:py-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Replace with your logo */}
        <div className="mr-4">
            <Link to="/">
          <img className='h-10' src={image1} alt="app__logo" />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-4">
          <Link to="/" className="hover:scale-105 hover:text-gray-700"> Home </Link>
          <Link to="/menu" className="hover:scale-105 hover:text-gray-700"> Menu </Link>
          <Link to="orders" className="hover:scale-105 hover:text-gray-700"> Orders </Link>
          <Link to="contact-us" className="hover:scale-105 hover:text-gray-700"> Contact-us </Link>
        </ul>
      </div>

      {/* Login and Book Table section */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="hover:text-gray-700 border p-1 rounded-md lg:w-[100px] text-center hover:scale-90">Log In </Link>
        <Link to="/signup" className="hover:text-gray-700 border p-1 rounded-md lg:w-[100px] text-center hover:scale-90">Sign up </Link>
        <div className="w-px h-5 bg-gray-500"></div>
        <a href="/" className="hover:text-gray-700">Book Table</a>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="fixed right-[0px] p-10 rounded-md bg-orange-600 bg-opacity-90 flex justify-center items-center">
            <div className="text-white text-2xl">
              <MdOutlineRestaurantMenu className="absolute top-4 right-4 cursor-pointer" onClick={() => setToggleMenu(false)} />
              <ul className="text-center space-y-4">
                <li className="hover:scale-105"><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
                <li className="hover:scale-105"><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
                <li className="hover:scale-105"><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
                <li className="hover:scale-105"><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
                <li className="hover:scale-105"><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
