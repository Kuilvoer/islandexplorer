import React from 'react';
import { formatBoldText } from '../utils/formatText';

export default function CultureBento({ island, p }) {
  const hasHistory = island.story?.history && island.story.history.length > 0;
  const hasConnectivity = !!island.economyAndCulture?.connectivity;
  const hasSouvenir = !!island.economyAndCulture?.souvenirTip;

  if (!hasHistory && !hasConnectivity && !hasSouvenir) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Timeline Section */}
      {hasHistory && (
        <div 
          className="p-6 md:p-10 rounded-[40px] border-4 shadow-xl relative overflow-hidden group transition-transform duration-700 hover:-translate-y-1"
          style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
        >
          {/* Decorative background */}
          <i className="fa-solid fa-hourglass-half absolute -right-10 -bottom-10 text-9xl opacity-5 rotate-12 transition-transform duration-1000 group-hover:-rotate-12 group-hover:scale-110"></i>

          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-black mb-8 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0" style={{ borderColor: p.accent, backgroundColor: p.bg }}>
                <i className="fa-solid fa-clock-rotate-left"></i>
              </span>
              Tijdlijn & Historie
            </h2>
            
            <div className="flex flex-col gap-8 relative pl-6">
              {/* Vertical line connecting the timeline dots */}
              <div className="absolute left-[7px] top-4 bottom-4 w-1 rounded-full opacity-20" style={{ backgroundColor: p.accent }}></div>
              
              {island.story.history.map((h, idx) => (
                <div key={idx} className="flex gap-6 items-start relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full border-4 z-10 shadow-sm" style={{ backgroundColor: p.card, borderColor: p.accent }}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 w-full">
                    <span className="font-black text-2xl md:text-3xl shrink-0 w-24 tracking-tighter" style={{ color: p.accent }}>
                      {h.year}
                    </span>
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border-2 shadow-sm flex-1" style={{ borderColor: `${p.accent}30` }}>
                      <p className="text-base font-medium opacity-90 leading-relaxed">
                        {formatBoldText(h.event)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Connectivity */}
        {hasConnectivity && (
          <div 
            className="p-6 md:p-8 rounded-[30px] border-4 shadow-xl relative overflow-hidden group transition-transform duration-700 hover:-translate-y-1"
            style={{ backgroundColor: p.bg, borderColor: p.accent, color: p.accent }}
          >
            <i className="fa-solid fa-wifi absolute -top-4 -right-4 text-7xl opacity-10 rotate-12 transition-transform duration-1000 group-hover:scale-125"></i>
            <h2 className="text-lg md:text-xl font-black mb-4 uppercase tracking-widest flex items-center gap-3">
              <i className="fa-solid fa-signal opacity-80"></i> Connectiviteit
            </h2>
            <p className="text-base font-medium leading-relaxed opacity-90">
              {formatBoldText(island.economyAndCulture.connectivity)}
            </p>
          </div>
        )}

        {/* Souvenir */}
        {hasSouvenir && (
          <div 
            className="p-6 md:p-8 rounded-[30px] border-4 shadow-xl relative overflow-hidden group transition-transform duration-700 hover:-translate-y-1"
            style={{ backgroundColor: p.accent, borderColor: p.accent, color: p.card }}
          >
            <i className="fa-solid fa-gift absolute -bottom-4 -right-4 text-7xl opacity-10 -rotate-12 transition-transform duration-1000 group-hover:scale-125"></i>
            <h2 className="text-lg md:text-xl font-black mb-4 uppercase tracking-widest flex items-center gap-3" style={{ color: p.bg }}>
              <i className="fa-solid fa-bag-shopping opacity-80"></i> Souvenir Tip
            </h2>
            <p className="text-base font-medium leading-relaxed opacity-95">
              {formatBoldText(island.economyAndCulture.souvenirTip)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
