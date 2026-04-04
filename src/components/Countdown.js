import React, { useState, useEffect } from 'react';
import './Countdown.css';

function Countdown({ onDone }) {
  const [count, setCount] = useState(3);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCount(prev => prev - 1);
      setAnimKey(prev => prev + 1);
    }, 900);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="countdown-overlay">
      <div key={animKey} className={`countdown-number ${count === 0 ? 'countdown-go' : ''}`}>
        {count === 0 ? '🔥' : count}
      </div>
    </div>
  );
}

export default Countdown;
