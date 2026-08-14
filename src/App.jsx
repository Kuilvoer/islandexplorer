import React, { useState, useEffect, useRef } from 'react';
import { islandsData } from '@/data/islandsData';
import Theme1Card from '@/components/Theme1Card';
import DetailPage from '@/pages/DetailPage';
import GlobePage from '@/pages/GlobePage';
import MobileMenuVariations from '@/components/MobileMenuVariations';
import AudioPlayer from '@/components/AudioPlayer';
import { FavoritesProvider, useFavorites } from '@/context/FavoritesContext';
import { ListViewAtlas, ListViewSplit, ListViewAccordion, ListViewBento } from '@/components/ListViewVariations';

// Wrapper component to handle swipe gestures manually
const SwipeableMain = ({ children, isGlobeView, handleNext, handlePrev }) => {
  const touchStart = useRef(null);
  
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;
    
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    
    touchStart.current = null;
  };

  return (
    <main 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd} 
      className={`flex-1 w-full relative z-10 flex flex-col ${isGlobeView ? 'pointer-events-none' : ''}`}
    >
      <div className={`flex-1 w-full flex flex-col ${isGlobeView ? 'pointer-events-auto' : ''}`}>
        {children}
      </div>
    </main>
  );
};

export const palettes = {
  tropical: { id: 'tropical', name: 'Tropical', bg: '#00B4D8', card: '#F4F1DE', accent: '#03045E' },
  arctic: { id: 'arctic', name: 'Arctic', bg: '#E3F2FD', card: '#FFFFFF', accent: '#0D47A1' },
  desert: { id: 'desert', name: 'Desert', bg: '#FFB74D', card: '#FFF3E0', accent: '#E65100' },
  jungle: { id: 'jungle', name: 'Jungle', bg: '#2E7D32', card: '#E8F5E9', accent: '#004D40' },
  volcanic: { id: 'volcanic', name: 'Volcanic', bg: '#BDBDBD', card: '#ECEFF1', accent: '#3E2723' }
};

