"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TossProps {
  name1: string;
  name2: string;
}

export default function TossAnimation({ name1, name2 }: TossProps) {
    // State to keep track of the result and flipping animation
  const [result, setResult] = useState<string | null>(null);
  const [flipping, setFlipping] = useState(false);

  const handleToss = () => {
    // start flipping animation
    setFlipping(true);
    setResult(null); // Reset result to null for the animation
    
    setTimeout(() => {
      setResult(Math.random() < 0.5 ? name1 : name2);
      setFlipping(false);
    }, 2000); // Animation duration
  };
  useEffect(() => {
    handleToss();
    }, []); // Run once on mount

  return (
    <div className="flex flex-col items-center justify-center  space-y-6">
        {!result && <h1 className="text-3xl font-bold text-center">Tossing...</h1>}
      <motion.div
        animate={{ rotateY: flipping ? 1080 : 0 }}
        transition={{ duration: 2, ease: "linear" }}
        className="w-40 h-40 flex items-center justify-center font-bold bg-slate-600 text-white text-xl rounded-full shadow-lg"
      >
        {flipping ? "Flipping..." : result?.toLocaleUpperCase() || "?"}
      </motion.div>
      {
        result && (
            <div className="text-2xl font-semibold text-green-600">
                {result} Wins!
            </div>
            )
      }

      {result && <button
        onClick={handleToss}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Toss Again
      </button>}
    </div>
  );
}
