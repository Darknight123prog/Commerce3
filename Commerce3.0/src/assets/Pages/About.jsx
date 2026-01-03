import CountUp from "react-countup";
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function About() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center">
      
      {/* Glowing light spots (scaled per screen) */}
      <div className="absolute top-1/4 left-1/4 w-52 h-52 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#4f46e5]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-[#8b5cf6]/25 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-[#ec4899]/20 rounded-full blur-2xl animate-pulse"></div>

      {/* Header Section */}
      <div className="w-full backdrop-blur-2xl bg-white rounded-b-[3rem] sm:rounded-b-[6rem] lg:rounded-b-[10rem] 
                      flex flex-col items-center py-4 sm:py-6 lg:py-10">
        <h2 className="text-xs sm:text-sm">About Us</h2>

        <img
          className="h-16 sm:h-20 lg:h-32 my-2"
          src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
          alt="Logo"
        />

        <h1 className="text-xs sm:text-sm md:text-lg">
          Forging Success, Enduring Value
        </h1>
        <h6 className="text-xs sm:text-sm">Presents</h6>
        <h1 className="text-xs sm:text-sm md:text-lg font-semibold">
          Commerce3.0
        </h1>
      </div>

      {/* Counters */}
      <div className="mt-10 sm:mt-12 px-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                        backdrop-blur-2xl bg-amber-50/60 rounded-3xl shadow-xl
                        py-4 px-6 w-full max-w-lg lg:max-w-2xl">
          
          <div className="text-center">
            <span className="text-sm sm:text-base lg:text-xl block">
              Products Listed
            </span>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              <CountUp end={1000} duration={4} separator="," />+
            </div>
          </div>

          <div className="text-center">
            <span className="text-sm sm:text-base lg:text-xl block">
              Brands
            </span>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              <CountUp end={508} duration={4} separator="," />+
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10
                      mt-10 px-4 sm:px-6 lg:px-20">

        {/* Animated Text */}
        <div className="w-full lg:w-1/2 text-amber-50 text-center lg:text-left">
          <TypeAnimation
            sequence={[
              '"Next-Gen Commerce, Today"',
              1000,
              '"Beyond Transactions, Towards Connections"',
              1000,
              '"Forging Success, Enduring Value"',
              1000,
              '"Click, Cart & Celebrate"',
              1000
            ]}
            wrapper="span"
            speed={20}
            className="text-lg sm:text-xl lg:text-2xl font-semibold"
            repeat={Infinity}
          />
        </div>

        {/* Static About Text */}
        <div className="w-full lg:w-1/2 text-amber-50
                        bg-black/20 backdrop-blur-3xl rounded-2xl
                        shadow-lg p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-2">
            About Our Site
          </h2>
          <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
            Commerce3.0 is your one-stop platform for premium fashion and lifestyle products.
            We bring together the best brands and curated collections to provide an immersive
            shopping experience. Our mission is to deliver quality, innovation, and convenience
            in every transaction. Explore our extensive catalog, enjoy exclusive discounts,
            and experience next-gen e-commerce today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
