import { Button } from '@/components/ui/button';
import { Target, Flag, Goal } from 'lucide-react';

interface AccionesSectionProps {
  selectedAction: string | null;
  onActionSelect: (action: string) => void;
}

export const AccionesSection = ({ selectedAction, onActionSelect }: AccionesSectionProps) => {
  const actions = [
    { id: 'GOL', label: 'GOL', color: 'bg-action-gol', icon: Target },
    { id: 'GOL CONTRA', label: 'GOL CONTRA', color: 'bg-action-gol-contra', icon: Target },
    { id: 'CORN FAVOR', label: 'CORN FAVOR', color: 'bg-action-corn-favor', icon: Flag },
    { id: 'CORN CONTRA', label: 'CORN CONTRA', color: 'bg-action-corn-contra', icon: Flag },
    { id: 'PNLTI FAVOR', label: 'PNLTI FAVOR', color: 'bg-action-pnlti-favor', icon: Goal },
    { id: 'PNLTI CONTRA', label: 'PNLTI CONTRA', color: 'bg-action-pnlti-contra', icon: Goal },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          ACCIONES
        </h2>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          const isSelected = selectedAction === action.id;
          
          return (
            <Button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              className={`
                ${action.color} text-white font-semibold text-sm h-14 w-full
                flex items-center justify-between px-4 rounded-md
                shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
                hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 transition-transform duration-150
                ${isSelected ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
              `}
            >
              <span className="flex items-center gap-2">
                ⦿ {action.label}
              </span>
              <IconComponent size={18} />
            </Button>
          );
        })}
      </div>

      {/* Anotaciones Button */}
      <Button
        onClick={() => onActionSelect('ANOTACIONES')}
        className={`
          bg-action-anotaciones text-white font-semibold text-sm h-14 w-full
          flex items-center justify-center rounded-md
          shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
          hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 transition-transform duration-150
          ${selectedAction === 'ANOTACIONES' ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
        `}
      >
        ANOTACIONES
      </Button>
    </div>
  );
};