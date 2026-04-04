import React, { useState } from 'react';
import './LoveNote.css';

const photoPages = [
  {
    photo: '/photo1.jpg',
    quote: "That smile of yours doesn't just light up a room — it rewires my entire world. I think about it on my worst days and somehow everything becomes easier to carry.",
    caption: 'My sunshine 🌞',
  },
  {
    photo: '/photo2.jpg',
    quote: 'There is a quiet kind of beauty in the way you exist — the way you carry yourself, the way you think, the way you make people feel seen without even trying. You are rare, Zenith.',
    caption: 'My queen 👑',
  },
  {
    photo: '/photo3.jpg',
    quote: "Even then — even before I knew you — God was already crafting something extraordinary. This little girl grew into my whole heart. Look how far you've come, my love. 18 years of pure magic.",
    caption: 'Where it all began 🌹',
  },
];

const heartEmojis = ['💕', '🌸', '💖', '🌸', '💕'];

function LoveNote() {
  const [page, setPage] = useState(0); // 0 = intro, 1-3 = photos
  const [anim, setAnim] = useState('enter');
  const [touchStart, setTouchStart] = useState(null);

  const totalPages = 1 + photoPages.length; // 4 total

  const goTo = (next, dir) => {
    if (next < 0 || next >= totalPages) return;
    setAnim('exit-' + dir);
    setTimeout(() => {
      setPage(next);
      setAnim('enter');
    }, 380);
  };

  const handleTapLeft  = () => goTo(page - 1, 'right');
  const handleTapRight = () => goTo(page + 1, 'left');

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd   = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(page + 1, 'left') : goTo(page - 1, 'right');
    }
    setTouchStart(null);
  };

  const isPhoto = page > 0;
  const photoData = isPhoto ? photoPages[page - 1] : null;

  return (
    <div
      className="note-overlay"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tap zones */}
      {page > 0 && <div className="book-tap-left"  onClick={handleTapLeft} />}
      {page < totalPages - 1 && <div className="book-tap-right" onClick={handleTapRight} />}

      <div className={`open-book ${anim}`}>

        {page === 0 ? (
          /* -- PAGE 0: Original intro note -- */
          <>
            <div className="book-page left">
              <div className="page-hearts">
                {[{top:'12%',left:'10%',delay:'0s'},{top:'75%',left:'75%',delay:'1.3s'},{top:'55%',left:'8%',delay:'0.7s'},{top:'25%',left:'78%',delay:'2s'}].map((h,i)=>(
                  <span key={i} className="note-heart" style={{...h,animationDelay:h.delay}}>💕</span>
                ))}
              </div>
              <div className="note-char">🐣</div>
              <div className="note-text">
                <p className="note-greeting">Dear Zenith,</p>
                <p className="note-body">
                  On this special day,<br />
                  I want you to feel every<br />
                  bit of love I carry for you —<br />
                  every single day. 🌹
                </p>
              </div>
            </div>

            <div className="book-spine" />

            <div className="book-page right">
              <div className="page-hearts">
                {[{top:'10%',right:'10%',delay:'0.5s'},{top:'70%',left:'8%',delay:'1.6s'},{top:'40%',right:'6%',delay:'1s'},{top:'80%',right:'18%',delay:'0.2s'}].map((h,i)=>(
                  <span key={i} className="note-heart" style={{...h,animationDelay:h.delay}}>🌸</span>
                ))}
              </div>
              <div className="note-text">
                <p className="note-body">
                  You light up every room<br />
                  you walk into. You are<br />
                  kind, beautiful, and so<br />
                  incredibly special to me. 💖
                </p>
                <p className="note-body">
                  Happy 18th Birthday,<br />
                  my queen. 👑
                </p>
                <p className="note-sig">— Darasimi ❤️</p>
              </div>
              {/* Hint to tap */}
              <div className="page-hint">tap → for more 💕</div>
            </div>
          </>
        ) : (
          /* -- PAGES 1-3: Photo + quote -- */
          <>
            {/* Left: quote */}
            <div className="book-page left photo-quote-left">
              <div className="page-hearts">
                {heartEmojis.map((h,i)=>(
                  <span key={i} className="note-heart" style={{
                    top: `${15 + i*17}%`,
                    left: i%2===0 ? '6%' : '80%',
                    animationDelay: `${i*0.4}s`
                  }}>{h}</span>
                ))}
              </div>
              <div className="photo-quote-inner">
                <div className="pq-mark">"</div>
                <p className="pq-text">{photoData.quote}</p>
                <div className="pq-line" />
                <span className="pq-caption">{photoData.caption}</span>
              </div>
            </div>

            <div className="book-spine" />

            {/* Right: photo */}
            <div className="book-page right photo-img-right">
              <div className="photo-book-frame">
                <img src={photoData.photo} alt="Zenith" className="photo-book-img" />
                <div className="photo-book-fade" />
              </div>
              {page === totalPages - 1 && (
                <div className="page-hint last-hint">— Darasimi ❤️</div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Page dots */}
      <div className="book-dots">
        {Array.from({length: totalPages}).map((_,i) => (
          <span
            key={i}
            className={`bdot ${i === page ? 'bdot-active' : ''}`}
            onClick={() => goTo(i, i > page ? 'left' : 'right')}
          />
        ))}
      </div>
    </div>
  );
}

export default LoveNote;
