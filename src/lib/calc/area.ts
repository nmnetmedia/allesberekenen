export type LengthUnit = 'm' | 'cm';

export interface Room {
  id: number;
  name: string;
  length: number;
  width: number;
}

const toMeters = (v: number, unit: LengthUnit) => (unit === 'cm' ? v / 100 : v);

export function roomArea(room: Pick<Room, 'length' | 'width'>, unit: LengthUnit) {
  if (!(room.length > 0) || !(room.width > 0)) return 0;
  return toMeters(room.length, unit) * toMeters(room.width, unit);
}

/** Totale oppervlakte van alle ruimtes, plus een percentage snijverlies. */
export function calcArea(rooms: Pick<Room, 'length' | 'width'>[], unit: LengthUnit, wastePercent: number) {
  const perRoom = rooms.map((r) => roomArea(r, unit));
  const net = perRoom.reduce((s, a) => s + a, 0);
  const waste = net * (Math.max(0, wastePercent) / 100);
  return { perRoom, net, waste, total: net + waste };
}
