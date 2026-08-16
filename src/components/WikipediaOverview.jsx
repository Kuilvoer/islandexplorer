import React, { useState, useEffect } from 'react';

export default function WikipediaOverview({ islandName, p }) {
  const [extract, setExtract] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWiki() {
      if (!islandName) return;
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://nl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(islandName)}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setExtract(data.extract);
        setUrl(data.content_urls?.desktop?.page);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWiki();
  }, [islandName]);

  if (loading) {
    return (
      <div 
        className={`p-6 md:p-10 rounded-[40px] border-4 animate-pulse`}
        style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight break-words hyphens-auto">Het Verhaal van {islandName}</h2>
          <i className="fa-brands fa-wikipedia-w text-3xl opacity-20 ml-4 shrink-0"></i>
        </div>
        <div className="h-4 rounded w-3/4 mb-4" style={{ backgroundColor: p.accent, opacity: 0.2 }}></div>
        <div className="h-4 rounded w-full mb-4" style={{ backgroundColor: p.accent, opacity: 0.2 }}></div>
        <div className="h-4 rounded w-5/6" style={{ backgroundColor: p.accent, opacity: 0.2 }}></div>
      </div>
    );
  }

  if (error || !extract) {
    return (
      <div 
        className={`p-6 md:p-10 rounded-[40px] border-4`}
        style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight break-words hyphens-auto flex-1">Het Verhaal van {islandName}</h2>
          <i className="fa-brands fa-wikipedia-w text-3xl opacity-20 ml-4 shrink-0"></i>
        </div>
        <div className="text-lg font-medium leading-relaxed opacity-90 mb-8">
          <p>Kon geen informatie ophalen van Wikipedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`p-6 md:p-10 rounded-[40px] border-4`}
      style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight break-words hyphens-auto flex-1">Het Verhaal van {islandName}</h2>
        <i className="fa-brands fa-wikipedia-w text-3xl opacity-20 ml-4 shrink-0"></i>
      </div>
      <div className="text-lg font-medium leading-relaxed opacity-90 mb-8">
        <p>{extract}</p>
      </div>
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          style={{ borderColor: p.accent, color: p.accent, backgroundColor: `${p.bg}80` }}
        >
          Lees meer op Wikipedia <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      )}
    </div>
  );
}
