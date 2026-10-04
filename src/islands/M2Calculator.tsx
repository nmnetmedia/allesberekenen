import { useEffect, useRef, useState } from 'preact/hooks';
import { calcArea, type LengthUnit } from '../lib/calc/area';
import { track } from '../lib/analytics';
import { formatNumber, parseNumber } from '../lib/format';
import { NumberInput, Segmented } from './ui/fields';
import { Icon } from './ui/Icon';
import { Breakdown, EmptyResult, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { useCompletion } from './ui/hooks';

const NAME = 'm2-berekenen';

interface RoomInput {
  id: number;
  name: string;
  length: string;
  width: string;
}

const DEFAULT_ROOMS: RoomInput[] = [{ id: 1, name: 'Ruimte 1', length: '5', width: '4' }];
const m2 = (v: number) => `${formatNumber(v, 2)} m²`;

export default function M2Calculator() {
  const [rooms, setRooms] = useState<RoomInput[]>(DEFAULT_ROOMS);
  const [unit, setUnit] = useState<LengthUnit>('m');
  const [waste, setWaste] = useState('0');
  const [touched, setTouched] = useState(false);
  const nextId = useRef(2);
  const started = useRef(false);

  useEffect(() => track('calculator_view', NAME), []);

  const touch = () => {
    if (!started.current) {
      started.current = true;
      track('calculator_start', NAME);
    }
    setTouched(true);
  };

  const update = (id: number, patch: Partial<RoomInput>) => {
    touch();
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };
  const addRoom = () => {
    touch();
    const id = nextId.current++;
    setRooms((rs) => [...rs, { id, name: `Ruimte ${rs.length + 1}`, length: '', width: '' }]);
    // Focus het eerste veld van de nieuwe ruimte.
    setTimeout(() => document.getElementById(`m2-l-${id}`)?.focus(), 0);
  };
  const removeRoom = (id: number) => {
    touch();
    setRooms((rs) => rs.filter((r) => r.id !== id));
  };
  const reset = () => {
    setRooms(DEFAULT_ROOMS);
    setUnit('m');
    setWaste('0');
    nextId.current = 2;
    setTouched(false);
  };

  const parsed = rooms.map((r) => ({ length: parseNumber(r.length), width: parseNumber(r.width) }));
  const wastePct = Number(waste);
  const result = calcArea(parsed, unit, wastePct);
  const valid = result.net > 0;
  useCompletion(NAME, touched, valid, [rooms, unit, waste]);

  const unitLabel = unit === 'm' ? 'm' : 'cm';
  const shareText = valid
    ? [
        ...rooms.map((r, i) => `${r.name}: ${m2(result.perRoom[i])}`),
        `Totaal: ${m2(result.net)}`,
        wastePct > 0 ? `Met ${wastePct}% snijverlies: ${m2(result.total)}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    : '';

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <Segmented
            name="eenheid"
            legend="Eenheid van je maten"
            value={unit}
            onChange={(v) => {
              touch();
              setUnit(v);
            }}
            options={[
              { value: 'm', label: 'Meter (m)' },
              { value: 'cm', label: 'Centimeter (cm)' },
            ]}
          />
          {rooms.map((room, i) => {
            const area = result.perRoom[i];
            const lErr = room.length.trim() && !(parsed[i].length > 0) ? 'Ongeldige lengte' : null;
            const wErr = room.width.trim() && !(parsed[i].width > 0) ? 'Ongeldige breedte' : null;
            return (
              <div class="room" key={room.id}>
                <div class="room-head">
                  <input class="room-name" aria-label={`Naam van ruimte ${i + 1}`} value={room.name} onInput={(e) => update(room.id, { name: (e.currentTarget as HTMLInputElement).value })} />
                  <span class="room-area">{area > 0 ? m2(area) : '–'}</span>
                  {rooms.length > 1 && (
                    <button type="button" class="icon-btn" onClick={() => removeRoom(room.id)} aria-label={`${room.name} verwijderen`}>
                      <Icon name="trash" size={16} />
                    </button>
                  )}
                </div>
                <div class="field-row">
                  <NumberInput id={`m2-l-${room.id}`} label="Lengte" suffix={unitLabel} value={room.length} onInput={(v) => update(room.id, { length: v })} error={lErr} />
                  <NumberInput id={`m2-b-${room.id}`} label="Breedte" suffix={unitLabel} value={room.width} onInput={(v) => update(room.id, { width: v })} error={wErr} />
                </div>
              </div>
            );
          })}
          <button type="button" class="btn btn-secondary" onClick={addRoom} disabled={rooms.length >= 20}>
            <Icon name="plus" size={16} /> Ruimte toevoegen
          </button>
          <Segmented
            name="snijverlies"
            legend="Snijverlies"
            value={waste}
            onChange={(v) => {
              touch();
              setWaste(v);
            }}
            options={[
              { value: '0', label: '0%' },
              { value: '5', label: '5%' },
              { value: '10', label: '10%' },
              { value: '15', label: '15%' },
            ]}
          />
          <p class="hint">5% voor recht gelegd laminaat of pvc, 10% voor tegels of ruimtes met hoeken, 15% voor visgraat of diagonaal leggen.</p>
        </div>
        <div class="calc-output">
          {valid ? (
            <>
              <ResultCard
                label={wastePct > 0 ? `Totaal inclusief ${wastePct}% snijverlies` : 'Totale oppervlakte'}
                value={m2(wastePct > 0 ? result.total : result.net)}
                sub={rooms.length > 1 ? `${rooms.length} ruimtes samen` : undefined}
              />
              <Breakdown
                label="Per ruimte"
                rows={[
                  ...rooms.map((r, i) => ({ label: r.name || `Ruimte ${i + 1}`, value: result.perRoom[i] > 0 ? m2(result.perRoom[i]) : '–' })),
                  ...(wastePct > 0
                    ? [
                        { label: 'Netto oppervlakte', value: m2(result.net) },
                        { label: `Snijverlies ${wastePct}%`, value: `+ ${m2(result.waste)}` },
                      ]
                    : []),
                  { label: wastePct > 0 ? 'Te bestellen' : 'Totaal', value: m2(result.total), variant: 'total' as const },
                ]}
              />
              <ShareResult calculatorName={NAME} text={shareText} onReset={reset} />
            </>
          ) : (
            <EmptyResult>Vul de lengte en breedte van minstens één ruimte in.</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
