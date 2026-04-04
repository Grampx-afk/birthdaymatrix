import React, { useEffect, useRef } from 'react';
import './StarBackground.css';

const NUM_STARS   = 220;
const NUM_BIG     = 12;   // extra-glowy accent stars
const HEART_COUNT = 10;   // slow-drifting emoji hearts

function StarBackground() {
  const canvasRef  = useRef(null);
  const heartsRef  = useRef([]);

  /* ── build heart objects once ── */
  useEffect(() => {
    heartsRef.current = Array.from({ length: HEART_COUNT }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      size:  12 + Math.random() * 18,
      speed: 0.18 + Math.random() * 0.25,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: 0.25 + Math.random() * 0.35,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let stars = [];

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = Array.from({ length: NUM_STARS }, () => ({
        x:         Math.random() * canvas.width,
        y:         Math.random() * canvas.height,
        r:         Math.random() * 1.6 + 0.2,
        baseAlpha: Math.random() * 0.55 + 0.25,
        speed:     Math.random() * 0.018 + 0.004,
        phase:     Math.random() * Math.PI * 2,
        color:     pickStarColor(),
      }));

      // a handful of larger accent stars
      for (let i = 0; i < NUM_BIG; i++) {
        stars.push({
          x:         Math.random() * canvas.width,
          y:         Math.random() * canvas.height,
          r:         2.2 + Math.random() * 1.8,
          baseAlpha: 0.6 + Math.random() * 0.35,
          speed:     Math.random() * 0.012 + 0.003,
          phase:     Math.random() * Math.PI * 2,
          color:     '#ffcce8',
          big:       true,
        });
      }
    };

    const pickStarColor = () => {
      const roll = Math.random();
      if (roll > 0.82) return '#ffb3d9'; // pink
      if (roll > 0.65) return '#ffe4f5'; // soft pink-white
      if (roll > 0.45) return '#d4b8ff'; // lavender
      return '#ffffff';
    };

    const drawBackground = () => {
      // Deep romantic space — dark purple → near-black
      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.42, 0,
        canvas.width * 0.5, canvas.height * 0.5,  canvas.width * 0.85,
      );
      grad.addColorStop(0,   '#1e0535');
      grad.addColorStop(0.4, '#0f0120');
      grad.addColorStop(1,   '#04000e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle nebula glow near centre
      const neb = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.45, 0,
        canvas.width * 0.5, canvas.height * 0.45, canvas.width * 0.38,
      );
      neb.addColorStop(0,   'rgba(160, 30, 100, 0.18)');
      neb.addColorStop(0.5, 'rgba(90,  10, 80,  0.08)');
      neb.addColorStop(1,   'transparent');
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawStars = (t) => {
      stars.forEach(s => {
        const a = s.baseAlpha * (0.45 + 0.55 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        if (s.big) {
          ctx.shadowColor = s.color;
          ctx.shadowBlur  = s.r * 5;
        }
        ctx.fill();
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
      });
    };

    let startTime = null;
    const draw = (ts) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      drawBackground();
      drawStars(t);

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="star-canvas" />

      {/* Floating emoji hearts layered on top of canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {heartsRef.current.map((h, i) => (
          <span
            key={i}
            style={{
              position:        'absolute',
              left:            h.x,
              top:             h.y,
              fontSize:        h.size,
              opacity:         h.alpha,
              animation:       `driftHeart ${7 + i * 0.6}s ease-in-out infinite`,
              animationDelay:  `${i * 0.5}s`,
              userSelect:      'none',
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '🌸' : '✨'}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes driftHeart {
          0%,100% { transform: translateY(0px)   rotate(-4deg); opacity: 0.28; }
          50%      { transform: translateY(-18px) rotate(4deg);  opacity: 0.55; }
        }
      `}</style>
    </>
  );
}

export default StarBackground;
