import { useState } from 'react';
import { AccionesSection } from './soccer/AccionesSection';
import { AccionesRapidasSection } from './soccer/AccionesRapidasSection';
import { ParteSection } from './soccer/ParteSection';
import { MarcadorSection } from './soccer/MarcadorSection';
import { JugadoresSection } from './soccer/JugadoresSection';
import { HistorialSection } from './soccer/HistorialSection';
import { useToast } from '@/hooks/use-toast';

export interface GameState {
  selectedPlayer: number | null;
  selectedAction: string | null;
  scoreCD: number;
  scoreEquipo: number;
  timer: string;
  isRunning: boolean;
  foulsCDCount: number;
  foulsEquipoCount: number;
  currentParte: string | null;
  events: Array<{
    id: string;
    player: number;
    action: string;
    time: string;
    parte: string;
  }>;
}

export const SoccerTracker = () => {
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    selectedPlayer: null,
    selectedAction: null,
    scoreCD: 0,
    scoreEquipo: 2,
    timer: "03:05",
    isRunning: false,
    foulsCDCount: 0,
    foulsEquipoCount: 1, // One red dot shown in reference
    currentParte: null,
    events: []
  });

  const handlePlayerSelect = (playerNumber: number) => {
    setGameState(prev => ({
      ...prev,
      selectedPlayer: prev.selectedPlayer === playerNumber ? null : playerNumber
    }));
  };

  const handleActionSelect = (action: string) => {
    setGameState(prev => ({
      ...prev,
      selectedAction: prev.selectedAction === action ? null : action
    }));

    // If both player and action are selected, process the action
    if (gameState.selectedPlayer && action) {
      processAction(gameState.selectedPlayer, action);
    }
  };

  const processAction = (player: number, action: string) => {
    const newEvent = {
      id: Date.now().toString(),
      player,
      action,
      time: gameState.timer,
      parte: gameState.currentParte || "1 TIME"
    };

    let newState = { ...gameState };
    
    // Update score for goals
    if (action === "GOL") {
      newState.scoreCD += 1;
    } else if (action === "GOL CONTRA") {
      newState.scoreEquipo += 1;
    }
    
    // Update fouls
    if (action === "FALTA FAVOR") {
      newState.foulsEquipoCount += 1;
    } else if (action === "FALTA CONTRA") {
      newState.foulsCDCount += 1;
    }

    // Add event to history
    newState.events = [...newState.events, newEvent];
    
    // Clear selections
    newState.selectedPlayer = null;
    newState.selectedAction = null;

    setGameState(newState);

    // Show confirmation toast
    toast({
      description: `PLAYER ${player} – ${action} registrado con éxito`,
      duration: 3000,
    });
  };

  const handleTimerControl = (action: 'start' | 'pause' | 'reset') => {
    setGameState(prev => ({
      ...prev,
      isRunning: action === 'start',
      timer: action === 'reset' ? "00:00" : prev.timer
    }));
  };

  const handleParteSelect = (parte: string) => {
    setGameState(prev => ({
      ...prev,
      currentParte: prev.currentParte === parte ? null : parte
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <AccionesSection
            selectedAction={gameState.selectedAction}
            onActionSelect={handleActionSelect}
          />
          
          <AccionesRapidasSection
            selectedAction={gameState.selectedAction}
            onActionSelect={handleActionSelect}
          />
          
          <ParteSection
            selectedParte={gameState.currentParte}
            onParteSelect={handleParteSelect}
          />
          
          <HistorialSection events={gameState.events} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <MarcadorSection
            timer={gameState.timer}
            isRunning={gameState.isRunning}
            scoreCD={gameState.scoreCD}
            scoreEquipo={gameState.scoreEquipo}
            foulsCDCount={gameState.foulsCDCount}
            foulsEquipoCount={gameState.foulsEquipoCount}
            onTimerControl={handleTimerControl}
          />
          
          <JugadoresSection
            selectedPlayer={gameState.selectedPlayer}
            onPlayerSelect={handlePlayerSelect}
          />
        </div>
      </div>
    </div>
  );
};