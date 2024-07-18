import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-b-4 flex flex-col justify-center items-center border-orange-400 bg-yellow-50 pt-12 mt-24">
      {/* Footer top */}
      <div className="w-11/12">
        <div className="  box flex flex-col md:flex-row justify-between border-b-2 border-orange-200 pb-10 gap-8 mb-2">
          {/* Footer top left */}
          <div className="basis-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-start">
            <Logo />
            <p>
              Your culinary haven for sharing and savoring. Explore recipes,
              restaurants, and engaging discussions. Join us now and indulge in
              flavor-filled experiences!
            </p>
          </div>
          {/* Footer top right */}
          <div className="flex gap-10 basis-1/2 justify-center md:justify-end flex-wrap md:flex-nowrap">
            {/* Footer links */}
            <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
              <li className="text-gray-700 text-sm text-bold mb-2">Product</li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Home</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Specialities</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Dishes</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Contact</Link>
              </motion.li>
            </ul>
            <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
              <li className="text-gray-700 text-sm text-bold mb-2">Company</li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>About</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Careers</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>News</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Newsletter</Link>
              </motion.li>
            </ul>
            <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
              <li className="text-gray-700 text-sm text-bold mb-2">Legal</li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Terms</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Privacy</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Licenses</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link>Cookies</Link>
              </motion.li>
            </ul>
          </div>
        </div>
        {/* Footer bottom */}
        <div className="mb-2 box flex justify-center sm:justify-between flex-col sm:flex-row w-full gap-4">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Greedy-Guts. All rights reserved
          </p>
          {/* Footer social links */}
          <ul className="flex justify-center gap-6 text-xl">
            <motion.li
              className="border  p-1 rounded-full hover:text-gray-500"
              whileHover={{ y: -4 }}
            >
              <a href="https://github.com/" aria-label="Follow me on github">
                <AiFillGithub />
              </a>
            </motion.li>
            <motion.li
              className="border border-orange-400 p-1 rounded-full hover:text-blue-400"
              whileHover={{ y: -4 }}
            >
              <a href="https://twitter.com/" aria-label="Follow me on twitter">
                <AiFillTwitterCircle />
              </a>
            </motion.li>
            <motion.li
              className="border border-orange-400 p-1 rounded-full hover:text-blue-600"
              whileHover={{ y: -4 }}
            >
              <a href="https://www.linkedin.com/in/" aria-label="Follow me on linkedin">
                <AiFillLinkedin />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;