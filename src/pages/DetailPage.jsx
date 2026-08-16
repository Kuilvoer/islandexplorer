import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import WikipediaOverview from '../components/WikipediaOverview';
import FloraFaunaBento from '../components/FloraFaunaBento';
import CultureBento from '../components/CultureBento';
import LogisticsBento from '../components/LogisticsBento';
import { formatBoldText } from '../utils/formatText';

export default function DetailPage({ island, p, onBack }) {
    if (!island) return null;

  return (
    <div className={`w-full max-w-6xl mx-auto pb-16 px-4 font-['Outfit'] fade-in transition-all duration-700`}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-6 px-8 py-3 rounded-full border-4 font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Terug naar overzicht
      </button>

      {/* Hero Section */}
      <div className="flex flex-col mb-12 z-10">
        <div 
          className={`relative w-full h-[30vh] md:h-[50vh] rounded-[40px] overflow-hidden border-4 mb-6`}
          style={{ borderColor: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
        >
          <img src={island.media?.images?.heroDesktop || `https://flagcdn.com/w320/${island.media?.countryCode}.png`} className="w-full h-full object-cover" />
        </div>
        
        <div 
          className="w-full px-6 md:px-10 py-6 md:py-8 rounded-[40px] border-4 shadow-xl relative"
          style={{ backgroundColor: `${p.card}dd`, borderColor: p.accent }}
        >
          <div className="flex items-center gap-4 mb-2">
            <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} className="w-8 h-8 rounded-full border-2" style={{ borderColor: p.accent }} />
            {island.name !== island.country && (
              <span className="font-bold text-sm md:text-base uppercase tracking-widest" style={{ color: p.accent }}>{island.country}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg break-words hyphens-auto" style={{ color: p.accent }}>{island.name}</h1>
          {island.logistics?.tags && island.logistics.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {island.logistics.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border-2 text-[10px] font-black uppercase tracking-widest bg-white/60 backdrop-blur-sm shadow-sm" style={{ borderColor: p.accent, color: p.accent }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Text & Story */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          <WikipediaOverview islandName={island.name} p={p} />

          <FloraFaunaBento text={island.story?.floraFauna} p={p} />
          
          <CultureBento island={island} p={p} />

          {island.hazards && island.hazards.length > 0 && (
            <div 
              className="p-6 md:p-10 rounded-[40px] border-4 shadow-xl"
              style={{ backgroundColor: '#ffebee', borderColor: '#c62828', color: '#c62828' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <i className="fa-solid fa-triangle-exclamation text-3xl shrink-0"></i>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest break-words hyphens-auto">Gevaren / Waarschuwingen</h2>
              </div>
              <ul className="text-lg font-medium leading-relaxed opacity-90 flex flex-col gap-4">
                {island.hazards.map((hazard, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="font-black mt-1 shrink-0"><i className="fa-solid fa-skull-crossbones"></i></span>
                    <span>{hazard}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right: Sidebar Stats */}
        <div className="flex flex-col gap-8">
          
          <div 
            className={`p-6 md:p-8 rounded-[40px] border-4`}
            style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
          >
            <h3 className="text-lg md:text-xl font-black mb-8 border-b-4 pb-4 uppercase tracking-widest break-words hyphens-auto" style={{ borderColor: p.accent }}>Feiten & Cijfers</h3>
            
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Locatie</span>
              <p className="text-2xl font-black">{island.location?.lat.toFixed(2)}, {island.location?.lng.toFixed(2)}</p>
            </div>
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Inwoners</span>
              <p className="text-2xl font-black">{island.stats?.population === 0 ? 'Onbewoond' : island.stats?.population.toLocaleString('nl-NL')}</p>
            </div>
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Afstand tot vasteland</span>
              <p className="text-2xl font-black">{island.stats?.distanceToMainlandKm?.toLocaleString('nl-NL')} km</p>
            </div>
            {island.stats?.areaSqKm && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Oppervlakte</span>
                <p className="text-2xl font-black">{island.stats.areaSqKm.toLocaleString('nl-NL')} km²</p>
              </div>
            )}
            {island.stats?.highestPointMeters && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Hoogste Punt</span>
                <p className="text-2xl font-black">{island.stats.highestPointMeters.toLocaleString('nl-NL')} m</p>
              </div>
            )}
            {island.economyAndCulture?.currencyCode && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Valuta</span>
                <p className="text-2xl font-black">{island.economyAndCulture.currencyCode}</p>
              </div>
            )}
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Regio</span>
              <p className="text-2xl font-black">{island.region}</p>
            </div>
          </div>

          <div 
            className={`p-8 rounded-[40px] border-4`}
            style={{ backgroundColor: p.bg, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
          >
            <h3 className="text-xl font-black mb-6 uppercase tracking-widest">Actueel Weer</h3>
            <WeatherWidget coordinates={island.location} p={p} />
          </div>

        </div>

      </div>

      {/* Logistics Reality Check */}
      <LogisticsBento island={island} p={p} />
      
      <div className="h-32"></div>

    </div>
  );
}
