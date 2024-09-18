import React, { useEffect, useState } from 'react';
import '../NotFound.css';

const NotFound = () => {
  const [color, setColor] = useState(0);

  // Use useEffect to cycle through the RGB spectrum faster
  useEffect(() => {
    const interval = setInterval(() => {
      setColor(prev => (prev + 5) % 360); // Increment color more to make the transition faster
    }, 50); // Reduce this number for faster changes

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="not-found-container">
      <h1 style={{ color: `hsl(${color}, 100%, 50%)` }}>
        Page not found:<br />This artwork doesn't exist
      </h1>
    </div>
  );
};

export default NotFound;
