import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, linkto, onClick, icon }) => {
  return (
    <Link to={linkto}>
      <div
        className={`items-center justify-center text-[16px] py-2 px-4 max-w-max inline-block rounded-md font-bold
          bg-yellow-400 text-black  hover:bg-orange-400
          hover:scale-95 transition-all duration-200 h-10 `}
        onClick={onClick}
      >
        {children}
        {icon && <span className="inline-block ml-2">{icon}</span>}
      </div>
    </Link>
  );
}

export default Button;
