import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules"; // Corrected import path
import MenuCard from "./MenuCard";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "../style.css";
const ItemSwiper = ({ Items }) => {
  return (
    <div className="w-10/12 h-[400px] mb-10">
      {Items.length ? (
        <Swiper
          modules={[FreeMode, Pagination, Navigation]}
          freeMode={true}
            // pagination={{ clickable: true }}
        //   slidesPerView={3} 
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="mySwiper"
          loop
          breakpoints={{
            // when window width is >= 768px (medium screens)
            1200: {
              slidesPerView: 3,
            },
            800: {
                slidesPerView: 2,
              },
            // when window width is >= 320px (mobile screens)
            320: {
              slidesPerView: 1,
            },
          }}
          
        >
          {Items.map((menuItem) => (
            <SwiperSlide key={menuItem._id}>
              <MenuCard
                id={menuItem._id}
                name={menuItem.name}
                description={menuItem.description}
                price={menuItem.price}
                image={menuItem.image || ""}
              />
              
            </SwiperSlide>
            
          ))}
           <div className="swiper-button-next"></div>
           <div className="swiper-button-prev"></div>
        </Swiper>
      ) : (
        <p>No Items Found</p>
      )}
    </div>
  );
};

export default ItemSwiper;
