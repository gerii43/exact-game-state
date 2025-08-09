interface HistorialSectionProps {
  events: Array<{
    id: string;
    player: number;
    action: string;
    time: string;
    parte: string;
  }>;
}

export const HistorialSection = ({ events }: HistorialSectionProps) => {
  if (events.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-section-header px-4 py-2 text-center rounded-md">
        <h2 className="text-section-header-foreground font-bold text-sm tracking-wider">
          HISTORIAL DE ACCIONES
        </h2>
      </div>

      {/* Events Table */}
      <div className="bg-timer-bg rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.25)] max-h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-section-header">
            <tr>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Tiempo</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Jugador</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Acción</th>
              <th className="px-3 py-2 text-left text-section-header-foreground font-semibold">Parte</th>
            </tr>
          </thead>
          <tbody>
            {[...events].reverse().map((event) => (
              <tr key={event.id} className="border-b border-gray-200">
                <td className="px-3 py-2 text-timer-text">{event.time}</td>
                <td className="px-3 py-2 text-timer-text">Player {event.player}</td>
                <td className="px-3 py-2 text-timer-text">{event.action}</td>
                <td className="px-3 py-2 text-timer-text">{event.parte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};