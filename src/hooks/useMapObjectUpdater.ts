import { useEffect } from "react";
import type { MapObject } from "../interfaces";

export const useMapObjectUpdater = (rootStore: any) => {
  useEffect(() => {
    initializeMapObjects(rootStore.objectTracker.updateObject);

    const updateInterval = setInterval(() => {
      const objects: MapObject[] = Array.from(
        rootStore.objectTracker.objects.values(),
      );
      if (objects.length === 0) return;

      const numToUpdate = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < numToUpdate; i++) {
        const randomIndex = Math.floor(Math.random() * objects.length);
        const obj = objects[randomIndex];
        if (obj?.status === "active") {
          rootStore.objectTracker.updateObject({
            id: obj.id,
            lat: obj.lat + (Math.random() - 0.5) * 0.01,
            lng: obj.lng + (Math.random() - 0.5) * 0.01,
            direction: (obj.direction + (Math.random() - 0.5) * 30) % 360,
          });
        }
      }
    }, 2000);

    const checkInterval = setInterval(() => {
      rootStore.objectTracker.checkLostObjects();
    }, 5000);

    return () => {
      clearInterval(updateInterval);
      clearInterval(checkInterval);
    };
  }, [rootStore]);
};

const initializeMapObjects = (
  updateObject: (obj: Omit<MapObject, "lastUpdate" | "status">) => void,
) => {
  const baseCoords = [
    { lat: 50.4501, lng: 30.5234 },
    { lat: 48.3794, lng: 31.1656 },
    { lat: 49.8397, lng: 24.0297 },
  ];

  const numObjects = 100;
  const objectIds = Array.from(
    { length: numObjects },
    (_, i) => `OBJ-${String(i + 1).padStart(3, "0")}`,
  );

  objectIds.forEach((id, idx) => {
    const base = baseCoords[idx % baseCoords.length];
    const offset = Math.random() * 0.5;

    updateObject({
      id,
      lat: base.lat + (Math.random() - 0.5) * offset,
      lng: base.lng + (Math.random() - 0.5) * offset,
      direction: Math.random() * 360,
    });
  });
};
