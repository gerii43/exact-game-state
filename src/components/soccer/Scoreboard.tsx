import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { FoulsDots } from './FoulsDots';

interface ScoreboardProps {
  time: string;
  isRunning: boolean;
  onTimerControl: (action: 'start' | 'pause' | 'reset') => void;
  scoreCD: number;
  scoreEquipo: number;
  foulsCDCount: number;
  foulsEquipoCount: number;
  foulsFlash?: 'cd' | 'equipo' | null;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  time,
  isRunning,
  onTimerControl,
  scoreCD,
  scoreEquipo,
  foulsCDCount,
  foulsEquipoCount,
  foulsFlash,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">MARCADOR</h2>
      </div>

      <div className="bg-timer-bg p-6 rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.25)]">
        {/* Timer */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-timer-text mb-4" aria-live="polite" aria-atomic>
            {time}
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => onTimerControl(isRunning ? 'pause' : 'start')}
              className="bg-timer-iniciar text-white px-4 py-2 text-sm font-semibold rounded flex items-center gap-2 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-98 transition-transform duration-150"
              aria-label={isRunning ? 'Pausar' : time !== '00:00' ? 'Reanudar' : 'Iniciar'}
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Pausar' : time !== '00:00' ? 'Reanudar' : 'Iniciar'}
            </Button>
            <Button
              onClick={() => onTimerControl('reset')}
              className="bg-transparent border-2 border-timer-text text-timer-text px-4 py-2 text-sm font-semibold rounded flex items-center gap-2 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-98 transition-transform duration-150"
              aria-label="Reiniciar cronómetro"
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
            <div className="w-12 h-12 bg-team-cd rounded" aria-hidden />
            <span className="text-timer-text font-semibold">CD Statsor</span>
          </div>

          {/* Score */}
          <div className="flex gap-4" aria-label="Marcador">
            <div className="bg-team-cd text-white w-12 h-12 rounded flex items-center justify-center text-2xl font-bold">
              {scoreCD}
            </div>
            <div className="bg-team-cd text-white w-12 h-12 rounded flex items-center justify-center text-2xl font-bold">
              {scoreEquipo}
            </div>
          </div>

          {/* Equipo rival */}
          <div className="flex items-center gap-3">
            <span className="text-timer-text font-semibold">Equipo</span>
            <div className="w-12 h-12 bg-team-equipo rounded" aria-hidden />
          </div>
        </div>

        {/* Foul Indicators */}
        <div className="flex justify-between mt-4">
          <FoulsDots count={foulsCDCount} flash={foulsFlash === 'cd'} aria-label="Faltas CD" />
          <FoulsDots count={foulsEquipoCount} flash={foulsFlash === 'equipo'} aria-label="Faltas Equipo" />
        </div>
      </div>
    </div>
  );
};
