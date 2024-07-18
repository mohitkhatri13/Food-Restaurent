import React from "react";
import  headerpic  from "../../assets/headerpic.avif";
import { Link } from "react-router-dom";

const Logo = ({ customCss, hideName = false }) => {
  return (
    <Link
      to={"/"}
      className={`max-w-max ${customCss}`}
    >
      <div className="flex gap-1.5 items-center">
        <div className="w-12">
          <img
            src={headerpic}
            alt=" logo"
            className="h-[50px]"
          />
        </div>
        {!hideName && <h1 className="font-bold text-xl">Greedy-Guts</h1>}
      </div>
    </Link>
  );
};

export default Logo;