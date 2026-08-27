import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Waves, Wind, Sparkles, Bell } from 'lucide-react';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundMode, setSoundMode] = useState('flute'); // 'flute', 'tanpura', 'monsoon'
  const [volume, setVolume] = useState(0.3);

  // Audio Context and node refs
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  // Stop current audio generator
  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  // Play procedural soundscape
  const startAudio = (mode) => {
    stopAudio();

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (mode === 'flute') {
        // Raag Mohanam / Bhupali Classical Flute notes (Sa, Ri, Ga, Pa, Dha) & Backwater Drone
        const mohanamScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];

        // Soft backwater tambura drone
        const drone = ctx.createOscillator();
        const droneGain = ctx.createGain();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
        drone.connect(droneGain);
        droneGain.connect(masterGain);
        drone.start();

        // Bansuri / Venu note phrase interval
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const note = mohanamScale[Math.floor(Math.random() * mohanamScale.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.15);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.5);
        }, 1400);

      } else if (mode === 'tanpura') {
        // Sacred Tanpura Drone (Pa-Sa harmonic resonance at 432Hz tuning) + soft temple bell
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc3.type = 'sine';

        osc1.frequency.setValueAtTime(216, ctx.currentTime);
        osc2.frequency.setValueAtTime(162, ctx.currentTime); // Pa
        osc3.frequency.setValueAtTime(432, ctx.currentTime); // High Sa

        const tanpuraGain = ctx.createGain();
        tanpuraGain.gain.setValueAtTime(0.06, ctx.currentTime);

        osc1.connect(tanpuraGain);
        osc2.connect(tanpuraGain);
        osc3.connect(tanpuraGain);
        tanpuraGain.connect(masterGain);

        osc1.start();
        osc2.start();
        osc3.start();

        // Occasional bronze temple bell chime
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const chime = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chime.type = 'sine';
          chime.frequency.setValueAtTime(880, ctx.currentTime);
          chimeGain.gain.setValueAtTime(0.03, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.0);

          chime.connect(chimeGain);
          chimeGain.connect(masterGain);
          chime.start();
          chime.stop(ctx.currentTime + 4.2);
        }, 4000);

      } else if (mode === 'monsoon') {
        // Western Ghats Rainforest Monsoon (filtered soothing pink/brown noise rain)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // Monsoon breeze swell
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(200, ctx.currentTime);

        lfo.connect(filter.frequency);
        whiteNoise.connect(filter);
        filter.connect(masterGain);

        whiteNoise.start();
        lfo.start();
      }
    } catch (e) {
      console.warn('Web Audio ambience failed to start:', e);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(soundMode);
      setIsPlaying(true);
    }
  };

  const handleModeChange = (mode) => {
    setSoundMode(mode);
    if (isPlaying) {
      startAudio(mode);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val * 0.15, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="audio-ambience-dock animate-fade-in" title="Sanctuary Indian Classical & Nature Ambience">
      <button
        className={`icon-btn ${isPlaying ? 'active' : ''}`}
        onClick={handleTogglePlay}
        aria-label={isPlaying ? 'Pause Indian Sanctuary Ambience' : 'Play Indian Sanctuary Ambience'}
        style={{
          background: isPlaying ? 'rgba(223, 177, 91, 0.25)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: isPlaying ? 'var(--gold-primary)' : 'var(--border-glass)',
          color: isPlaying ? 'var(--gold-light)' : 'var(--text-secondary)'
        }}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          className={`sound-mode-btn ${soundMode === 'flute' ? 'active' : ''}`}
          onClick={() => handleModeChange('flute')}
        >
          <Music size={12} style={{ display: 'inline', marginRight: '3px' }} />
          Kerala Flute
        </button>
        <button
          className={`sound-mode-btn ${soundMode === 'tanpura' ? 'active' : ''}`}
          onClick={() => handleModeChange('tanpura')}
        >
          <Bell size={12} style={{ display: 'inline', marginRight: '3px' }} />
          Temple Tanpura
        </button>
        <button
          className={`sound-mode-btn ${soundMode === 'monsoon' ? 'active' : ''}`}
          onClick={() => handleModeChange('monsoon')}
        >
          <Waves size={12} style={{ display: 'inline', marginRight: '3px' }} />
          Ghats Monsoon
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
        aria-label="Ambience volume"
      />
    </div>
  );
}
