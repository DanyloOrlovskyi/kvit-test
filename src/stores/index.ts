import { AuthStore } from './authStore';
import { ObjectTrackerStore } from './objectTrackerStore';

export class RootStore {
  objectTracker = new ObjectTrackerStore();
  auth = new AuthStore();
}

export const rootStore = new RootStore();
