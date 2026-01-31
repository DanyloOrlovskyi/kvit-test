import type { MapObject } from '@/interfaces';
import { makeAutoObservable } from 'mobx';

export class ObjectTrackerStore {
  objects = new Map<string, MapObject>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setObject(obj: Omit<MapObject, 'lastUpdate' | 'status'>) {
    this.objects.set(obj.id, {
      ...obj,
      lastUpdate: Date.now(),
      status: 'active',
    });
  }

  checkLostObjects() {
    const now = Date.now();
    const LOST_THRESHOLD_MS = 30000;
    const REMOVE_THRESHOLD_MS = 300000;

    let markedCount = 0;
    const maxMarkPerCall = 1;

    const ids = [...this.objects.keys()];

    for (const id of ids) {
      const obj = this.objects.get(id);
      if (!obj) continue;

      const age = now - obj.lastUpdate;

      if (age > REMOVE_THRESHOLD_MS) {
        this.objects.delete(id);
        continue;
      }

      if (obj.status === 'active' && age > LOST_THRESHOLD_MS) {
        obj.status = 'lost';
        markedCount++;

        if (markedCount >= maxMarkPerCall) {
          break;
        }
      }
    }
  }

  get activeObjects() {
    return [...this.objects.values()].filter((o) => o.status === 'active');
  }

  get lostObjects() {
    return [...this.objects.values()].filter((o) => o.status === 'lost');
  }
}
