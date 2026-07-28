import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';

export default function MobileMenuVariations({
  variant,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isGlobeView,
  setIsGlobeView,
  viewMode,
  setViewMode,
  activeDetailIsland,
  showFavoritesOnly,
  setShowFavoritesOnly,
  toggleFavorite,
  isFavorite,
  p,
  currentThemeId
}) {
  if (!isMobileMenuOpen && variant !== '6' && variant !== '7') return null;

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Common button components for reuse across variations
  const GlobeButton = ({ text, className }) => (
    <button 
      onClick={() => { setIsGlobeView(!isGlobeView); closeMenu(); }}
      className={`font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ borderColor: p.accent, color: p.accent }}
    >
      <i className={`fa-solid ${isGlobeView ? 'fa-xmark' : 'fa-globe'} text-xl`}></i> {text && (isGlobeView ? 'Sluit Globe' : 'Globe View')}
    </button>
  );

  const ViewToggle = ({ className }) => (
    !activeDetailIsland && !isGlobeView && (
      <div className={`flex items-center justify-center p-1 border-4 ${className}`} style={{ borderColor: p.accent }}>
        <button 
          onClick={() => { setViewMode('card'); closeMenu(); }}
          className={`flex-1 min-h-[40px] rounded-full flex items-center justify-center transition-colors ${viewMode === 'card' ? 'bg-white' : 'hover:bg-white/20'}`}
          style={{ color: viewMode === 'card' ? p.accent : p.accent }}
          title="Kaart Weergave"
        >
          <i className="fa-solid fa-layer-group"></i>
        </button>
        <button 
          onClick={() => { setViewMode('list2'); closeMenu(); }}
          className={`flex-1 min-h-[40px] rounded-full flex items-center justify-center transition-colors ${viewMode === 'list2' ? 'bg-white' : 'hover:bg-white/20'}`}
          style={{ color: viewMode === 'list2' ? p.accent : p.accent }}
          title="Lijst Weergave"
        >
          <i className="fa-solid fa-list"></i>
        </button>
      </div>
    )
  );

  const HeartButton = ({ className, text }) => (
    !isGlobeView && (
      <button 
        onClick={() => {
          if (activeDetailIsland) toggleFavorite(activeDetailIsland.id);
          else setShowFavoritesOnly(!showFavoritesOnly);
          closeMenu();
        }}
        className={`flex items-center justify-center gap-3 transition-all ${className} ${
          (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? 'bg-red-500 text-white' : ''
        }`}
        style={{ 
          borderColor: (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? undefined : p.accent, 
          color: (activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? undefined : p.accent 
        }}
      >
        <i className={`fa-heart text-xl ${(activeDetailIsland ? isFavorite(activeDetailIsland.id) : showFavoritesOnly) ? 'fa-solid' : 'fa-regular'}`}></i>
        {text && <span>Favorieten</span>}
      </button>
    )
  );

  const AudioCont = ({ className }) => (
    <div className={`${isGlobeView ? "hidden" : "flex items-center justify-center"} ${className}`}>
      <AudioPlayer themeType={currentThemeId} p={p} />
    </div>
  );

  switch (variant) {
    case '1': // Mac Donals (Original)
      return (
        <div className="flex md:hidden shrink-0 flex-col gap-4 items-end pointer-events-auto flex-wrap min-h-[56px] w-full pt-4">
          <GlobeButton text={true} className="px-6 py-3 rounded-full border-4 hover:scale-105 bg-white/90 backdrop-blur-sm" />
          <ViewToggle className="w-full bg-white/90 backdrop-blur-sm rounded-full" />
          <div className="flex items-center gap-4">
            <HeartButton className="w-12 h-12 rounded-full border-4 shrink-0 hover:scale-110 bg-white/90 backdrop-blur-sm" />
            <AudioCont />
          </div>
        </div>
      );

    case '2': // Slide-in Left
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="absolute top-0 left-0 bottom-0 w-3/4 max-w-[300px] shadow-2xl p-6 flex flex-col gap-6 transform transition-transform" style={{ backgroundColor: p.bg }}>
            <button onClick={closeMenu} className="self-end text-3xl" style={{ color: p.accent }}><i className="fa-solid fa-xmark"></i></button>
            <h2 className="text-2xl font-black uppercase" style={{ color: p.accent }}>Navigatie</h2>
            <GlobeButton text={true} className="w-full py-4 rounded-xl border-4 bg-white/50" />
            <ViewToggle className="w-full bg-white/50 rounded-xl" />
            <HeartButton text={true} className="w-full py-4 rounded-xl border-4 bg-white/50" />
            <AudioCont className="w-full mt-auto pb-8" />
          </div>
        </div>
      );

    case '3': // Slide-in Right
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="absolute top-0 right-0 bottom-0 w-3/4 max-w-[300px] shadow-2xl p-6 flex flex-col gap-6 transform transition-transform" style={{ backgroundColor: p.bg }}>
            <button onClick={closeMenu} className="self-start text-3xl" style={{ color: p.accent }}><i className="fa-solid fa-xmark"></i></button>
            <h2 className="text-2xl font-black uppercase text-right" style={{ color: p.accent }}>Menu</h2>
            <GlobeButton text={true} className="w-full py-4 rounded-xl border-4 bg-white/50" />
            <ViewToggle className="w-full bg-white/50 rounded-xl" />
            <HeartButton text={true} className="w-full py-4 rounded-xl border-4 bg-white/50" />
            <AudioCont className="w-full mt-auto pb-8" />
          </div>
        </div>
      );

    case '4': // Full-screen Overlay
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 p-8 fade-in">
          <button onClick={closeMenu} className="absolute top-8 right-8 text-4xl text-white"><i className="fa-solid fa-xmark"></i></button>
          <GlobeButton text={true} className="w-full max-w-sm py-5 rounded-full border-4 text-xl bg-white/10 text-white border-white hover:bg-white/20" />
          <ViewToggle className="w-full max-w-sm rounded-full bg-white/10" />
          <HeartButton text={true} className="w-full max-w-sm py-5 rounded-full border-4 text-xl bg-white/10 text-white border-white hover:bg-white/20" />
          <div className="scale-125 mt-8"><AudioCont /></div>
        </div>
      );

    case '5': // Bottom Sheet
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto flex items-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="relative w-full rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-8 pb-12 flex flex-col gap-5 slide-up" style={{ backgroundColor: p.card }}>
            <div className="w-16 h-2 rounded-full bg-black/20 mx-auto mb-2"></div>
            <GlobeButton text={true} className="w-full py-4 rounded-2xl border-4 bg-white/50" />
            <div className="flex gap-4">
              <ViewToggle className="flex-1 rounded-2xl bg-white/50" />
              <HeartButton className="w-16 h-16 rounded-2xl border-4 bg-white/50 shrink-0" />
            </div>
            <div className="flex justify-center mt-4"><AudioCont /></div>
          </div>
        </div>
      );

    case '6': // Floating Action Menu (FAB)
      return (
        <div className="fixed bottom-24 right-6 z-[100] md:hidden pointer-events-auto flex flex-col items-end gap-4">
          {isMobileMenuOpen && (
            <div className="flex flex-col gap-4 fade-in items-end mb-2">
              <GlobeButton text={false} className="w-14 h-14 rounded-full border-4 shadow-xl bg-white" />
              <HeartButton text={false} className="w-14 h-14 rounded-full border-4 shadow-xl bg-white" />
              <div className="bg-white rounded-full p-2 shadow-xl border-4" style={{ borderColor: p.accent }}>
                <ViewToggle className="border-0 p-0" />
              </div>
              <div className="bg-white rounded-full p-2 shadow-xl border-4" style={{ borderColor: p.accent }}>
                <AudioCont />
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-16 h-16 rounded-full border-4 shadow-2xl flex items-center justify-center text-3xl transition-transform hover:scale-110"
            style={{ backgroundColor: p.accent, color: p.card, borderColor: p.accent }}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      );

    case '7': // Minimalist Icon-dock (Sticky bottom)
      return (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[90] md:hidden pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-full border-4 p-2 flex items-center gap-2 shadow-2xl" style={{ borderColor: p.accent }}>
            <GlobeButton text={false} className="w-12 h-12 rounded-full border-2 bg-transparent" />
            <div className="w-px h-8 bg-black/20"></div>
            <ViewToggle className="border-0 p-0 min-w-[80px]" />
            <div className="w-px h-8 bg-black/20"></div>
            <HeartButton text={false} className="w-12 h-12 rounded-full border-2 bg-transparent" />
            <div className="w-px h-8 bg-black/20"></div>
            <AudioCont />
          </div>
        </div>
      );

    case '8': // Glassmorphism Modal
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/20" onClick={closeMenu}></div>
          <div className="relative w-full max-w-sm rounded-[40px] border-4 p-8 flex flex-col gap-6 shadow-2xl backdrop-blur-xl bg-white/40" style={{ borderColor: p.accent }}>
            <h2 className="text-center font-black text-xl uppercase tracking-widest" style={{ color: p.accent }}>Menu</h2>
            <GlobeButton text={true} className="w-full py-4 rounded-2xl border-2 bg-white/60" />
            <ViewToggle className="w-full rounded-2xl bg-white/60 border-2" />
            <HeartButton text={true} className="w-full py-4 rounded-2xl border-2 bg-white/60" />
            <div className="flex justify-center bg-white/60 rounded-2xl p-4 border-2" style={{ borderColor: p.accent }}><AudioCont /></div>
          </div>
        </div>
      );

    case '9': // Bouncy Grid
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto flex items-center justify-center p-6 bg-black/80 backdrop-blur-md fade-in">
          <button onClick={closeMenu} className="absolute top-8 right-8 text-4xl text-white"><i className="fa-solid fa-xmark"></i></button>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <GlobeButton text={true} className="aspect-square flex-col text-center rounded-[30px] border-4 bg-white hover:scale-105" />
            <HeartButton text={true} className="aspect-square flex-col text-center rounded-[30px] border-4 bg-white hover:scale-105" />
            <div className="col-span-2 bg-white rounded-[30px] p-2 border-4" style={{ borderColor: p.accent }}>
               <ViewToggle className="border-0 p-0" />
            </div>
            <div className="col-span-2 bg-white rounded-[30px] p-6 border-4 flex justify-center hover:scale-105 transition-transform" style={{ borderColor: p.accent }}>
               <AudioCont />
            </div>
          </div>
        </div>
      );

    case '10': // Curtain
      return (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto bg-black flex flex-col items-center pt-24 gap-8 slide-down" style={{ borderBottom: `8px solid ${p.accent}` }}>
          <button onClick={closeMenu} className="absolute top-8 right-8 text-4xl" style={{ color: p.accent }}><i className="fa-solid fa-chevron-up"></i></button>
          <h1 className="text-4xl font-black uppercase text-white mb-8">IslandExplorer</h1>
          <GlobeButton text={true} className="w-3/4 py-4 rounded-full border-4 bg-transparent text-white border-white text-lg" />
          <HeartButton text={true} className="w-3/4 py-4 rounded-full border-4 bg-transparent text-white border-white text-lg" />
          <div className="w-3/4 p-1 rounded-full border-4 border-white"><ViewToggle className="border-0 p-0" /></div>
          <div className="mt-8 scale-150"><AudioCont /></div>
        </div>
      );

    default:
      return null;
  }
}
