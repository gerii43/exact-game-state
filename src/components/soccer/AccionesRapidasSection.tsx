import { Button } from '@/components/ui/button';
import { Zap, Target, Battery, ThumbsDown, X, Bomb, Users, UserX, Hand } from 'lucide-react';

interface AccionesRapidasSectionProps {
  selectedAction: string | null;
  onActionSelect: (action: string) => void;
}

export const AccionesRapidasSection = ({ selectedAction, onActionSelect }: AccionesRapidasSectionProps) => {
  const hexActions = [
    { id: 'D_GANADO', label: 'D.GANADO', color: 'bg-quick-ganado', icon: Zap },
    { id: 'T_PUERTA', label: 'T.PUERTA', color: 'bg-quick-puerta', icon: Target },
    { id: 'B_RECUPER', label: 'B.RECUPER', color: 'bg-quick-recuper', icon: Battery },
    { id: 'D_PERDIDO', label: 'D.PERDIDO', color: 'bg-quick-perdido', icon: ThumbsDown },
    { id: 'T_FUERA', label: 'T.FUERA', color: 'bg-quick-fuera', icon: X },
    { id: 'B_PERDIDO', label: 'B.PERDIDO', color: 'bg-quick-perdido-ball', icon: Bomb },
  ];

  const rectangularActions = [
    { id: 'FALTA_FAVOR', label: 'FALTA FAVOR', color: 'bg-quick-falta-favor', icon: Users },
    { id: 'FALTA_CONTRA', label: 'FALTA CONTRA', color: 'bg-quick-falta-contra', icon: UserX },
    { id: 'PARADA', label: 'PARADA', color: 'bg-quick-parada', icon: Hand },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="bg-section-header px-4 py-2 text-center">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          ACCIONES RÁPIDAS
        </h2>
      </div>

      {/* Hexagonal Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        {hexActions.map((action) => {
          const IconComponent = action.icon;
          const isSelected = selectedAction === action.id;
          
          return (
            <Button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              className={`
                ${action.color} text-white font-bold text-xs h-20 w-full
                flex flex-col items-center justify-center gap-1 rounded-lg
                shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
                hover:opacity-90 transition-all duration-200
                ${isSelected ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
                clip-path-hexagon
              `}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <IconComponent size={16} />
              <span className="leading-tight">{action.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Rectangular Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {rectangularActions.map((action) => {
          const IconComponent = action.icon;
          const isSelected = selectedAction === action.id;
          
          return (
            <Button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              className={`
                ${action.color} text-white font-semibold text-xs h-12 w-full
                flex items-center justify-center gap-2 rounded-md
                shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
                hover:opacity-90 transition-all duration-200
                ${isSelected ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)]' : ''}
              `}
            >
              <IconComponent size={14} />
              <span>{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};