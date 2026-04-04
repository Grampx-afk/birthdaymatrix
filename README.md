# 🎉 Happy Birthday Zenith

A matrix-style birthday animation website built with React.

## Project Structure

```
zenith-birthday/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Animation.js        # Text sequence animation component
│   │   ├── Animation.css
│   │   ├── MatrixBackground.js # Animated matrix rain canvas
│   │   ├── MatrixBackground.css
│   │   ├── Popup.js            # Start modal component
│   │   └── Popup.css
│   ├── App.js                  # Main logic & state management
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## How to Run

1. Make sure you have **Node.js** installed (v16+)
2. Open terminal in this folder
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Opens at `http://localhost:3000`

## How to Build for Production

```
npm run build
```
Then open `build/index.html` in any browser.

## Features
- Matrix rain with ZENITH scattered among characters
- 3-2-1 countdown before animation
- 8-message sequence with fade + scale animation
- Red glow effects
- Particle bursts on each message
- Progress dots
- Mobile responsive
