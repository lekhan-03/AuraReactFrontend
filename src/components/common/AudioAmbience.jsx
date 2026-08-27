import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Waves, Wind, Sparkles } from 'lucide-react';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundMode, setSoundMode] = useState('bamboo'); // 'bamboo', 'ocean', 'zen'
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

      if (mode === 'bamboo') {
        // Pentatonic tranquil bell chimes & soft wind drone
        const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];

        // Soft background drone
        const drone = ctx.createOscillator();
        const droneGain = ctx.createGain();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
        drone.connect(droneGain);
        droneGain.connect(masterGain);
        drone.start();

        // Chime interval
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.5);
        }, 1400);

      } else if (mode === 'ocean') {
        // Procedural rhythmic waves using filtered brown noise
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
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // Wave swell speed
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);

        lfo.connect(filter.frequency);
        whiteNoise.connect(filter);
        filter.connect(masterGain);

        whiteNoise.start();
        lfo.start();

      } else if (mode === 'zen') {
        // Warm binaural frequency for deep meditation (432Hz ambient blend)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(216, ctx.currentTime);
        osc2.frequency.setValueAtTime(220, ctx.currentTime); // 4Hz theta wave

        const zenGain = ctx.createGain();
        zenGain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc1.connect(zenGain);
        osc2.connect(zenGain);
        zenGain.connect(masterGain);

        osc1.start();
        osc2.start();
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
    <div className="audio-ambience-dock animate-fade-in" title="Sanctuary Ambience Generator">
      <button
        className={`icon-btn ${isPlaying ? 'active' : ''}`}
        onClick={handleTogglePlay}
        aria-label={isPlaying ? 'Pause Sanctuary Ambience' : 'Play Sanctuary Ambience'}
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
          className={`sound-mode-btn ${soundMode === 'bamboo' ? 'active' : ''}`}
          onClick={() => handleModeChange('bamboo')}
        >
          <Wind size={12} style={{ display: 'inline', marginRight: '3px' }} />
          Bamboo
        </button>
        <button
          className={`sound-mode-btn ${soundMode === 'ocean' ? 'active' : ''}`}
          onClick={() => handleModeChange('ocean')}
        >
          <Waves size={12} style={{ display: 'inline', marginRight: '3px' }} />
          Lagoon
        </button>
        <button
          className={`sound-mode-btn ${soundMode === 'zen' ? 'active' : ''}`}
          onClick={() => handleModeChange('zen')}
        >
          <Sparkles size={12} style={{ display: 'inline', marginRight: '3px' }} />
          432Hz Zen
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
