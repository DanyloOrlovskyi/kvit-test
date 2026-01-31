import type { MapObject } from '@/interfaces';
import { RootStore } from '@/stores';
import { useEffect } from 'react';

type Position = { lat: number; lng: number };

export const useMapObjectUpdater = (rootStore: RootStore) => {
  useEffect(() => {
    initializeMapObjects(rootStore.objectTracker.setObject);

    const updateInterval = setInterval(() => {
      rootStore.objectTracker.checkLostObjects();
      const objects: MapObject[] = [...rootStore.objectTracker.objects.values()];

      if (!objects.length) return;

      const numToUpdate = Math.floor(Math.random() * 10);
      for (let i = 0; i < numToUpdate; i++) {
        const obj = objects[i];
        if (obj?.status === 'active') {
          rootStore.objectTracker.setObject({
            id: obj.id,
            lat: obj.lat + (Math.random() - 0.5) * 0.01,
            lng: obj.lng + (Math.random() - 0.5) * 0.01,
            direction: (obj.direction + 0.5 * 30) % 360,
          });
        }
      }
    }, 5000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [rootStore]);
};

const initializeMapObjects = (
  setObject: (obj: Omit<MapObject, 'lastUpdate' | 'status'>) => void
) => {
  const baseCoords: Position[] = [
    { lat: 50.4501, lng: 30.5234 },
    { lat: 48.3794, lng: 31.1656 },
    { lat: 49.8397, lng: 24.0297 },
  ];

  const numObjects = 100;

  const objectIds = Array.from(
    { length: numObjects },
    (_, i) => `OBJ-${String(i + 1).padStart(3, '0')}`
  );

  objectIds.forEach((objectId, index) => {
    const baseCoord = baseCoords[index % baseCoords.length];

    const angle = Math.random() * 2 * Math.PI;
    const r = Math.sqrt(Math.random()) * 0.5;

    const dLat = r * Math.cos(angle);
    const dLng = r * Math.sin(angle);

    setObject({
      id: objectId,
      lat: baseCoord.lat + dLat,
      lng: baseCoord.lng + dLng,
      direction: Math.random() * 360,
    });
  });
};
