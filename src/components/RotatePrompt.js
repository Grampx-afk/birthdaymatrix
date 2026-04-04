import React, { useState, useEffect } from 'react';
import './RotatePrompt.css';

function RotatePrompt() {
  const [visible, setVisible] = useState(true);   // mounted?
  const [fading, setFading]   = useState(false);  // playing exit anim?

  useEffect(() => {
    // After 3 s start the fade-out
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    // After 3 s + 600 ms (animation done) fully remove
    const hideTimer = setTimeout(() => setVisible(false), 3600);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`rotate-overlay${fading ? ' rotate-fadeout' : ''}`} aria-label="Please rotate your device">
      <div className="rotate-scanline" />

      <div className="rotate-icon-wrap">
        <div className="rotate-ring rotate-ring-outer" />
        <div className="rotate-ring" />
        <span className="rotate-phone-icon" role="img" aria-label="rotate phone">📱</span>
      </div>

      <p className="rotate-title">Rotate Your Phone</p>
      <p className="rotate-sub">Turn to landscape for the full experience</p>

      <div className="rotate-hearts">
        {['💖', '🌸', '❤️', '🌸', '💖'].map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
    </div>
  );
}

export default RotatePrompt;
