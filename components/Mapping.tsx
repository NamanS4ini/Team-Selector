"use client";      
import { useState, useEffect } from "react";


export default function DelayedMapping({names, timeInterval} : { names: string[]; timeInterval?: number }) {
  // State to keep track of which names are visible
  const [visibleNames, setVisibleNames] = useState<string[]>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= names.length) return; // Stop when all names are displayed
  
    const interval = setInterval(() => {
      setVisibleNames((prev) => [...prev, names[index]]);
      setIndex((prevIndex) => prevIndex + 1); // Move to next index
    }, timeInterval || 500);
  
    return () => clearInterval(interval);
  }, [index, timeInterval]); // Depend on `index`

  return (
    <div>
      {visibleNames.map((name, idx) => (
        <div key={idx}>{name}{idx===0 && !timeInterval ? " (c)" : ""}</div>
      ))}
    </div>
  );
}
