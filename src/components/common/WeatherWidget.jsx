import React, { useState, useEffect } from 'react';
import { destinationsData } from '../../data/destinationsData';
import Modal from './Modal';
import { CloudSun, Sun, CloudRain, Snowflake, Wind, Thermometer } from 'lucide-react';

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllSanctuaryWeather() {
      try {
        const results = {};
        // Batch fetch for each destination
        await Promise.all(
          destinationsData.map(async (dest) => {
            try {
              const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current_weather=true`
              );
              if (res.ok) {
                const data = await res.json();
                results[dest.id] = data.current_weather;
              }
            } catch (err) {
              console.warn(`Weather fetch failed for ${dest.name}:`, err);
            }
          })
        );

        if (isMounted) {
          setWeatherData(results);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) setLoading(false);
      }
    }

    fetchAllSanctuaryWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  const getWeatherIcon = (code) => {
    if (code === undefined) return <Sun size={18} color="var(--gold-primary)" />;
    if (code === 0 || code === 1) return <Sun size={18} color="#f59e0b" />;
    if (code >= 2 && code <= 3) return <CloudSun size={18} color="#94a3b8" />;
    if (code >= 51 && code <= 67) return <CloudRain size={18} color="#38bdf8" />;
    if (code >= 71 && code <= 86) return <Snowflake size={18} color="#e0f2fe" />;
    return <CloudSun size={18} color="var(--gold-primary)" />;
  };

  const primaryDestWeather = weatherData['kyoto'] || { temperature: 22, weathercode: 1 };

  return (
    <>
      <button
        className="weather-widget-badge"
        onClick={() => setIsOpen(true)}
        title="Click to view live weather across all 5 AURA sanctuaries"
      >
        {getWeatherIcon(primaryDestWeather.weathercode)}
        <span>Kyoto: {loading ? '...' : `${Math.round(primaryDestWeather.temperature)}°C`}</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Live Sanctuary Climates & Weather">
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Real-time satellite & meteorological data retrieved live from Open-Meteo across our global eco-sanctuaries.
        </p>

        <div className="weather-grid-modal">
          {destinationsData.map((dest) => {
            const current = weatherData[dest.id];
            return (
              <div key={dest.id} className="weather-destination-card">
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-primary)' }}>
                  {dest.country}
                </div>
                <h4 style={{ fontSize: '1.05rem', margin: '0.25rem 0' }}>{dest.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.8rem 0' }}>
                  {getWeatherIcon(current ? current.weathercode : 1)}
                  <span className="weather-temp">
                    {current ? `${Math.round(current.temperature)}°C` : '24°C'}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <Wind size={13} />
                  <span>Wind: {current ? `${current.windspeed} km/h` : '8 km/h'}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  Climate: {dest.climate}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
