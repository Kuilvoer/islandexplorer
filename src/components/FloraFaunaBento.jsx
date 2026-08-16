import React from 'react';
import { formatBoldText } from '../utils/formatText';

export default function FloraFaunaBento({ text, p }) {
  if (!text) return null;

  // A list of generic nature icons to sprinkle around
  const natureIcons = [
    'fa-leaf', 
    'fa-feather', 
    'fa-fish', 
    'fa-bug', 
    'fa-seedling', 
    'fa-frog', 
    'fa-water', 
    'fa-tree'
  ];

  // Pick 3 random icons to display
  const selectedIcons = [...natureIcons].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div 
      className="p-6 md:p-10 rounded-[40px] border-4 shadow-xl relative overflow-hidden group transition-transform duration-700 hover:-translate-y-1"
      style={{ backgroundColor: p.accent, borderColor: p.accent, color: p.card }}
    >
      {/* Decorative background icons */}
      <i 
        className={`fa-solid ${selectedIcons[0]} absolute -bottom-4 -right-4 text-8xl opacity-10 rotate-12 transition-transform duration-1000 group-hover:rotate-45 group-hover:scale-110`}
      ></i>
      <i 
        className={`fa-solid ${selectedIcons[1]} absolute top-8 -left-8 text-6xl opacity-10 -rotate-12 transition-transform duration-1000 group-hover:-rotate-45 group-hover:scale-110`}
      ></i>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0" style={{ borderColor: p.card, backgroundColor: `${p.card}20` }}>
            <i className={`fa-solid ${selectedIcons[2]} text-xl`}></i>
          </div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest break-words hyphens-auto" style={{ color: p.bg }}>
            Natuurlijke Wonderen
          </h2>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/20">
          <p className="text-lg font-medium leading-relaxed opacity-95">
            {formatBoldText(text)}
          </p>
        </div>
      </div>
    </div>
  );
}
