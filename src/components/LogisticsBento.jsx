import React from 'react';

export default function LogisticsBento({ island, p }) {
  if (!island.logistics?.journey && !island.logistics?.route) return null;

  const journey = island.logistics?.journey || {};
  const routeText = island.logistics?.route || '';

  // Helper parsers
  const parseV1 = (text) => {
    if (!text) return [{ city: 'Vasteland', country: '' }];
    return text.split(/\s+of\s+/).map(part => {
      const match = part.match(/^(.*?)\s*(?:\((.*?)\))?$/);
      let city = match ? match[1].trim() : part.trim();
      let country = match && match[2] ? match[2].trim() : '';
      city = city.replace(/[.,;:]$/, '');
      return { city, country };
    });
  };

  const formatDataWithBold = (text) => {
    if (!text) return null;
    text = text.replace(/\.$/, '');
    const match = text.match(/^([~<]?\s*\d+.*?(?:uur|dagen|dag|weken|week|km|kilometer|mijl|minuten))\s*(.*)$/i);
    if (match) {
      return <><span className="font-bold">{match[1]}</span> <span className="font-normal opacity-80">{match[2]}</span></>;
    }
    return <span className="font-bold">{text}</span>;
  };

  const cleanString = (text) => text ? text.replace(/\.$/, '') : '';

  return (
    <div className="w-full mt-12 mb-16">
      <h3 className="text-3xl font-black uppercase tracking-widest mb-8 flex items-center gap-4" style={{ color: p.accent }}>
        <span className="w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0" style={{ borderColor: p.accent, backgroundColor: `${p.accent}20` }}>
          <i className="fa-solid fa-route text-xl"></i>
        </span>
        Hoe kom je er?
      </h3>
      
      {island.logistics?.journey ? (
        <div 
          className="flex flex-col lg:flex-row w-full border-4 rounded-[40px] overflow-hidden shadow-2xl relative group transition-transform duration-700 hover:-translate-y-1" 
          style={{ borderColor: p.accent, backgroundColor: p.card }}
        >
          {/* Background Map Icon */}
          <i className="fa-regular fa-map absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></i>

          {/* Block 1: Vertrek */}
          <div className="flex-1 p-8 md:p-10 flex flex-col text-left border-b-4 lg:border-b-0 lg:border-r-4 relative z-10" style={{ borderColor: p.accent }}>
            <span className="text-xs font-black uppercase tracking-widest mb-6 opacity-60 flex items-center gap-2" style={{ color: p.accent }}>
              <i className="fa-solid fa-plane-departure"></i> Vertrekpunt
            </span>
            <div className="flex flex-col gap-6">
              {parseV1(journey.vanaf).map((loc, i) => (
                <div key={i} className="flex flex-col bg-white/40 p-5 rounded-3xl border-2 shadow-sm" style={{ borderColor: `${p.accent}30` }}>
                  <span className="text-xl font-black leading-tight" style={{ color: p.accent }}>{loc.city}</span>
                  {loc.country && <span className="text-sm font-bold uppercase tracking-wider opacity-60 mt-1" style={{ color: p.accent }}>{loc.country}</span>}
                </div>
              ))}
            </div>
          </div>
          
          {/* Block 2: Transport */}
          <div className="flex-[2] p-8 md:p-10 flex flex-col text-left border-b-4 lg:border-b-0 lg:border-r-4 relative z-10" style={{ borderColor: p.accent }}>
            <span className="text-xs font-black uppercase tracking-widest mb-6 opacity-60 flex items-center gap-2" style={{ color: p.accent }}>
              <i className="fa-solid fa-ferry"></i> De Reis
            </span>
            <div className="flex flex-col h-full justify-between gap-8">
              <div>
                <p className="text-2xl md:text-3xl font-black leading-tight mb-4" style={{ color: p.accent }}>{cleanString(journey.vervoer)}</p>
                {journey.tussenstops && (
                  <p className="text-base md:text-lg font-medium leading-relaxed opacity-80" style={{ color: p.accent }}>
                    <i className="fa-solid fa-anchor mr-2"></i> {cleanString(journey.tussenstops)}
                  </p>
                )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2" style={{ borderColor: `${p.accent}30` }}>
                {journey.reistijd && (
                  <div className="bg-white/40 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                    <i className="fa-regular fa-clock text-2xl mb-1 opacity-70" style={{ color: p.accent }}></i>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest" style={{ color: p.accent }}>Reistijd</span>
                    <span className="text-lg" style={{ color: p.accent }}>{formatDataWithBold(journey.reistijd)}</span>
                  </div>
                )}
                {journey.afstand && (
                  <div className="bg-white/40 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                    <i className="fa-solid fa-ruler-horizontal text-2xl mb-1 opacity-70" style={{ color: p.accent }}></i>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest" style={{ color: p.accent }}>Afstand</span>
                    <span className="text-lg" style={{ color: p.accent }}>{formatDataWithBold(journey.afstand)}</span>
                  </div>
                )}
                {journey.permitRequired && (
                  <div className="bg-white/40 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                    <i className="fa-solid fa-file-signature text-2xl mb-1 opacity-70" style={{ color: p.accent }}></i>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest" style={{ color: p.accent }}>Vergunning</span>
                    <span className="text-lg font-black" style={{ color: p.accent }}>Vereist</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Block 3: Aankomst */}
          <div className="flex-1 p-8 md:p-10 flex flex-col text-left justify-between relative z-10" style={{ backgroundColor: p.accent, color: p.bg }}>
            <span className="text-xs font-black uppercase tracking-widest mb-6 opacity-70 flex items-center gap-2">
              <i className="fa-solid fa-location-dot"></i> Bestemming
            </span>
            <div className="mt-auto">
              <i className="fa-solid fa-map-location-dot text-6xl mb-6 opacity-90 drop-shadow-lg"></i>
              <h4 className="text-3xl md:text-4xl font-black leading-tight tracking-wide drop-shadow-md">{island.name}</h4>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="p-8 rounded-[40px] border-4 bg-white/60 backdrop-blur-md shadow-xl" style={{ borderColor: p.accent }}>
          <p className="text-xl font-medium leading-relaxed" style={{ color: p.accent }}>{cleanString(routeText)}</p>
        </div>
      )}
    </div>
  );
}
