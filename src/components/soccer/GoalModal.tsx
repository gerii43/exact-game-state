import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export type TeamSide = 'cd' | 'equipo';

const ORIGINS = [
  'Jugada en estrategia',
  'Jugada individual',
  'Córner',
  'Falta',
  'Penalti',
  'Dualidad',
  'Error del rival',
  'Recuperación',
] as const;

export interface GoalData {
  zone: number | null;
  origin: string | null;
  assistPlayerId: number | null;
}

interface GoalModalProps {
  open: boolean;
  teamSide: TeamSide;
  players: number[];
  selectedScorer: number | null;
  initial?: Partial<GoalData>;
  onClose: () => void;
  onSave: (data: GoalData, status: 'confirmed' | 'draft') => void;
}

export const GoalModal: React.FC<GoalModalProps> = ({ open, teamSide, players, selectedScorer, initial, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [zone, setZone] = useState<number | null>(initial?.zone ?? null);
  const [origin, setOrigin] = useState<string | null>(initial?.origin ?? null);
  const [otherOrigin, setOtherOrigin] = useState('');
  const [assistPlayerId, setAssistPlayerId] = useState<number | null>(initial?.assistPlayerId ?? null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setZone(initial?.zone ?? null);
      setOrigin(initial?.origin ?? null);
      setAssistPlayerId(initial?.assistPlayerId ?? null);
      setOtherOrigin('');
    }
  }, [open]);

  const canNextFrom1 = zone !== null;
  const resolvedOrigin = useMemo(() => (origin === 'Otros' ? otherOrigin || null : origin), [origin, otherOrigin]);
  const canNextFrom2 = !!resolvedOrigin;

  const save = (status: 'confirmed' | 'draft') => {
    if (zone === null || !resolvedOrigin) return;
    onSave({ zone, origin: resolvedOrigin, assistPlayerId }, status);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Registrar gol ({teamSide === 'cd' ? 'a favor' : 'en contra'})</DialogTitle>
          <DialogDescription>Completa los detalles y guarda el evento.</DialogDescription>
        </DialogHeader>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className={step >= 1 ? 'font-semibold text-foreground' : ''}>Zona</span>
            <span>•</span>
            <span className={step >= 2 ? 'font-semibold text-foreground' : ''}>Origen</span>
            <span>•</span>
            <span className={step >= 3 ? 'font-semibold text-foreground' : ''}>Asistencia</span>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Zona ${i + 1}`}
                  onClick={() => setZone(i)}
                  className={`h-20 rounded-md border ${zone === i ? 'border-primary' : 'border-input'} bg-card hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-98 transition`}
                >
                  <span className="text-xs text-muted-foreground">{i}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {ORIGINS.map((o) => (
                  <Button
                    key={o}
                    onClick={() => setOrigin(o)}
                    className={`bg-secondary text-secondary-foreground hover:brightness-110 ${origin === o ? 'ring-2 ring-primary' : ''}`}
                  >
                    {o}
                  </Button>
                ))}
                <Button
                  onClick={() => setOrigin('Otros')}
                  className={`bg-secondary text-secondary-foreground hover:brightness-110 ${origin === 'Otros' ? 'ring-2 ring-primary' : ''}`}
                >
                  Otros
                </Button>
              </div>
              {origin === 'Otros' && (
                <input
                  autoFocus
                  value={otherOrigin}
                  onChange={(e) => setOtherOrigin(e.target.value)}
                  placeholder="Describe el origen"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setAssistPlayerId(null)}
                  className={`bg-secondary text-secondary-foreground hover:brightness-110 ${assistPlayerId === null ? 'ring-2 ring-primary' : ''}`}
                >
                  Sin asistencia
                </Button>
                {players.map((p) => (
                  <Button
                    key={p}
                    onClick={() => setAssistPlayerId(p)}
                    aria-pressed={assistPlayerId === p}
                    className={`bg-player-bg text-player-text hover:brightness-110 ${assistPlayerId === p ? 'ring-2 ring-primary' : ''}`}
                  >
                    Player {p}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onClose} aria-label="Cancelar">Cancelar</Button>
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)} aria-label="Anterior">
                  Anterior
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={(step === 1 && !canNextFrom1) || (step === 2 && !canNextFrom2)} aria-label="Siguiente">
                  Siguiente
                </Button>
              ) : (
                <>
                  <Button onClick={() => save('draft')} aria-label="Guardar para revisión">
                    Guardar para revisión
                  </Button>
                  <Button onClick={() => save('confirmed')} aria-label="Guardar definitivo">
                    Guardar definitivo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
