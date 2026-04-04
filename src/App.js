import React, { useState, useEffect, useRef } from 'react';
import Popup from './components/Popup';
import Countdown from './components/Countdown';
import Animation from './components/Animation';
import MatrixBackground from './components/MatrixBackground';
import StarBackground from './components/StarBackground';
import LoveNote from './components/LoveNote';
import './App.css';

function useIsPortrait() {
  const check = () => window.innerWidth < window.innerHeight;
  const [isPortrait, setIsPortrait] = useState(check);

  useEffect(() => {
    const handler = () => {
      // Delay so browser finishes resizing after rotation
      setTimeout(() => setIsPortrait(check()), 150);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isPortrait;
}

function App() {
  const [stage, setStage] = useState('popup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const timeoutRef = useRef(null);
  const isPortrait = useIsPortrait();

  const messages = [
    { text: 'HAPPY',                   size: 'xl' },
    { text: 'BIRTHDAY',                size: 'xl' },
    { text: 'TO',                      size: 'xl' },
    { text: 'ZENITH 💖',               size: 'lg' },
    { text: 'ABISOLA MI',              size: 'lg' },
    { text: 'Sweet 18',                size: 'lg', font: 'script' },
    { text: 'MY QUEEN 👑',             size: 'lg' },
    { text: 'DARASIMI\nLOVES\nYOU ❤️', size: 'md' },
  ];

  useEffect(() => {
    if (stage !== 'animation') return;
    setPhase('in');
    timeoutRef.current = setTimeout(() => {
      setPhase('out');
      timeoutRef.current = setTimeout(() => {
        if (currentIndex >= messages.length - 1) {
          setStage('lovenote');
        } else {
          setCurrentIndex(prev => prev + 1);
          setPhase('in');
        }
      }, 600);
    }, 2200);
    return () => clearTimeout(timeoutRef.current);
  }, [stage, currentIndex]);

  const handleStart = () => setStage('countdown');
  const handleCountdownDone = () => {
    setCurrentIndex(0);
    setStage('animation');
  };

  const isLovenote = stage === 'lovenote';

  // Show rotate prompt whenever width < height (portrait)
  if (isPortrait) {
    return (
      <div className="rotate-prompt">
        <div className="rotate-icon">📱</div>
        <p className="rotate-text">Rotate your phone<br />to landscape mode 🌸</p>
        <p className="rotate-sub">This experience is best viewed sideways ✨</p>
      </div>
    );
  }

  return (
    <div className="app">
      {isLovenote ? <StarBackground /> : <MatrixBackground />}
      {!isLovenote && <div className="scanline" />}

      {stage === 'popup'     && <Popup onStart={handleStart} />}
      {stage === 'countdown' && <Countdown onDone={handleCountdownDone} />}
      {stage === 'animation' && (
        <Animation messages={messages} currentIndex={currentIndex} phase={phase} />
      )}
      {isLovenote && <LoveNote />}
    </div>
  );
}

export default App;
