import React from 'react';

interface FoulsDotsProps {
  count: number;
  limit?: number;
  flash?: boolean;
  'aria-label'?: string;
}

export const FoulsDots: React.FC<FoulsDotsProps> = ({ count, limit = 5, flash = false, ...aria }) => {
  return (
    <div className={`flex gap-1 ${flash ? 'animate-pulse' : ''}`} role="group" {...aria}>
      {Array.from({ length: limit }).map((_, i) => (
        <div
          key={i}
          aria-label={(i < count ? 'activo' : 'inactivo') + ` ${i + 1}`}
          className={`w-3 h-3 rounded-full ${i < count ? 'bg-destructive' : 'bg-muted'}`}
        />
      ))}
    </div>
  );
};
