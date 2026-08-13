import React from 'react';

export function formatBoldText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-black font-serif italic text-[1.05em]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
