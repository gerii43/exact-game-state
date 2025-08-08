import { Button } from '@/components/ui/button';

interface ParteSectionProps {
  selectedParte: string | null;
  onParteSelect: (parte: string) => void;
}

export const ParteSection = ({ selectedParte, onParteSelect }: ParteSectionProps) => {
  const partes = [
    { id: '1_TIME', label: '1 TIME' },
    { id: '2_TIME', label: '2 TIME' },
    { id: '1_OT', label: '1 OT' },
    { id: '2_OT', label: '2 OT' },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="bg-section-header px-4 py-2 text-center">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          PARTE
        </h2>
      </div>

      {/* Parte Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {partes.map((parte) => {
          const isSelected = selectedParte === parte.id;
          
          return (
            <Button
              key={parte.id}
              onClick={() => onParteSelect(parte.id)}
              className={`
                bg-parte-bg text-parte-text font-semibold text-sm h-12 w-full
                flex items-center justify-center rounded-md
                shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
                hover:opacity-90 transition-all duration-200
                ${isSelected ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
              `}
            >
              {parte.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};