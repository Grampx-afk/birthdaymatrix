import React, { useState, useEffect, useRef } from 'react';
import './PhotoPages.css';

const pages = [
  {
    photo: '/photo1.jpg',
    quote: 'That smile of yours — it doesn't just light up a room, it rewires my entire world. I think about it on my worst days and somehow everything becomes easier to carry.',
    caption: 'My sunshine 🌞',
  },
  {
    photo: '/photo2.jpg',
    quote: 'There is a quiet kind of beauty in the way you exist — the way you carry yourself, the way you think, the way you make people feel seen without even trying. You are rare, Zenith.',
    caption: 'My queen 👑',
  },
  {
    photo: '/photo3.jpg',
    quote: 'Even then — even before I knew you — God was already crafting something extraordinary. This little girl grew into my whole heart. Look how far you've come, my love. 18 years of magic.',
    caption: 'Where it all began 🌹',
  },
];

function PhotoPages({ onDone }) {
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState('enter'); // enter | idle | exit
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);

  const goTo = (index, dir) => {
    if (index < 0 || index >= pages.length) return;
    setAnimState('exit-' + dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimState('enter');
    }, 450);
  };

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < pages.length - 1) goTo(current + 1, 'left');
      else if (diff < 0 && current > 0) goTo(current - 1, 'right');
    }
    setTouchStart(null);
  };

  const handleTapLeft = () => {
    if (current > 0) goTo(current - 1, 'right');
  };

  const handleTapRight = () => {
    if (current < pages.length - 1) goTo(current + 1, 'left');
    else if (onDone) onDone();
  };

  const page = pages[current];

  return (
    <div
      className="photo-pages"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tap zones */}
      <div className="tap-left" onClick={handleTapLeft} />
      <div className="tap-right" onClick={handleTapRight} />

      <div className={`photo-spread ${animState}`}>
        {/* Left — Quote */}
        <div className="quote-side">
          <div className="quote-inner">
            <div className="quote-mark">"</div>
            <p className="quote-text">{page.quote}</p>
            <div className="quote-line" />
            <span className="quote-caption">{page.caption}</span>
          </div>
        </div>

        {/* Right — Photo */}
        <div className="photo-side">
          <div className="photo-frame">
            <img src={page.photo} alt="Zenith" className="photo-img" />
            <div className="photo-glow" />
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="photo-dots">
        {pages.map((_, i) => (
          <span
            key={i}
            className={`pdot ${i === current ? 'pdot-active' : ''}`}
            onClick={() => goTo(i, i > current ? 'left' : 'right')}
          />
        ))}
        {current === pages.length - 1 && (
          <span className="swipe-hint">tap → to finish</span>
        )}
      </div>
    </div>
  );
}

export default PhotoPages;
