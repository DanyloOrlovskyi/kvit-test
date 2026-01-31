import { AuthStore } from './authStore';
import { ObjectTrackerStore } from './objectTrackerStore';
import { SidebarStore } from './sidebarStore';

export class RootStore {
  objectTracker = new ObjectTrackerStore();
  auth = new AuthStore();
  sidebar = new SidebarStore();
}

export const rootStore = new RootStore();
