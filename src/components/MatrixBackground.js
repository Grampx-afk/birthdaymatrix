import React, { useEffect, useRef } from 'react';
import './MatrixBackground.css';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789☆★♠♣♥♦@#%&*';
const NAME_CHARS = 'ZENITH';

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let cols, drops, charTypes;

    const FONT_SIZE = 15;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / (FONT_SIZE + 2));
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
      // for each column, randomly decide if it occasionally shows a ZENITH char
      charTypes = Array.from({ length: cols }, () => Math.random() < 0.15);
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 0, 26, 0.13)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        let ch;
        const isNameCol = charTypes[i] && Math.random() > 0.6;
        if (isNameCol) {
          ch = NAME_CHARS[Math.floor(Math.random() * NAME_CHARS.length)];
        } else {
          ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        const r = Math.random();
        if (isNameCol) {
          // ZENITH chars glow brighter
          ctx.fillStyle = '#ff4444';
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 10;
        } else if (r > 0.93) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 8;
        } else if (r > 0.5) {
          ctx.fillStyle = '#ff2222';
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 5;
        } else {
          ctx.fillStyle = '#880000';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(ch, i * (FONT_SIZE + 2), drops[i] * FONT_SIZE);
        ctx.shadowBlur = 0;

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    const handleResize = () => { init(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

export default MatrixBackground;
