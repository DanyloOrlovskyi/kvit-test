import { ObjectTrackerStore } from "./objectTrackerStore";
import { AuthStore } from "./authStore";

class RootStore {
  objectTracker = new ObjectTrackerStore();
  auth = new AuthStore();
}

export const rootStore = new RootStore();
