import { GameEvent } from '@/components/soccer/HistoryList';

const KEY = 'events_v1';

export const loadEvents = (): GameEvent[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GameEvent[]) : [];
  } catch {
    return [];
  }
};

export const saveEvents = (events: GameEvent[]) => {
  localStorage.setItem(KEY, JSON.stringify(events));
};

export const postEvent = async (event: GameEvent): Promise<GameEvent> => {
  const events = loadEvents();
  const updated = [...events, event];
  saveEvents(updated);
  return event;
};

export const updateEvent = async (event: GameEvent): Promise<GameEvent> => {
  const events = loadEvents();
  const updated = events.map((e) => (e.id === event.id ? event : e));
  saveEvents(updated);
  return event;
};

export const deleteEventById = async (id: string): Promise<void> => {
  const events = loadEvents();
  const updated = events.filter((e) => e.id !== id);
  saveEvents(updated);
};
