"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function RotatingText({Players, setCaptains}: {Players:string[]; setCaptains: React.Dispatch<React.SetStateAction<string[]>>}) {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [finalIndices, setFinalIndices] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (finalIndices !== null) return; // Stop rotating when final indices are set

    //  Rotate the text every 150ms by setting index1 and index2 to the next index to show the next player every 150ms
    const interval = setInterval(() => {
      setIndex1((prev) => (prev + 1) % Players.length);
      setIndex2((prev) => {
        const next = (prev + 1) % Players.length;
        return next === index1 ? (next + 1) % Players.length : next; // Ensure no duplicates
      });
    }, 150); // Rotate every 150ms
    // Starts after waiting for 2 seconds
    setTimeout(() => {
      // Clears the recurring interval after 2 seconds to stop the rotation of player names
      clearInterval(interval);
      // Generates two unique indices and sets them as the final indices
      setFinalIndices(generateTwoUniqueIndices(Players.length));
    }, 2000); // Stop after 2 seconds

    return () => clearInterval(interval);
  }, [finalIndices, index1]);

  // Function to pick two unique random indices
  function generateTwoUniqueIndices(length: number): [number, number] {
    const first = Math.floor(Math.random() * length);
    let second;
    do {
      second = Math.floor(Math.random() * length);
    } while (second === first);
    setCaptains([Players[first], Players[second]])
    return [first, second];
  }

  return (
    <div className="flex flex-col items-center p-10  text-3xl font-bold gap-4">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={finalIndices ? finalIndices[0] : index1}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* If there is a finalIndices set i.e. the captains are selected then sets the text to that name or changes with index1 every 150ms */}
          {/* Displays the name of first Captain if finalIndices is set */}
          {Players[finalIndices ? finalIndices[0] : index1]}
        </motion.div>
      </AnimatePresence>
      {/* This is just the VS image */}
      <div>
        <img className='invert h-40' src="/versus.png" alt="" />
    </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={finalIndices ? finalIndices[1] : index2}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* If there is a finalIndices set i.e. the captains are selected then sets the text to that name or changes with index2 every 150ms */}
          {/* Displays the name of second Captain if finalIndices is set */}
          {Players[finalIndices ? finalIndices[1] : index2]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
