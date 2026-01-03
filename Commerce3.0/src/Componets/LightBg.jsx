import React from "react";

function LightBg() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Glowing light spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>

      {/* Your content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
       
      </div>
    </div>
  );
}

export default LightBg;
