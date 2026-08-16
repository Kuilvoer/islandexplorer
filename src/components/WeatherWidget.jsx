import React, { useState, useEffect } from 'react';

// WMO Weather interpretation codes
const weatherCodes = {
  0: { label: 'Helder', icon: 'fa-sun' },
  1: { label: 'Gedeeltelijk bewolkt', icon: 'fa-cloud-sun' },
  2: { label: 'Bewolkt', icon: 'fa-cloud' },
  3: { label: 'Zwaar bewolkt', icon: 'fa-cloud' },
  45: { label: 'Mist', icon: 'fa-smog' },
  48: { label: 'Mist', icon: 'fa-smog' },
  51: { label: 'Lichte motregen', icon: 'fa-cloud-rain' },
  53: { label: 'Motregen', icon: 'fa-cloud-rain' },
  55: { label: 'Zware motregen', icon: 'fa-cloud-rain' },
  61: { label: 'Lichte regen', icon: 'fa-cloud-showers-heavy' },
  63: { label: 'Regen', icon: 'fa-cloud-showers-heavy' },
  65: { label: 'Zware regen', icon: 'fa-cloud-showers-water' },
  71: { label: 'Lichte sneeuw', icon: 'fa-snowflake' },
  73: { label: 'Sneeuw', icon: 'fa-snowflake' },
  75: { label: 'Zware sneeuw', icon: 'fa-snowflake' },
  95: { label: 'Onweer', icon: 'fa-bolt' },
  96: { label: 'Onweer met hagel', icon: 'fa-bolt' },
  99: { label: 'Zwaar onweer', icon: 'fa-bolt' },
};

export default function WeatherWidget({ coordinates, p }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchWeather = async () => {
      if (!coordinates || !coordinates.lat || !coordinates.lng) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await res.json();
        
        if (isMounted && data.current && data.daily) {
          // Parse 7-day forecast
          const forecast = data.daily.time.map((timeStr, idx) => {
            const date = new Date(timeStr);
            const dayName = date.toLocaleDateString('nl-NL', { weekday: 'short' });
            return {
              day: dayName,
              max: Math.round(data.daily.temperature_2m_max[idx]),
              min: Math.round(data.daily.temperature_2m_min[idx]),
              code: data.daily.weather_code[idx]
            };
          });

          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            isDay: data.current.is_day,
            sunrise: data.daily.sunrise[0] ? new Date(data.daily.sunrise[0]).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '--:--',
            sunset: data.daily.sunset[0] ? new Date(data.daily.sunset[0]).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '--:--',
            forecast: forecast
          });
        }
      } catch (e) {
        console.error("Weather fetch failed", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, [coordinates]);

  if (loading) {
    return <div className="animate-pulse w-full h-32 bg-black/10 rounded-3xl"></div>;
  }

  if (!weather) return null;

  const wData = weatherCodes[weather.code] || { label: 'Onbekend', icon: 'fa-cloud' };
  // If it's night and the code is clear/cloudy, use moon icon
  const displayIcon = !weather.isDay && weather.code <= 1 ? 'fa-moon' : wData.icon;

  return (
    <div className="flex flex-col gap-4">
      {/* Current Weather Bento Box */}
      <div className="flex flex-col gap-4 bg-white/60 backdrop-blur-md p-6 rounded-[30px] border-4 shadow-lg transition-transform hover:-translate-y-1" style={{ borderColor: p.accent }}>
        
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-widest opacity-70 mb-1" style={{ color: p.accent }}>Huidig Weer</span>
            <div className="text-5xl font-black tracking-tighter" style={{ color: p.accent }}>{weather.temp}°</div>
            <div className="text-sm font-bold uppercase tracking-wider mt-2" style={{ color: p.accent }}>{wData.label}</div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center bg-white shadow-sm" style={{ borderColor: p.accent }}>
            <i className={`fa-solid ${displayIcon} text-3xl`} style={{ color: p.accent }}></i>
          </div>
        </div>

        <div className="w-full h-1 rounded-full opacity-20 my-2" style={{ backgroundColor: p.accent }}></div>

        {/* Sunrise/Sunset */}
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-3 text-sm font-bold" style={{ color: p.accent }}>
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><i className="fa-solid fa-sun text-yellow-500"></i></div>
             <span>{weather.sunrise}</span>
           </div>
           <div className="flex items-center gap-3 text-sm font-bold" style={{ color: p.accent }}>
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><i className="fa-solid fa-moon text-blue-400"></i></div>
             <span>{weather.sunset}</span>
           </div>
        </div>

      </div>

      {/* 7-Day Forecast */}
      {weather.forecast && (
        <div className="flex flex-col gap-3 bg-white/40 backdrop-blur-sm p-5 rounded-[30px] border-4" style={{ borderColor: p.accent }}>
          <span className="text-xs font-black uppercase tracking-widest opacity-70 mb-2 pl-2" style={{ color: p.accent }}>7-Daagse Verwachting</span>
          
          <div className="flex flex-col gap-3">
            {weather.forecast.map((day, idx) => {
              const fData = weatherCodes[day.code] || { label: 'Onbekend', icon: 'fa-cloud' };
              return (
                <div key={idx} className="flex items-center justify-between px-2">
                  <span className="w-12 font-bold uppercase text-sm" style={{ color: p.accent }}>
                    {idx === 0 ? 'Vdg' : day.day}
                  </span>
                  <i className={`fa-solid ${fData.icon} w-6 text-center text-lg`} style={{ color: p.accent }} title={fData.label}></i>
                  <div className="flex items-center gap-2 w-24 justify-end font-black text-sm" style={{ color: p.accent }}>
                    <span className="opacity-50">{day.min}°</span>
                    <div className="w-6 h-1 rounded-full opacity-30" style={{ backgroundColor: p.accent }}></div>
                    <span>{day.max}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
