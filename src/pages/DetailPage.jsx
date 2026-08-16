import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import WikipediaOverview from '../components/WikipediaOverview';
import FloraFaunaBento from '../components/FloraFaunaBento';
import CultureBento from '../components/CultureBento';
import LogisticsBento from '../components/LogisticsBento';
import { formatBoldText } from '../utils/formatText';

export default function DetailPage({ island, p, onBack }) {
    if (!island) return null;

  const [activeTab, setActiveTab] = React.useState(0);

  const categories = [
    { id: 0, title: 'Geografie & Map', icon: 'fa-map' },
    { id: 1, title: 'Media & Video', icon: 'fa-video' },
    { id: 2, title: 'Logistiek & Transport', icon: 'fa-ship' },
    { id: 3, title: 'Oceaan & Getijden', icon: 'fa-water' },
    { id: 4, title: 'Weer & Klimaat', icon: 'fa-cloud-sun' },
    { id: 5, title: 'Satelliet & Sensing', icon: 'fa-satellite' },
    { id: 6, title: 'Geologie & Seismologie', icon: 'fa-mountain' },
    { id: 7, title: 'Flora & Fauna', icon: 'fa-leaf' },
    { id: 8, title: 'Astronomie & Tijd', icon: 'fa-moon' },
    { id: 9, title: 'Encyclopedie & Cultuur', icon: 'fa-book-open' }
  ];

  return (
    <div className={`w-full max-w-7xl mx-auto pb-16 px-4 font-['Outfit'] fade-in transition-all duration-700`}>
      
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
          className={`relative w-full h-[30vh] md:h-[40vh] rounded-[40px] overflow-hidden border-4 mb-6`}
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
        </div>
      </div>

      {/* 10 Categories Menu (Tabs) */}
      <div className="w-full overflow-x-auto no-scrollbar mb-12">
        <div className="flex gap-4 pb-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-4 rounded-3xl border-4 font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                activeTab === cat.id ? 'scale-105 shadow-[6px_6px_0px_0px]' : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              style={{ 
                backgroundColor: activeTab === cat.id ? p.accent : p.card, 
                borderColor: p.accent, 
                color: activeTab === cat.id ? p.bg : p.accent,
                boxShadowColor: p.accent
              }}
            >
              <i className={`fa-solid ${cat.icon} text-lg`}></i> {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[50vh]">
        {/* Tab 0: Geografie */}
        {activeTab === 0 && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className={`p-8 rounded-[40px] border-4`} style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}>
                <h3 className="text-2xl font-black mb-8 border-b-4 pb-4 uppercase tracking-widest" style={{ borderColor: p.accent }}>Feiten & Cijfers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div><span className="text-xs uppercase font-black opacity-60">Locatie</span><p className="text-2xl font-black">{island.location?.lat.toFixed(2)}, {island.location?.lng.toFixed(2)}</p></div>
                  <div><span className="text-xs uppercase font-black opacity-60">Inwoners</span><p className="text-2xl font-black">{island.stats?.population === 0 ? 'Onbewoond' : island.stats?.population.toLocaleString('nl-NL')}</p></div>
                  <div><span className="text-xs uppercase font-black opacity-60">Oppervlakte</span><p className="text-2xl font-black">{island.stats?.areaSqKm?.toLocaleString('nl-NL')} km²</p></div>
                  <div><span className="text-xs uppercase font-black opacity-60">Hoogste Punt</span><p className="text-2xl font-black">{island.stats?.highestPointMeters?.toLocaleString('nl-NL')} m</p></div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-8 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
              <i className="fa-solid fa-map-location-dot text-6xl mb-4"></i>
              <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
              <p className="font-medium">Ruimte voor Mapbox / Leaflet / OSM integratie.</p>
            </div>
          </div>
        )}

        {/* Tab 1: Media & Video */}
        {activeTab === 1 && (
          <div className="p-12 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
            <i className="fa-solid fa-video text-6xl mb-4"></i>
            <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
            <p className="font-medium">Ruimte voor YouTube / Vimeo / Unsplash Media API.</p>
          </div>
        )}

        {/* Tab 2: Logistiek & Transport */}
        {activeTab === 2 && (
          <div className="animate-fade-in-up">
            <LogisticsBento island={island} p={p} />
          </div>
        )}

        {/* Tab 3: Oceaan & Getijden */}
        {activeTab === 3 && (
          <div className="p-12 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
            <i className="fa-solid fa-water text-6xl mb-4"></i>
            <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
            <p className="font-medium">Ruimte voor NOAA Tides / Storm Glass Marine API.</p>
          </div>
        )}

        {/* Tab 4: Weer & Klimaat */}
        {activeTab === 4 && (
          <div className="flex justify-center animate-fade-in-up">
            <div className="w-full max-w-xl">
              <WeatherWidget coordinates={island.location} p={p} />
            </div>
          </div>
        )}

        {/* Tab 5: Satelliet & Sensing */}
        {activeTab === 5 && (
          <div className="p-12 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
            <i className="fa-solid fa-satellite text-6xl mb-4"></i>
            <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
            <p className="font-medium">Ruimte voor NASA EONET / Sentinel Hub API.</p>
          </div>
        )}

        {/* Tab 6: Geologie & Seismologie */}
        {activeTab === 6 && (
          <div className="flex flex-col gap-8">
            {island.hazards && island.hazards.length > 0 && (
              <div className="p-8 rounded-[40px] border-4 shadow-xl" style={{ backgroundColor: '#ffebee', borderColor: '#c62828', color: '#c62828' }}>
                <div className="flex items-center gap-4 mb-6">
                  <i className="fa-solid fa-triangle-exclamation text-3xl"></i>
                  <h2 className="text-2xl font-black uppercase tracking-widest">Gevaren (Lokaal)</h2>
                </div>
                <ul className="text-lg font-medium opacity-90 flex flex-col gap-4">
                  {island.hazards.map((h, i) => <li key={i}><i className="fa-solid fa-skull-crossbones mr-3"></i>{h}</li>)}
                </ul>
              </div>
            )}
            <div className="p-12 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
              <i className="fa-solid fa-mountain-sun text-6xl mb-4"></i>
              <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
              <p className="font-medium">Ruimte voor USGS Earthquake / Volcano API.</p>
            </div>
          </div>
        )}

        {/* Tab 7: Flora & Fauna */}
        {activeTab === 7 && (
          <div className="animate-fade-in-up">
            <FloraFaunaBento text={island.story?.floraFauna} p={p} />
          </div>
        )}

        {/* Tab 8: Astronomie & Tijd */}
        {activeTab === 8 && (
          <div className="p-12 rounded-[40px] border-4 border-dashed opacity-50 flex items-center justify-center flex-col text-center" style={{ borderColor: p.accent, color: p.accent }}>
            <i className="fa-solid fa-moon text-6xl mb-4"></i>
            <h2 className="text-2xl font-black uppercase">API Placeholder</h2>
            <p className="font-medium">Ruimte voor Sunrise-Sunset / Space Weather API.</p>
          </div>
        )}

        {/* Tab 9: Encyclopedie & Cultuur */}
        {activeTab === 9 && (
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <WikipediaOverview islandName={island.name} p={p} />
            <CultureBento island={island} p={p} />
          </div>
        )}
      </div>

      <div className="h-32"></div>

    </div>
  );
}
