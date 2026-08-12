import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function Theme1Card({ island, p, onReadMore }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(island?.id);
  if (!island) return null;

  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-[90vw] md:max-w-[1200px] mx-auto items-stretch font-['Outfit'] transition-all duration-700 flex-1 md:flex-none md:h-[600px]`}>
      
      {/* Map/Visual Area */}
      <div 
        className={`w-full md:w-1/2 relative rounded-[40px] overflow-hidden border-4 transition-all duration-700 flex-shrink-0 cursor-pointer group shadow-2xl z-10 flex flex-1 min-h-[200px] md:h-full`}
        style={{ borderColor: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
        onClick={() => onReadMore(island)}
      >
        <img src={island.media?.images?.heroDesktop} alt={island.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div 
          className="absolute top-6 left-6 md:top-8 md:left-8 px-5 py-3 md:px-7 md:py-4 rounded-full border-2 font-black flex items-center gap-2 transition-colors duration-500 shadow-lg text-sm md:text-base"
          style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
        >
          <i className="fa-solid fa-location-dot"></i> {island.location?.lat.toFixed(2)}, {island.location?.lng.toFixed(2)}
        </div>
        <div 
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
        >
          <span className="bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-xl md:text-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">Bekijk Details <i className="fa-solid fa-arrow-right ml-2"></i></span>
        </div>
      </div>

      {/* Info Card */}
      <div 
        className={`w-full md:w-1/2 rounded-[40px] p-6 md:p-12 relative transition-all duration-700 border-4 flex flex-col justify-between shrink-0 h-auto md:h-full`}
        style={{ backgroundColor: p.card, color: p.accent, boxShadow: `10px 10px 0px ${p.accent}`, borderColor: p.accent }}
      >
        
        <div>
          <div className="flex justify-between items-start gap-4 z-20 relative">
            <div className="flex-1 min-w-0 pr-16 md:pr-0">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border-2 text-xs md:text-sm font-black uppercase tracking-widest bg-white shadow-sm truncate max-w-[140px] md:max-w-[240px]" style={{ borderColor: p.accent }} title={island.region}>{island.region}</span>
                <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border-2 text-xs md:text-sm font-black uppercase tracking-widest bg-white shadow-sm" style={{ borderColor: p.accent }}>Eiland</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(island.id); }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center bg-white shadow-sm hover:scale-110 transition-transform"
                  style={{ borderColor: p.accent }}
                >
                  <i className={`fa-heart md:text-lg ${isFavorite(island.id) ? 'fa-solid text-red-500' : 'fa-regular'}`}></i>
                </button>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-[4rem] font-black mb-3 md:mb-5 uppercase tracking-tighter drop-shadow-sm leading-tight break-words hyphens-auto line-clamp-2">{island.name}</h1>
            </div>
            
            {/* Flag - Absolute on mobile to prevent layout shifts, static on desktop */}
            <div className="w-16 h-16 md:w-24 md:h-24 absolute top-0 right-0 md:static shrink-0 bg-white rounded-full border-4 overflow-hidden shadow-xl flex items-center justify-center z-20" style={{ borderColor: p.accent }}>
              <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="Flag" className="w-full h-full object-cover" />
            </div>
          </div>

          <p className="text-xl lg:text-3xl font-bold mb-4 md:mb-8 opacity-90 border-b-4 pb-4 md:pb-6" style={{ borderColor: p.accent }}>
            {island.country}
          </p>

          <div className="hidden md:flex gap-4 lg:gap-8 mb-6 md:mb-8 w-full">
            <div className="flex-1 p-4 lg:p-6 rounded-2xl md:rounded-3xl border-2 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: p.accent }}>
              <p className="text-xs lg:text-base font-black opacity-70 uppercase tracking-widest mb-1 md:mb-2">Inwoners</p>
              <p className="text-lg lg:text-4xl font-black break-words hyphens-auto">{island.stats?.population === 0 ? 'Onbewoond' : island.stats?.population.toLocaleString('nl-NL')}</p>
            </div>
            <div className="flex-1 p-4 lg:p-6 rounded-2xl md:rounded-3xl border-2 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: p.accent }}>
              <p className="text-xs lg:text-base font-black opacity-70 uppercase tracking-widest mb-1 md:mb-2">Afstand</p>
              <p className="text-xl lg:text-4xl font-black">{island.stats?.distanceToMainlandKm.toLocaleString('nl-NL')} <span className="text-base">km</span></p>
            </div>
          </div>

        </div>

        <div className="p-5 lg:p-8 rounded-3xl transition-all duration-500 cursor-pointer hover:scale-[1.02] shadow-xl mt-auto shrink-0" 
             style={{ backgroundColor: p.accent, color: p.card }}
             onClick={() => onReadMore(island)}>
          <div className="flex justify-between items-center mb-2 md:mb-3">
            <h3 className="font-black text-xs md:text-sm lg:text-base uppercase tracking-widest" style={{ color: p.bg }}>Start Verkenning</h3>
            <i className="fa-solid fa-arrow-right md:text-xl" style={{ color: p.bg }}></i>
          </div>
          <p className="text-sm md:text-base lg:text-lg font-medium opacity-90 line-clamp-2 md:line-clamp-3 leading-relaxed">{island.story?.description}</p>
        </div>
      </div>
    </div>
  );
}
