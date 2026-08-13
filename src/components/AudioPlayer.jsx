import React, { useState, useEffect } from 'react';

const audioTracks = {
  tropical: import.meta.env.BASE_URL + 'audio/tropical.mp3',
  arctic: import.meta.env.BASE_URL + 'audio/arctic.wav',
  desert: import.meta.env.BASE_URL + 'audio/desert.mp3',
  jungle: import.meta.env.BASE_URL + 'audio/jungle.mp3',
  volcanic: import.meta.env.BASE_URL + 'audio/volcanic.mp3',
};

// Global state
let globalPlayers = null;
let globalIsPlaying = false;
let globalActiveTheme = null;
let fadeIntervals = {};
const listeners = new Set();

function initGlobalPlayers() {
  if (globalPlayers) return;
  globalPlayers = {};
  Object.keys(audioTracks).forEach(theme => {
    const audio = new Audio(audioTracks[theme]);
    audio.loop = true;
    audio.volume = 0;
    globalPlayers[theme] = audio;
  });
}

const notifyListeners = () => {
  listeners.forEach(fn => fn(globalIsPlaying));
};

export const toggleGlobalPlay = () => {
  if (!globalPlayers) initGlobalPlayers();
  
  const theme = globalActiveTheme || 'tropical';
  const audio = globalPlayers[theme];
  
  if (globalIsPlaying) {
    Object.values(globalPlayers).forEach(a => {
      clearInterval(fadeIntervals[a.src]); 
      a.pause();
    });
  } else {
    if (audio) {
      audio.volume = theme === 'volcanic' ? 0.9 : 1.0;
      audio.play().catch(e => console.log("Audio play blocked", e));
    }
  }
  
  globalIsPlaying = !globalIsPlaying;
  notifyListeners();
};

export const setGlobalTheme = (newTheme) => {
  if (!globalPlayers) initGlobalPlayers();
  const desiredTheme = audioTracks[newTheme] ? newTheme : 'tropical';
  
  if (globalActiveTheme !== desiredTheme) {
    if (globalIsPlaying) {
      const oldTheme = globalActiveTheme;
      const oldAudio = oldTheme ? globalPlayers[oldTheme] : null;
      const newAudio = globalPlayers[desiredTheme];

      // Fade out old
      if (oldAudio && oldAudio.volume > 0) {
        clearInterval(fadeIntervals[oldTheme]);
        fadeIntervals[oldTheme] = setInterval(() => {
          let newVol = oldAudio.volume - 0.1;
          if (newVol <= 0.05) {
            oldAudio.volume = 0;
            oldAudio.pause();
            clearInterval(fadeIntervals[oldTheme]);
          } else {
            oldAudio.volume = newVol;
          }
        }, 100);
      }

      // Fade in new
      if (newAudio) {
        clearInterval(fadeIntervals[desiredTheme]);
        if (newAudio.readyState === 0) newAudio.load();
        newAudio.play().catch(e => console.log("Audio play blocked", e));
        
        fadeIntervals[desiredTheme] = setInterval(() => {
          let newVol = newAudio.volume + 0.1;
          const maxVol = desiredTheme === 'volcanic' ? 0.9 : 1.0;
          if (newVol >= maxVol - 0.05) {
            newAudio.volume = maxVol;
            clearInterval(fadeIntervals[desiredTheme]);
          } else {
            newAudio.volume = newVol;
          }
        }, 100);
      }
    }
    globalActiveTheme = desiredTheme;
  }
};

export default function AudioPlayer({ themeType, p, renderCustom }) {
  const [isPlaying, setIsPlaying] = useState(globalIsPlaying);

  useEffect(() => {
    initGlobalPlayers();
    const handleStateChange = (playing) => setIsPlaying(playing);
    listeners.add(handleStateChange);
    return () => listeners.delete(handleStateChange);
  }, []);

  useEffect(() => {
    setGlobalTheme(themeType);
  }, [themeType]);

  if (renderCustom) {
    return renderCustom({ isPlaying, togglePlay: toggleGlobalPlay });
  }

  return (
    <button 
      onClick={toggleGlobalPlay}
      className="w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 hover:scale-110 transition-transform bg-white/90 backdrop-blur-sm"
      style={{ borderColor: p.accent, color: p.accent }}
      title={isPlaying ? "Pauzeer Sfeer Audio" : "Speel Sfeer Audio"}
    >
      <i className={`fa-solid ${isPlaying ? 'fa-volume-high' : 'fa-volume-xmark'} text-xl`}></i>
    </button>
  );
}
