import { makeAutoObservable } from 'mobx';

export class SidebarStore {
  isOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  handleToggleSidebar = () => {
    this.isOpen = !this.isOpen;
  };
}