// We create an InnerApp to use the Favorites context
function InnerApp() {
  const [activeDetailIsland, setActiveDetailIsland] = useState(null);
  const [isGlobeView, setIsGlobeView] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card', 'list1', 'list2', 'list3', 'list4'
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when returning to homepage or switching islands
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeDetailIsland]);

  // Handle body scroll locking for homepage and globeview
  useEffect(() => {
    // Disable zoom for globe view
    if (isGlobeView) {
      document.body.classList.add('no-zoom');
    } else {
      document.body.classList.remove('no-zoom');
    }
    
    // Disable scroll for homepage/globe view
    if (isGlobeView || (!activeDetailIsland && viewMode === 'card')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isGlobeView, activeDetailIsland, viewMode]);
  
  // Preload all images on startup so they load instantly
  useEffect(() => {
    islandsData.forEach(island => {
      if (island.media?.images?.heroDesktop) {
        const img = new Image();
        img.src = island.media.images.heroDesktop;
      }
    });
  }, []);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filteredIslands = showFavoritesOnly 
    ? islandsData.filter(i => favorites.includes(i.id))
    : islandsData;
  
  const [activeIsland, setActiveIsland] = useState(filteredIslands[0] || islandsData[0]);

  // Make sure active island is always valid
  useEffect(() => {
    if (filteredIslands.length > 0 && !filteredIslands.find(i => i.id === activeIsland?.id)) {
      setActiveIsland(filteredIslands[0]);
    }
  }, [filteredIslands, activeIsland]);
  
  const currentThemeId = activeDetailIsland?.themeType || activeIsland?.themeType || 'tropical';
  const p = palettes[currentThemeId] || palettes['tropical'];

  const activeIndex = filteredIslands.findIndex(i => i.id === activeIsland?.id);
  const len = filteredIslands.length;
  
  const visibleIslands = [];
  if (len > 0) {
    for (let i = -2; i <= 2; i++) {
      let idx = (activeIndex + i) % len;
      if (idx < 0) idx += len;
      visibleIslands.push(filteredIslands[idx]);
    }
  }

  const handlePrev = () => {
    if (len === 0) return;
    let newIdx = (activeIndex - 1) % len;
    if (newIdx < 0) newIdx += len;
    setActiveIsland(filteredIslands[newIdx]);
  };

  const handleNext = () => {
    if (len === 0) return;
    let newIdx = (activeIndex + 1) % len;
    setActiveIsland(filteredIslands[newIdx]);
  };

  if (!islandsData || islandsData.length === 0) {
    return <div className="h-screen w-screen flex items-center justify-center text-2xl font-bold">Laden van Eilanden...</div>;
  }

  const isScrollLocked = isGlobeView || (!activeDetailIsland && viewMode === 'card');

  return (
    <div 
      className={`${isScrollLocked ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'} w-full transition-all duration-1000 font-['Outfit'] relative flex flex-col items-center`}
      style={{ backgroundColor: p.bg, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
    >
      <div className="w-full h-full flex flex-col flex-1 transition-transform duration-700 relative z-40">
      <style>{`
        /* Dynamic Scrollbar Styling (now applies to body) */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-track {
          background: ${p.card};
        }
        ::-webkit-scrollbar-thumb {
          background: ${p.accent};
          border-radius: 6px;
          border: 3px solid ${p.card};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${p.accent}dd;
        }
      `}</style>
      
      {isGlobeView && (
        <GlobePage 
          islands={filteredIslands} 
          p={p} 
          onSelectIsland={(island) => {
            setActiveIsland(island);
            setActiveDetailIsland(island);
            setIsGlobeView(false);
          }} 
          onClose={() => setIsGlobeView(false)} 
        />
      )}

      {/* Minimal Header (Footer on mobile) */}
      <header className={`w-full px-4 py-4 md:px-8 md:py-6 flex flex-col md:flex-row justify-between items-center z-[90] order-last md:order-first pointer-events-none transition-colors duration-700 ${activeDetailIsland ? 'fixed bottom-0 left-0 right-0 md:sticky md:top-0' : 'relative'} globe-header-zoom`}>
        <div 
          className="absolute inset-0 block md:hidden transition-colors duration-700 pointer-events-auto" 
          style={{ 
            backgroundColor: isGlobeView ? '#000000' : p.card, 
            borderTop: `4px solid ${isGlobeView ? '#00FF41' : p.accent}` 
          }}
        ></div>
        
        <div className="w-full md:w-auto flex justify-between items-center pointer-events-auto relative z-10">
          <div className="flex flex-col gap-1 shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl transition-colors duration-700 bg-white/90 backdrop-blur-sm shadow-xl md:shadow-none cursor-pointer" 
                   onClick={() => { setActiveDetailIsland(null); setIsGlobeView(false); setViewMode('card'); setShowFavoritesOnly(false); setIsMobileMenuOpen(false); }}
                   style={{ 
                     borderColor: isGlobeView ? '#00FF41' : p.accent, 
                     color: isGlobeView ? '#00FF41' : p.accent,
                     backgroundColor: isGlobeView ? '#000000' : 'rgba(255,255,255,0.9)'
                   }}>
                <i className="fa-solid fa-earth-oceania"></i>
              </div>
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter transition-colors duration-700 drop-shadow-md cursor-pointer" 
                  onClick={() => { setActiveDetailIsland(null); setIsGlobeView(false); setViewMode('card'); setShowFavoritesOnly(false); setIsMobileMenuOpen(false); }}
                  style={{ 
                    color: isGlobeView ? '#00FF41' : p.accent
                  }}>
                IslandExplorer
              </h1>
            </div>
          </div>

          <div className="flex gap-2">
            {(activeDetailIsland && !isGlobeView) && (
              <button 
                className="md:hidden w-12 h-12 flex justify-center items-center rounded-full border-4 backdrop-blur-sm shadow-xl text-xl hover:scale-110 transition-transform"
                style={{ 
                  borderColor: p.accent, 
                  color: p.accent,
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }}
                onClick={() => { setActiveDetailIsland(null); setIsGlobeView(false); }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}
            <button 
              className="md:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-full border-4 backdrop-blur-sm shadow-xl hover:scale-110 transition-transform"
              style={{ 
                borderColor: isGlobeView ? '#00FF41' : p.accent,
                backgroundColor: isGlobeView ? '#000000' : 'rgba(255,255,255,0.9)'
              }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <div className="w-5 h-0.5" style={{ backgroundColor: isGlobeView ? '#00FF41' : p.accent }}></div>
              <div className="w-5 h-0.5" style={{ backgroundColor: isGlobeView ? '#00FF41' : p.accent }}></div>
              <div className="w-5 h-0.5" style={{ backgroundColor: isGlobeView ? '#00FF41' : p.accent }}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Variations */}
        <MobileMenuVariations 
          variant="5"
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isGlobeView={isGlobeView}
          setIsGlobeView={setIsGlobeView}
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeDetailIsland={activeDetailIsland}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          p={p}
          currentThemeId={currentThemeId}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex shrink-0 flex-col md:flex-row gap-4 items-end md:items-center pointer-events-auto flex-wrap min-h-[56px] w-full md:w-auto">
           
           {/* Card / List Toggle */}
           <div className={`flex bg-white/90 backdrop-blur-sm rounded-full p-1 border-4 transition-opacity duration-300 ${(activeDetailIsland || isGlobeView) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ borderColor: p.accent }}>
             <button 
               onClick={() => setViewMode('card')}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${viewMode === 'card' ? 'bg-white' : 'hover:bg-white/20'}`}
               style={{ color: viewMode === 'card' ? p.accent : p.accent }}
               title="Kaart Weergave"
             >
               <i className="fa-solid fa-layer-group"></i>
             </button>
             <button 
               onClick={() => setViewMode('list2')}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${viewMode === 'list2' ? 'bg-white' : 'hover:bg-white/20'}`}
               style={{ color: viewMode === 'list2' ? p.accent : p.accent }}
               title="Lijst Weergave"
             >
               <i className="fa-solid fa-list"></i>
             </button>
           </div>

           {/* Favorites and Audio Row */}
           <div className="flex items-center gap-4">
             {/* Favorites Toggle / Like Button */}
             <button 
               onClick={() => {
                 if (activeDetailIsland) {
                   toggleFavorite(activeDetailIsland.id);
                 } else {
                   setShowFavoritesOnly(!showFavoritesOnly);
                 }
               }}
               className={`w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 transition-all backdrop-blur-sm ${
                 (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? 'bg-red-500 text-white border-red-500' : 'bg-white/90'
               } ${isGlobeView ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
               style={{ 
                 borderColor: (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? undefined : p.accent, 
                 color: (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? undefined : p.accent 
               }}
               title={activeDetailIsland ? (isFavorite(activeDetailIsland.id) ? "Verwijder uit Favorieten" : "Voeg toe aan Favorieten") : "Mijn Favorieten"}
             >
               <i className={`fa-heart text-xl ${(activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? 'fa-solid' : 'fa-regular'}`}></i>
             </button>

             <div className={`transition-opacity duration-300 ${isGlobeView ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
               <AudioPlayer themeType={currentThemeId} p={p} />
             </div>
           </div>

           {/* Globe View Button */}
           <button 
             onClick={() => setIsGlobeView(!isGlobeView)}
             className="px-6 py-3 rounded-full border-4 font-black uppercase tracking-widest text-sm hover:scale-105 transition-colors flex items-center gap-3 backdrop-blur-sm shadow-xl"
             style={{ 
               borderColor: isGlobeView ? '#00FF41' : p.accent, 
               color: isGlobeView ? '#00FF41' : p.accent,
               backgroundColor: isGlobeView ? '#000000' : 'rgba(255,255,255,0.9)'
             }}
           >
             <i className={`fa-solid ${isGlobeView ? 'fa-xmark' : 'fa-globe'} text-xl`}></i> {isGlobeView ? 'Sluit Globe' : 'Globe View'}
           </button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className={`w-full h-8 px-8 pb-4 z-40 relative pointer-events-auto hidden items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80 shrink-0 globe-header-zoom ${isGlobeView ? '!hidden' : 'md:flex'}`} style={{ color: isGlobeView ? '#fff' : p.accent }}>
         <span className="cursor-pointer hover:underline" onClick={() => { setViewMode('card'); setActiveDetailIsland(null); }}>Start</span>
         {showFavoritesOnly && <span>/ Favorieten</span>}
         {viewMode === 'list2' && <span>/ Lijstweergave</span>}
         {isGlobeView && <span>/ Globe</span>}
         {activeDetailIsland && <span>/ {activeDetailIsland.region} / {activeDetailIsland.name}</span>}
      </div>

        {/* Main Content Area */}
        <SwipeableMain 
          viewMode={viewMode} 
          activeDetailIsland={activeDetailIsland} 
          isGlobeView={isGlobeView}
          handleNext={handleNext}
          handlePrev={handlePrev}
        >
          {activeDetailIsland ? (
            <div className="w-full h-full pt-4 pb-20">
              <DetailPage island={activeDetailIsland} p={p} onBack={() => setActiveDetailIsland(null)} />
            </div>
          ) : (
            !isGlobeView && (
              <div className="w-full h-full flex flex-col pt-4 px-6 relative overflow-y-auto">
                {viewMode === 'card' && (
                  <div className="flex-1 w-full flex flex-col items-center justify-start gap-8 md:gap-0 pb-4">
                    <Theme1Card island={activeIsland} p={p} onReadMore={(island) => setActiveDetailIsland(island)} />
                    
                    {/* Dock Area */}
                    <div className="flex-1 w-full flex justify-center items-center z-20 pointer-events-none fade-in shrink-0 min-h-[140px] md:min-h-[220px] py-4 md:py-8">
                      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
                        <button onClick={handlePrev} className="hidden md:flex w-10 h-10 md:w-16 md:h-16 rounded-full border-4 items-center justify-center shrink-0 transition-transform hover:scale-110 shadow-xl" style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}>
                          <i className="fa-solid fa-chevron-left text-base md:text-2xl"></i>
                        </button>
                        
                        <div className="w-full max-w-[95vw] md:max-w-[1200px] rounded-[40px] px-4 md:px-12 border-4 shadow-2xl flex gap-6 md:gap-12 justify-center items-center transition-colors duration-700 h-[100px] md:h-[180px] backdrop-blur-md" style={{ backgroundColor: p.card, borderColor: p.accent }}>
                          {visibleIslands.map((island, index) => {
                            const isActive = island.id === activeIsland.id;
                            const distance = Math.abs(index - 2);
                            const isFav = favorites.includes(island.id);
                            return (
                              <div key={`${island.id}-${index}`} onClick={() => setActiveIsland(island)} className={`${(index === 0 || index === 4) ? 'hidden md:flex' : 'flex'} w-20 md:w-40 flex-col items-center justify-start cursor-pointer transition-all shrink-0 relative ${isActive ? 'scale-110 -translate-y-1 md:-translate-y-4' : ''}`} style={{ opacity: distance === 2 ? 0.4 : distance === 1 ? 0.7 : 1 }}>
                                <div className="relative">
                                  <div className="w-14 h-14 md:w-28 md:h-28 rounded-full border-4 overflow-hidden transition-colors duration-700 shrink-0 shadow-lg" style={{ borderColor: isActive ? (p.id === 'arctic' ? '#9E9E9E' : p.bg) : p.accent, backgroundColor: '#fff' }}>
                                    <img src={`https://flagcdn.com/w320/${island.media.countryCode}.png`} className="w-full h-full object-cover" />
                                  </div>
                                  {isFav && (
                                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-red-500 w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                      <i className="fa-solid fa-heart text-[10px] md:text-sm text-white"></i>
                                    </div>
                                  )}
                                </div>
                                <span className="hidden md:block text-[9px] md:text-xs font-black mt-3 md:mt-5 uppercase tracking-widest transition-colors duration-700 drop-shadow-md text-center w-full leading-tight line-clamp-2" style={{ color: p.accent }}>{island.name}</span>
                              </div>
                            );
                          })}
                        </div>

                        <button onClick={handleNext} className="hidden md:flex w-10 h-10 md:w-16 md:h-16 rounded-full border-4 items-center justify-center shrink-0 transition-transform hover:scale-110 shadow-xl" style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}>
                          <i className="fa-solid fa-chevron-right text-base md:text-2xl"></i>
                        </button>
                      </div>
                    </div>

                  </div>
                )}
                {viewMode === 'list2' && <ListViewSplit islands={filteredIslands} onSelect={setActiveDetailIsland} activeIsland={activeIsland} setActiveIsland={setActiveIsland} />}
              </div>
            )
          )}
        </SwipeableMain>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <FavoritesProvider>
      <InnerApp />
    </FavoritesProvider>
  );
}

