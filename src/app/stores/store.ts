import { createContext, useContext } from "react";
import UserStore from "./userStore";
import NavStore from "./navStore";
import CommonStore from "./commonStore";

interface Store {
  userStore: UserStore;
  navStore: NavStore;
  commonStore: CommonStore;
}

export const store: Store = {
  userStore: new UserStore(),
  navStore: new NavStore(),
  commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}