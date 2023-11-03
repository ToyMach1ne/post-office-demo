import { makeAutoObservable, reaction, runInAction } from "mobx";
import { AuthResponse } from "../models/authResponse";

export default class CommonStore {
  serverError: AuthResponse | null = null;
  deviceUuid: string | null = localStorage.getItem('device_uuid');
  meestToken: string | null = localStorage.getItem('meest_token');
  appLoaded: boolean = false;

  // data of user which is currently being signed up (required for resending email)
  currentAuthData: {email: string; password: string | undefined} | null = null;

  constructor() {
    makeAutoObservable(this);

    // reaction is only run when property jwtToken is changed.
    // In comparison to autorun?? which is executed on store instance initialization
    reaction(
      () => this.deviceUuid, 
      deviceUuid => {
        if (deviceUuid) localStorage.setItem('device_uuid', deviceUuid);
        else localStorage.removeItem('device_uuid');
      });

    reaction(
      () => this.meestToken, 
      token => {
        if (token) localStorage.setItem('meest_token', token);
        else localStorage.removeItem('meest_token');
      });
  }

  setServerError = (error: AuthResponse) => {
    this.serverError = error;
  }

  setDeviceUuid = (deviceUuid: string | null) => {
    this.deviceUuid = deviceUuid;
  }

  setMeestToken = (token: string | null) => {
    this.meestToken = token;
  }

  setAppLoaded = async () => {
    runInAction(() => {
      this.appLoaded = true;
    })
  }

  setCurrentAuthData = (email: string, password?: string) => {
    this.currentAuthData = { email, password };
  }
}