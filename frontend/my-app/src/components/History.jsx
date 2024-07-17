import React from 'react'
import restvideo from "../assets/restvideo.mp4"
import thumbnail from "../assets/thumbnail2.jpg"
const History = () => {
  return (
    <section  className=" py-12  flex items-center justify-center ">
      <div className="   flex  flex-col lg:flex-row w-10/12 items-center justify-center ">
        <div className="lg:w-1/2">
          <div className="relative video-box lg:ml-10">
            <video
              className="rounded-lg h-[480px] "
              width="270"
              height="480"
              preload="none"
              controls
              muted
              loop
              autoPlay
              poster={thumbnail}
              src={restvideo}
            ></video>
            <div className="play-btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <div className="px-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Discover <span className="font-bold">OUR HISTORY</span></h3>
            <p className="text-gray-600 mb-4">
            Discover Greedy-Guts in India, where culinary excellence meets a world of flavors. Indulge in our diverse menu featuring pastas, risottos, and savory raclette. Our chef invites you to savor a gastronomic adventure, promising an unforgettable dining experience. Join us and embark on a journey through delicious dishes and delightful ambiance.
            </p>
            <p className="text-gray-600 mb-4 italic">WHAT you will taste at our place :</p>
            <ul className="text-gray-600 mb-4">
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.125-5.074L6.925 9.3a.625.625 0 1 1 1.026-.698l1.31 2.088 3.054-.755a.625.625 0 1 1 .288 1.22l-3.482.857zm-1.115-4.327a.625.625 0 1 1-.88-.876l3.482-4.272a.625.625 0 1 1 .968.79l-3.482 4.272zm2.68-.783a.625.625 0 0 1 .926.829L9.448 13.11 8.5 11.37a.625.625 0 1 1 1-1.058l1.22 1.93 1.243-.307a.625.625 0 0 1 .57.342.625.625 0 0 1-.342.57l-1.243.307 2.765 4.245a.625.625 0 1 1-.99.77l-3.054-.755a.625.625 0 0 1-.31-.838l1.31-2.088-3.054-.755a.625.625 0 0 1-.288-1.22l3.482-.857z" clip-rule="evenodd"></path></svg>
                Drinks.
              </li>
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.125-5.074L6.925 9.3a.625.625 0 1 1 1.026-.698l1.31 2.088 3.054-.755a.625.625 0 1 1 .288 1.22l-3.482.857zm-1.115-4.327a.625.625 0 1 1-.88-.876l3.482-4.272a.625.625 0 1 1 .968.79l-3.482 4.272zm2.68-.783a.625.625 0 0 1 .926.829L9.448 13.11 8.5 11.37a.625.625 0 1 1 1-1.058l1.22 1.93 1.243-.307a.625.625 0 0 1 .57.342.625.625 0 0 1-.342.57l-1.243.307 2.765 4.245a.625.625 0 1 1-.99.77l-3.054-.755a.625.625 0 0 1-.31-.838l1.31-2.088-3.054-.755a.625.625 0 0 1-.288-1.22l3.482-.857z" clip-rule="evenodd"></path></svg>
                Dinner.
              </li>
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.125-5.074L6.925 9.3a.625.625 0 1 1 1.026-.698l1.31 2.088 3.054-.755a.625.625 0 1 1 .288 1.22l-3.482.857zm-1.115-4.327a.625.625 0 1 1-.88-.876l3.482-4.272a.625.625 0 1 1 .968.79l-3.482 4.272zm2.68-.783a.625.625 0 0 1 .926.829L9.448 13.11 8.5 11.37a.625.625 0 1 1 1-1.058l1.22 1.93 1.243-.307a.625.625 0 0 1 .57.342.625.625 0 0 1-.342.57l-1.243.307 2.765 4.245a.625.625 0 1 1-.99.77l-3.054-.755a.625.625 0 0 1-.31-.838l1.31-2.088-3.054-.755a.625.625 0 0 1-.288-1.22l3.482-.857z" clip-rule="evenodd"></path></svg>
                 Lunch.
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.125-5.074L6.925 9.3a.625.625 0 1 1 1.026-.698l1.31 2.088 3.054-.755a.625.625 0 1 1 .288 1.22l-3.482.857zm-1.115-4.327a.625.625 0 1 1-.88-.876l3.482-4.272a.625.625 0 1 1 .968.79l-3.482 4.272zm2.68-.783a.625.625 0 0 1 .926.829L9.448 13.11 8.5 11.37a.625.625 0 1 1 1-1.058l1.22 1.93 1.243-.307a.625.625 0 0 1 .57.342.625.625 0 0 1-.342.57l-1.243.307 2.765 4.245a.625.625 0 1 1-.99.77l-3.054-.755a.625.625 0 0 1-.31-.838l1.31-2.088-3.054-.755a.625.625 0 0 1-.288-1.22l3.482-.857z" clip-rule="evenodd"></path></svg>
                Appetizers.
              </li>
            </ul>
            <p className="text-gray-600">
              Here we are with a new look but also new flavors for you to discover.
            </p>
          </div>
        </div>
      </div>
   
  </section>
  )
}

export default History