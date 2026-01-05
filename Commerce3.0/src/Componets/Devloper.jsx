import React from 'react';
import LiquidEther from '../components/LiquidEther';
import TrueFocus from '@/components/TrueFocus';
import { TypeAnimation } from 'react-type-animation';

function Devloper() {
  return (
    <div className="relative w-screen min-h-screen bg-black overflow-hidden">

      {/* BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* OVERLAY FOR BETTER READABILITY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-8 lg:px-20 gap-10">

        {/* LEFT: Animated Developer Info */}
        <div
          className="w-full lg:w-1/2
                     backdrop-blur-2xl bg-white/10
                     rounded-3xl p-6 sm:p-8 lg:p-10
                     shadow-2xl text-center lg:text-left"
        >
          {/* Title */}
          <div className="mb-4 text-amber-100">
            <TrueFocus
              sentence="Developer Info"
              manualMode={false}
              blurAmount={4}
              borderColor="violet"
              animationDuration={1.5}
              pauseBetweenAnimations={1}
            />
          </div>

          {/* Animated Taglines */}
          <TypeAnimation
            sequence={[
              'Hey, Welcome to my Project',
              1500,
              'Building modern, scalable web applications',
              1500,
              'Forging Success, Enduring Value',
              1500,
              'Click, Cart & Celebrate',
              1500,
            ]}
            speed={30}
            wrapper="p"
            repeat={Infinity}
            className="mt-4 text-base sm:text-lg lg:text-xl font-semibold text-amber-100 leading-relaxed"
          />
        </div>

        {/* RIGHT: Profile Card */}
        <div
          className="w-full lg:w-1/2
                     backdrop-blur-2xl bg-white/10
                     border border-white/20
                     rounded-3xl p-6 sm:p-8 lg:p-10
                     shadow-2xl flex flex-col items-center gap-4"
        >
          {/* Profile Image */}
          <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-amber-200">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Name & Tagline */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100">
              Satish Kumar Gupta
            </h2>
            <h3 className="text-sm sm:text-base text-gray-300 italic mt-1">
              Aspiring Full-Stack Developer
            </h3>
          </div>

          {/* Optional CTA */}
          <button className="mt-4 px-6 py-2 rounded-full bg-violet-600 hover:bg-violet-700 transition text-white font-semibold">
            View Portfolio
          </button>
        </div>

      </div>
    </div>
  );
}

export default Devloper;
