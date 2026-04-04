import React, { useState, useEffect, useRef } from 'react';
import Popup from './components/Popup';
import Countdown from './components/Countdown';
import Animation from './components/Animation';
import MatrixBackground from './components/MatrixBackground';
import StarBackground from './components/StarBackground';
import LoveNote from './components/LoveNote';
import './App.css';

function useOrientation() {
  const getIsPortrait = () => {
    // Try screen.orientation API first (most reliable)
    if (window.screen && window.screen.orientation) {
      const type = window.screen.orientation.type;
      return type.includes('portrait');
    }
    // Fallback: compare dimensions
    return window.innerHeight > window.innerWidth;
  };

  const [isPortrait, setIsPortrait] = useState(getIsPortrait);

  useEffect(() => {
    const handler = () => {
      // Small delay to let browser finish rotating
      setTimeout(() => setIsPortrait(getIsPortrait()), 100);
    };

    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handler);
    }

    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handler);
      }
    };
  }, []);

  return isPortrait;
}

function App() {
  const [stage, setStage] = useState('popup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const timeoutRef = useRef(null);
  const isPortrait = useOrientation();

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

  // Only show rotate prompt on mobile (small screens) in portrait
  const isSmallScreen = Math.min(window.innerWidth, window.innerHeight) < 600;
  if (isPortrait && isSmallScreen) {
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
