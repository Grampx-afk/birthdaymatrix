import React, { useEffect, useRef } from 'react';
import './Animation.css';

function Animation({ messages, currentIndex, phase }) {
  const particleContainerRef = useRef(null);

  useEffect(() => {
    if (phase === 'in') spawnParticles();
  }, [currentIndex, phase]);

  const spawnParticles = () => {
    const container = particleContainerRef.current;
    if (!container) return;
    const colors = ['#ff1a1a', '#cc0000', '#ff6666', '#ffffff', '#ff4444'];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (20 + Math.random() * 60) + 'vw';
      p.style.top = (20 + Math.random() * 60) + 'vh';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * 360;
      const dist = 80 + Math.random() * 140;
      p.style.setProperty('--tx', Math.cos(angle * Math.PI / 180) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle * Math.PI / 180) * dist + 'px');
      container.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  };

  const msg = messages[currentIndex];
  const lines = msg.text.split('\n');

  const sizeClass = {
    xl: 'text-xl',
    lg: 'text-lg',
    md: 'text-md',
  }[msg.size] || 'text-lg';

  const fontClass = msg.font === 'script' ? 'font-script' : 'font-matrix';

  return (
    <div className="animation-stage">
      <div ref={particleContainerRef} className="particle-container" />

      <div className={`text-block ${phase === 'in' ? 'phase-in' : ''} ${phase === 'out' ? 'phase-out' : ''}`}>
        {lines.map((line, i) => (
          <p
            key={i}
            className={`anim-text ${sizeClass} ${fontClass}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {line}
          </p>
        ))}
      </div>


    </div>
  );
}

export default Animation;
