import React from 'react';

export default function Badge({ children, variant = 'gold', size = 'md' }) {
  const styles = {
    gold: { background: 'rgba(223, 177, 91, 0.15)', color: 'var(--gold-light)', border: '1px solid var(--border-subtle)' },
    emerald: { background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' },
    azure: { background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' },
    dark: { background: 'rgba(10, 15, 22, 0.8)', color: '#fff', border: '1px solid var(--border-glass)' },
  };

  const style = styles[variant] || styles.gold;
  const padding = size === 'sm' ? '0.2rem 0.55rem' : '0.3rem 0.75rem';
  const fontSize = size === 'sm' ? '0.7rem' : '0.78rem';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        borderRadius: '9999px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        padding,
        fontSize,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
