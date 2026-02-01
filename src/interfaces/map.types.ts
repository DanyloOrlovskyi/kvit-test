export interface MapObject {
  id: string;
  lat: number;
  lng: number;
  direction: number;
  lastUpdate: number;
  status: 'active' | 'lost';
}

export type LocationTuple = [number, number];
