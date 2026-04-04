import React from 'react';
import './RotatePrompt.css';

function RotatePrompt() {
  return (
    <div className="rotate-overlay" aria-label="Please rotate your device">
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
