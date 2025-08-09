import { Button } from '@/components/ui/button';

interface JugadoresSectionProps {
  selectedPlayer: number | null;
  onPlayerSelect: (playerNumber: number) => void;
}

export const JugadoresSection = ({ selectedPlayer, onPlayerSelect }: JugadoresSectionProps) => {
  const players = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          JUGADORES
        </h2>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-4 gap-4">
        {players.map((playerNumber) => {
          const isSelected = selectedPlayer === playerNumber;
          
          return (
            <Button
              key={playerNumber}
              onClick={() => onPlayerSelect(playerNumber)}
              className={`
                bg-player-bg text-player-text border-2 border-player-border
                w-full h-20 rounded-lg
                shadow-[0px_4px_6px_rgba(0,0,0,0.25)]
                hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 transition-transform duration-150
                flex flex-col items-center justify-center
                ${isSelected ? 'shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)] bg-player-border' : ''}
                relative
              `}
            >
              {/* Jersey Shape */}
              <div className="relative">
                <svg 
                  width="40" 
                  height="45" 
                  viewBox="0 0 40 45" 
                  className="fill-current"
                >
                  <path
                    d="M10 8 C10 8, 12 6, 15 6 L25 6 C28 6, 30 8, 30 8 L35 12 L35 40 L5 40 L5 12 Z M15 6 L15 2 C15 2, 17 0, 20 0 C23 0, 25 2, 25 2 L25 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                  />
                </svg>
                
                {/* Player Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">PLAYER</span>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};