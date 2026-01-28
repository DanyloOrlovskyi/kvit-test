import { makeAutoObservable } from "mobx";

export class AuthStore {
  apiKey: string | null = null;
  isAuthenticated = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadApiKey();
  }

  loadApiKey = () => {
    const stored = localStorage.getItem("apiKey");
    if (stored) {
      this.apiKey = stored;
      this.isAuthenticated = true;
    }
  };

  setApiKey = (key: string) => {
    this.apiKey = key;
    this.isAuthenticated = true;
    localStorage.setItem("apiKey", key);
  };

  logout = () => {
    this.apiKey = null;
    this.isAuthenticated = false;
    localStorage.removeItem("apiKey");
  };
}
