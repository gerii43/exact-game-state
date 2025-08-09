import React from 'react';
import { Pencil, Trash2, Copy } from 'lucide-react';

export type EventType = 'goal_for' | 'goal_against' | 'foul' | 'penalty' | 'note';
export type TeamId = 'cd' | 'equipo';

export interface GameEvent {
  id: string;
  ts: number;
  part: string;
  teamId: TeamId;
  playerId?: number | null;
  type: EventType;
  meta?: Record<string, any>;
  status: 'confirmed' | 'draft';
}

interface HistoryListProps {
  events: GameEvent[];
  onEdit: (ev: GameEvent) => void;
  onDelete: (ev: GameEvent) => void;
  onDuplicate?: (ev: GameEvent) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ events, onEdit, onDelete, onDuplicate }) => {
  if (!events.length) return null;

  const human = (ev: GameEvent) => {
    switch (ev.type) {
      case 'goal_for':
        return 'Gol a favor';
      case 'goal_against':
        return 'Gol en contra';
      case 'foul':
        return 'Falta';
      case 'penalty':
        return 'Penalti';
      default:
        return ev.meta?.label || 'Evento';
    }
  };

  const timeStr = (ev: GameEvent) => ev.meta?.gameTime || '';

  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">HISTORIAL DE ACCIONES</h2>
      </div>

      <div className="bg-timer-bg rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.25)] max-h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-section-header">
            <tr>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Tiempo</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Jugador</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Acción</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Parte</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...events].reverse().map((ev) => (
              <tr key={ev.id} className="border-b border-gray-200">
                <td className="px-3 py-2 text-timer-text">{timeStr(ev)}</td>
                <td className="px-3 py-2 text-timer-text">{ev.playerId ? `Player ${ev.playerId}` : '-'}</td>
                <td className="px-3 py-2 text-timer-text">{human(ev)} {ev.status === 'draft' ? '(borrador)' : ''}</td>
                <td className="px-3 py-2 text-timer-text">{ev.part}</td>
                <td className="px-3 py-2 text-timer-text">
                  <div className="flex items-center gap-2">
                    <button aria-label="Editar" onClick={() => onEdit(ev)} className="p-1 rounded hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <Pencil size={16} />
                    </button>
                    <button aria-label="Eliminar" onClick={() => onDelete(ev)} className="p-1 rounded hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <Trash2 size={16} />
                    </button>
                    {onDuplicate && (
                      <button aria-label="Duplicar" onClick={() => onDuplicate(ev)} className="p-1 rounded hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <Copy size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
