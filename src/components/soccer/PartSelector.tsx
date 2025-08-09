import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface PartSelectorProps {
  selected: string;
  onChange: (parte: string) => void;
}

const PARTS = [
  { id: '1 TIME', label: '1 TIME' },
  { id: '2 TIME', label: '2 TIME' },
  { id: '1 OT', label: '1 OT' },
  { id: '2 OT', label: '2 OT' },
];

export const PartSelector: React.FC<PartSelectorProps> = ({ selected, onChange }) => {
  useEffect(() => {
    // a11y pressed state handled via aria-pressed below
  }, [selected]);

  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">PARTE</h2>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {PARTS.map((p) => (
          <Button
            key={p.id}
            onClick={() => onChange(p.id)}
            aria-pressed={selected === p.id}
            className={`bg-parte-bg text-parte-text font-semibold text-sm h-12 w-full flex items-center justify-center rounded-md shadow-[0px_4px_6px_rgba(0,0,0,0.25)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-98 transition-transform duration-150 ${selected === p.id ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}`}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
