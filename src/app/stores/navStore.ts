import { makeAutoObservable, runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";

export default class NavStore {

  isBottomSidebarOpened: boolean = false;
  isBottomSidebarClosing: boolean = false;

  isLeftSidebarOpened: boolean = false;
  isLeftSidebarClosing: boolean = false;

  authTabIndex: number = 0;
  signUpEmailSentShown: boolean = false;
  passwordResetFormShown: boolean = false;
  passwordResetEmailSentShown: boolean = false;

  selectedMenuSections: number[] = []; 
  selectedService?: string;

  isServicesOpened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleBottomSidebar = () => {
    if (this.isBottomSidebarOpened) {
      runInAction(() => {
        this.isBottomSidebarOpened = false
        this.isBottomSidebarClosing = true
        setTimeout(() => {
          runInAction(() => {this.isBottomSidebarClosing = false;}); 
        }, 400);
      });
    } else {
      runInAction(() => {
        this.isBottomSidebarOpened = true;
      });
    }  
  }

  toggleLeftSidebar = () => {
    if (this.isLeftSidebarOpened) {
      runInAction(() => {
        this.isLeftSidebarOpened = false
        this.isLeftSidebarClosing = true
        setTimeout(() => {
          runInAction(() => {this.isLeftSidebarClosing = false;}); 
        }, 400);
      });
    } else {
      runInAction(() => {
        this.isLeftSidebarOpened = true;
      });
    }  
  }

  setLeftSidebarOpened = (isOpened: boolean) => {
    this.isLeftSidebarOpened = isOpened;
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

  setSelectedMenuSections = (indexes: number[]) => {
    this.selectedMenuSections = indexes;
  }

  openMenuSection = (index: number) => {
    if (!this.selectedMenuSections.includes(index)) {
      this.selectedMenuSections.push(index);
    }
  }

  toggleMenuSection = (index: number) => {
    if (this.selectedMenuSections.includes(index)) {
      this.setSelectedMenuSections(this.selectedMenuSections.filter((i) => i !== index))
    } else {
      this.setSelectedMenuSections([...this.selectedMenuSections, index]);
    }
  }

  // title:item e.g. Account Setting:Personal Data => navigates to services/preferences
  setSelectedService = (service?: string, navigate?: NavigateFunction) => {
    if (service && navigate) {
      if (!ImplementedServices.includes(service)) {
        navigate('/coming-soon');
      } else {
        const servicesRoute = "/services/" + service.split(':')[1].replace(' ', '').toLocaleLowerCase();
        navigate(servicesRoute);
      }
    }
    runInAction(() => {
      this.selectedService = service;
    })
  }

  setServicesOpened = (isOpened: boolean) => {
    this.isServicesOpened = isOpened;
  }
}

// temp
const ImplementedServices = ["Account Settings:Personal data", "Account Settings:Preferences", "Account Settings:Security settings"];