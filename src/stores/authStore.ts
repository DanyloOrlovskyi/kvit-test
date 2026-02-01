import { makeAutoObservable } from 'mobx';

export class AuthStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    this.loadApiKey();
  }

  loadApiKey = () => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      this.isAuthenticated = true;
    }
  };

  checkApiKey = (key: string) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (apiKey === key) {
      this.isAuthenticated = true;
      localStorage.setItem('apiKey', 'true');
      return {
        success: true,
        message: 'Авторизація пройшла успішно',
      };
    }
    return {
      success: false,
      message: 'Невірний API ключ',
    };
  };

  logout = () => {
    this.isAuthenticated = false;
    localStorage.removeItem('apiKey');
  };
}
