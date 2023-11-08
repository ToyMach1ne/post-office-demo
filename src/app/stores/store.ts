import { createContext, useContext } from "react";
import UserStore from "./userStore";
import NavStore from "./navStore";
import CommonStore from "./commonStore";
import NotificationsStore from "./notificationsStore";
import LocalizationsStore from "./localizationsStore";

interface Store {
  userStore: UserStore;
  navStore: NavStore;
  commonStore: CommonStore;
  notificationsStore: NotificationsStore;
  localizationsStore: LocalizationsStore;
}

export const store: Store = {
  userStore: new UserStore(),
  navStore: new NavStore(),
  commonStore: new CommonStore(),
  notificationsStore: new NotificationsStore(),
  localizationsStore: new LocalizationsStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}