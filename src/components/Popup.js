import React, { useEffect, useState } from 'react';
import './Popup.css';

function Popup({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`popup-overlay ${visible ? 'visible' : ''}`}>
      <div className="popup-box">
        <div className="popup-glow" />
        <div className="popup-icon">🎉</div>
        <h1 className="popup-title">Birthday<br />Surprise</h1>
        <p className="popup-sub">A special message awaits you...</p>
        <button className="popup-btn" onClick={onStart}>
          <span className="btn-inner">▶ &nbsp;START</span>
        </button>
        <div className="popup-hearts">
          {['❤️','💖','❤️','💖','❤️'].map((h, i) => (
            <span key={i} className="ph" style={{ animationDelay: `${i * 0.3}s` }}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popup;
