import type { MapObject } from "../interfaces";
import { makeAutoObservable } from "mobx";

export class ObjectTrackerStore {
  objects = new Map<string, MapObject>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updateObject(obj: Omit<MapObject, "lastUpdate" | "status">) {
    this.objects.set(obj.id, {
      ...obj,
      lastUpdate: Date.now(),
      status: "active",
    });
  }

  checkLostObjects() {
    const now = Date.now();
    const lostThreshold = 30000;
    const removeThreshold = 300000;

    this.objects.forEach((obj, id) => {
      const timeSinceUpdate = now - obj.lastUpdate;

      if (timeSinceUpdate > removeThreshold) {
        this.objects.delete(id);
      } else if (timeSinceUpdate > lostThreshold && obj.status === "active") {
        obj.status = "lost";
      }
    });
  }

  get activeObjects() {
    return Array.from(this.objects.values()).filter(
      (o) => o.status === "active",
    );
  }

  get lostObjects() {
    return Array.from(this.objects.values()).filter((o) => o.status === "lost");
  }
}
