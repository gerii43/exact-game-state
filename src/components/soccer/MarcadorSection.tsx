import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface MarcadorSectionProps {
  timer: string;
  isRunning: boolean;
  scoreCD: number;
  scoreEquipo: number;
  foulsCDCount: number;
  foulsEquipoCount: number;
  onTimerControl: (action: 'start' | 'pause' | 'reset') => void;
}

export const MarcadorSection = ({
  timer,
  isRunning,
  scoreCD,
  scoreEquipo,
  foulsCDCount,
  foulsEquipoCount,
  onTimerControl
}: MarcadorSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="bg-section-header px-4 py-2 text-center">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          MARCADOR
        </h2>
      </div>

      {/* Timer Panel */}
      <div className="bg-timer-bg p-6 rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.25)]">
        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-timer-text mb-4">
            {timer}
          </div>
          
          {/* Timer Controls */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => onTimerControl('start')}
              className="bg-timer-iniciar text-white px-4 py-2 text-sm font-semibold rounded flex items-center gap-2"
            >
              <Play size={16} />
              Iniciar
            </Button>
            
            <Button
              onClick={() => onTimerControl('pause')}
              className="bg-timer-pausar text-white px-4 py-2 text-sm font-semibold rounded flex items-center gap-2"
            >
              <Pause size={16} />
              Pausar
            </Button>
            
            <Button
              onClick={() => onTimerControl('reset')}
              className="bg-transparent border-2 border-timer-text text-timer-text px-4 py-2 text-sm font-semibold rounded flex items-center gap-2 hover:bg-timer-text hover:text-timer-bg transition-colors"
            >
              <RotateCcw size={16} />
              Reiniciar
            </Button>
          </div>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          {/* CD Statsor */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-team-cd rounded"></div>
            <span className="text-timer-text font-semibold">CD Statsor</span>
          </div>

          {/* Score */}
          <div className="flex gap-4">
            <div className="bg-team-cd text-white w-12 h-12 rounded flex items-center justify-center text-2xl font-bold">
              {scoreCD}
            </div>
            <div className="bg-team-cd text-white w-12 h-12 rounded flex items-center justify-center text-2xl font-bold">
              {scoreEquipo}
            </div>
          </div>

          {/* Equipo */}
          <div className="flex items-center gap-3">
            <span className="text-timer-text font-semibold">Equipo</span>
            <div className="w-12 h-12 bg-team-equipo rounded"></div>
          </div>
        </div>

        {/* Foul Indicators */}
        <div className="flex justify-between mt-4">
          {/* CD Fouls */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < foulsCDCount ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Equipo Fouls */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < foulsEquipoCount ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};