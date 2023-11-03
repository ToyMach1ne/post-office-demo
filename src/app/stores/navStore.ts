import { makeAutoObservable, runInAction } from "mobx";

export default class NavStore {
  isSidebarOpened: boolean = false;
  isSidebarClosing: boolean = false;
  authTabIndex: number = 0;
  signUpEmailSentShown: boolean = false;
  passwordResetFormShown: boolean = false;
  passwordResetEmailSentShown: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => {
    if (this.isSidebarOpened) {
      runInAction(() => {this.isSidebarOpened = false});
      runInAction(() => {this.isSidebarClosing = true});

      setTimeout(() => {
        runInAction(() => {this.isSidebarClosing = false;}); 
      }, 400);
    } else {
      runInAction(() => {this.isSidebarOpened = true});
    }  
  }

  setAuthTabIndex = (tabIndex: number) => {
    this.authTabIndex = tabIndex;
  }

  toggleSignUpEmailSentShown = () => {
    this.signUpEmailSentShown = !this.signUpEmailSentShown;
  }

  togglePasswordResetFormShown = () => {
    this.passwordResetFormShown = !this.passwordResetFormShown;
  }

  togglePasswordResetEmailSentShown = () => {
    this.passwordResetEmailSentShown = !this.passwordResetEmailSentShown;
  }
}