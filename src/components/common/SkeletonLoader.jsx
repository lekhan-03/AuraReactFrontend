import React from 'react';

export default function SkeletonLoader({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}
