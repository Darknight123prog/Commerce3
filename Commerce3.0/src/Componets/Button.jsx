import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";

const CHARS = "!@#$%^&*():{};|,.<>/?";

function Button({
  text = "Encrypt data",
  icon: Icon = FiLock,
  className = "",
  cyclesPerLetter = 2,
  shuffleTime = 50,
}) {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / cyclesPerLetter > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * cyclesPerLetter) stopScramble();
    }, shuffleTime);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`group relative overflow-hidden rounded-lg border border-neutral-500 
        bg-neutral-700 px-4 py-2 font-mono font-medium uppercase 
        text-neutral-300 transition-colors hover:text-indigo-300 ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        <Icon />
        <span>{displayText}</span>
      </div>

      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 scale-125 bg-gradient-to-t 
          from-indigo-400/0 via-indigo-400 to-indigo-400/0 
          opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
}

export default Button;
