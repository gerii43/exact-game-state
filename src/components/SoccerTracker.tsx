import { useEffect, useMemo, useState } from 'react';
import { AccionesSection } from './soccer/AccionesSection';
import { AccionesRapidasSection } from './soccer/AccionesRapidasSection';
import { PartSelector } from './soccer/PartSelector';
import { Scoreboard } from './soccer/Scoreboard';
import { JugadoresSection } from './soccer/JugadoresSection';
import { HistoryList, GameEvent, TeamId, EventType } from './soccer/HistoryList';
import { useToast, toast as globalToast } from '@/hooks/use-toast';
import { useClock } from '@/hooks/useClock';
import { GoalModal, GoalData, TeamSide } from './soccer/GoalModal';
import { deleteEventById, loadEvents, postEvent, saveEvents, updateEvent } from '@/store/eventsStore';
import { ToastAction } from '@/components/ui/toast';

const PART_KEY = 'current_part_v1';

export const SoccerTracker = () => {
  const { toast } = useToast();

  // Selecteds
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Events and part persistence
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [currentParte, setCurrentParte] = useState<string>(() => localStorage.getItem(PART_KEY) || '1 TIME');

  // Timer
  const { time, isRunning, start, pause, reset } = useClock();

  // Goal modal
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goalTeamSide, setGoalTeamSide] = useState<TeamSide>('cd');
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null);

  // Flash for foul limit
  const [foulsFlash, setFoulsFlash] = useState<'cd' | 'equipo' | null>(null);

  // Load events initially
  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  // Persist events when changed
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Derived metrics
  const confirmed = useMemo(() => events.filter((e) => e.status === 'confirmed'), [events]);

  const scoreCD = useMemo(() => confirmed.filter((e) => e.type === 'goal_for').length, [confirmed]);
  const scoreEquipo = useMemo(() => confirmed.filter((e) => e.type === 'goal_against').length, [confirmed]);

  const foulsCDCount = useMemo(
    () => confirmed.filter((e) => (e.type === 'foul' || e.type === 'penalty') && e.teamId === 'cd' && e.part === currentParte).length,
    [confirmed, currentParte]
  );
  const foulsEquipoCount = useMemo(
    () => confirmed.filter((e) => (e.type === 'foul' || e.type === 'penalty') && e.teamId === 'equipo' && e.part === currentParte).length,
    [confirmed, currentParte]
  );

  // Timer controls exposed to scoreboard
  const handleTimerControl = (action: 'start' | 'pause' | 'reset') => {
    if (action === 'start') start();
    if (action === 'pause') pause();
    if (action === 'reset') reset();
  };

  const handlePlayerSelect = (playerNumber: number) => {
    setSelectedPlayer((prev) => (prev === playerNumber ? null : playerNumber));
  };

  const openGoalForAction = (action: 'GOL' | 'GOL CONTRA') => {
    if (!selectedPlayer) {
      toast({ description: 'Selecciona un jugador antes de registrar el gol.' });
      return;
    }
    setGoalTeamSide(action === 'GOL' ? 'cd' : 'equipo');
    setGoalModalOpen(true);
  };

  const addQuickEvent = (type: EventType, teamId: TeamId, label?: string) => {
    // Enforce foul limit per part (5)
    if ((type === 'foul' || type === 'penalty')) {
      const current = teamId === 'cd' ? foulsCDCount : foulsEquipoCount;
      if (current >= 5) {
        setFoulsFlash(teamId);
        setTimeout(() => setFoulsFlash(null), 600);
        toast({ description: 'Límite de faltas alcanzado (5).' });
        return;
      }
    }

    const ev: GameEvent = {
      id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
      part: currentParte,
      teamId,
      playerId: selectedPlayer,
      type,
      meta: { label, gameTime: time },
      status: 'confirmed',
    };
    setEvents((prev) => [...prev, ev]);
    postEvent(ev);
    toast({ description: `${label || type} registrado` });
    setSelectedAction(null);
    setSelectedPlayer(null);
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction((prev) => (prev === action ? null : action));

    if (action === 'GOL' || action === 'GOL CONTRA') {
      openGoalForAction(action as 'GOL' | 'GOL CONTRA');
      return;
    }

    if (action === 'FALTA FAVOR') return addQuickEvent('foul', 'equipo', 'Falta a favor');
    if (action === 'FALTA CONTRA') return addQuickEvent('foul', 'cd', 'Falta en contra');
    if (action === 'PNLTI FAVOR') return addQuickEvent('penalty', 'equipo', 'Penalti a favor');
    if (action === 'PNLTI CONTRA') return addQuickEvent('penalty', 'cd', 'Penalti en contra');

    // Optional: record other actions as notes
    const ev: GameEvent = {
      id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
      part: currentParte,
      teamId: 'cd',
      playerId: selectedPlayer,
      type: 'note',
      meta: { label: action, gameTime: time },
      status: 'confirmed',
    };
    setEvents((prev) => [...prev, ev]);
    postEvent(ev);
    toast({ description: `${action} registrado` });
    setSelectedAction(null);
    setSelectedPlayer(null);
  };

  const handleParteSelect = (parte: string) => {
    setCurrentParte(parte);
    localStorage.setItem(PART_KEY, parte);
    // Foul dots reset automatically as they are derived by currentParte
    toast({ description: `Parte cambiada a ${parte}. Faltas reiniciadas visualmente.` });
  };

  const saveGoal = async (data: GoalData, status: 'confirmed' | 'draft') => {
    if (!selectedPlayer && !editingEvent) {
      toast({ description: 'Selecciona un jugador (goleador).', });
      return;
    }

    const base: GameEvent = editingEvent ?? {
      id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
      part: currentParte,
      teamId: goalTeamSide,
      playerId: selectedPlayer!,
      type: goalTeamSide === 'cd' ? 'goal_for' : 'goal_against',
      meta: {},
      status: 'confirmed',
    };

    const ev: GameEvent = {
      ...base,
      meta: { ...(base.meta || {}), zone: data.zone, origin: data.origin, assistPlayerId: data.assistPlayerId, gameTime: time },
      status,
    };

    if (editingEvent) {
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? ev : e)));
      await updateEvent(ev);
      setEditingEvent(null);
      toast({ description: status === 'draft' ? 'Gol guardado como borrador' : 'Gol actualizado' });
    } else {
      setEvents((prev) => [...prev, ev]);
      await postEvent(ev);
      toast({ description: status === 'draft' ? 'Gol guardado para revisión' : 'Gol registrado' });
    }

    setGoalModalOpen(false);
    setSelectedAction(null);
    setSelectedPlayer(null);
  };

  const editEvent = (ev: GameEvent) => {
    if (ev.type === 'goal_for' || ev.type === 'goal_against') {
      setEditingEvent(ev);
      setGoalTeamSide(ev.teamId);
      setGoalModalOpen(true);
      setSelectedPlayer(ev.playerId || null);
    } else {
      toast({ description: 'Edición disponible solo para goles en esta versión.' });
    }
  };

  const deleteEvent = async (ev: GameEvent) => {
    setEvents((prev) => prev.filter((e) => e.id !== ev.id));
    await deleteEventById(ev.id);

    const t = globalToast({
      description: 'Evento eliminado',
      action: (
        <ToastAction altText="Deshacer" onClick={() => {
          setEvents((prev) => [...prev, ev]);
          postEvent(ev);
        }}>Deshacer</ToastAction>
      ),
    });
  };

  const duplicateEvent = (ev: GameEvent) => {
    const copy: GameEvent = { ...ev, id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, ts: Date.now() };
    setEvents((prev) => [...prev, copy]);
    postEvent(copy);
    toast({ description: 'Evento duplicado' });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <AccionesSection selectedAction={selectedAction} onActionSelect={handleActionSelect} />
          <AccionesRapidasSection selectedAction={selectedAction} onActionSelect={handleActionSelect} />
          <PartSelector selected={currentParte} onChange={handleParteSelect} />
          <HistoryList events={events} onEdit={editEvent} onDelete={deleteEvent} onDuplicate={duplicateEvent} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Scoreboard
            time={time}
            isRunning={isRunning}
            onTimerControl={handleTimerControl}
            scoreCD={scoreCD}
            scoreEquipo={scoreEquipo}
            foulsCDCount={foulsCDCount}
            foulsEquipoCount={foulsEquipoCount}
            foulsFlash={foulsFlash}
          />
          <JugadoresSection selectedPlayer={selectedPlayer} onPlayerSelect={setSelectedPlayer} />
        </div>
      </div>

      <GoalModal
        open={goalModalOpen}
        teamSide={goalTeamSide}
        players={Array.from({ length: 12 }, (_, i) => i + 1)}
        selectedScorer={selectedPlayer}
        initial={{
          zone: (editingEvent?.meta?.zone as number) ?? null,
          origin: (editingEvent?.meta?.origin as string) ?? null,
          assistPlayerId: (editingEvent?.meta?.assistPlayerId as number | null) ?? null,
        }}
        onClose={() => {
          setGoalModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={saveGoal}
      />
    </div>
  );
};
