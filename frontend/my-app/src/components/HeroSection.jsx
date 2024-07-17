
import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import  Button  from "./common/Button";
import { Link } from "react-router-dom";
import heroimage from "../assets/slide-2.jpg"

const Hero = () => {
    return ( 
      <section className=" mb-5  h-[82vh] flex flex-col-reverse md:flex-row justify-center gap-x-4 mt-8">
        <div className=" lg:w-[40vw] w-[90vw] flex flex-col items-center md:items-start justify-center gap-4">
          <span className="text-orange-400 text-sm px-4 py-1 rounded-full border-2 border-orange-400 max-w-max">
            Feast. Share. Connect.
          </span>
          <h2 className="font-bold text-3xl md:text-5xl text-center md:text-start">
            Welcome to <span className="text-orange-400">Greedy-Guts</span>
          </h2>
          <p className="text-gray-600 text-center md:text-start">
          Delight in the harmony of taste and ambiance as you explore our diverse offerings. From farm-to-table freshness to expertly crafted dishes, each visit promises a journey of culinary excellence.
          </p>
          
            <Button  icon = { <GiKnifeFork  />} >
              Explore Recipes 
            </Button>
           
            
        </div>
        <div
          className=" lg:w-[40vw] w-[90vw] bg-no-repeat bg-cover bg-center rounded-xl m-4 shadow-xl shadow-yellow-500"
          style={{ backgroundImage: `url(${heroimage})`, height: '76vh' }}
        ></div>
      </section>
    );
  };
  
  export default Hero;
  

// export default Hero;