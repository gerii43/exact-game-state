import { Button } from '@/components/ui/button';
import { Target, Flag, Goal } from 'lucide-react';

interface AccionesSectionProps {
  selectedAction: string | null;
  onActionSelect: (action: string) => void;
}

export const AccionesSection = ({ selectedAction, onActionSelect }: AccionesSectionProps) => {
  const actions = [
    { id: 'GOL', label: 'GOL', color: 'bg-action-gol', icon: Target },
    { id: 'GOL_CONTRA', label: 'GOL CONTRA', color: 'bg-action-gol-contra', icon: Target },
    { id: 'CORN_FAVOR', label: 'CORN FAVOR', color: 'bg-action-corn-favor', icon: Flag },
    { id: 'CORN_CONTRA', label: 'CORN CONTRA', color: 'bg-action-corn-contra', icon: Flag },
    { id: 'PNLTI_FAVOR', label: 'PNLTI FAVOR', color: 'bg-action-pnlti-favor', icon: Goal },
    { id: 'PNLTI_CONTRA', label: 'PNLTI CONTRA', color: 'bg-action-pnlti-contra', icon: Goal },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="bg-section-header px-4 py-2 text-center">
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
                hover:opacity-90 transition-all duration-200
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
          hover:opacity-90 transition-all duration-200
          ${selectedAction === 'ANOTACIONES' ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
        `}
      >
        ANOTACIONES
      </Button>
    </div>
  );
};