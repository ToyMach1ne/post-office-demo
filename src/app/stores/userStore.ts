import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { store } from "./store";
import agent from "../api/agent";
import { signInWithGooglePopup, 
  createAuthUserWithEmailAndPassword, 
  sendEmailVerificationAsync, 
  signInWithEmailAndPasswordAsync, 
  sendPasswordResetEmailAsync, 
  confirmPasswordResetAsync, 
  signInWithApplePopup} from "../utils/firebase/firebase.utils";

export default class UserStore {
  user: User | null = null;
  isLoadingUser: boolean = false;
  googleSignInProgress: boolean = false;
  appleSignInProgress: boolean = false;
  emailSignInProgress: boolean = false;
  signUpInProgress: boolean = false;
  passwordResetProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  googleLogin = async () => {
    this.googleSignInProgress = true;
    try {
      const authUser = await signInWithGooglePopup();
      const firebaseToken = (authUser.user as any).accessToken;
      const firebaseUid = authUser.user.uid;

      const meestToken = await agent.Auth.socialLogin(
        firebaseUid,
        firebaseToken,
        store.commonStore.deviceUuid!, 
      );

      runInAction(() => {
        store.commonStore.setMeestToken(meestToken ?? null);    
      })

      //temp
      alert(`User ${authUser.user.email} signed in successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.googleSignInProgress = false;
      })
    }
  }

  appleLogin = async () => {
    this.appleSignInProgress = true;
    try {
      const authUser = await signInWithApplePopup();
      const firebaseToken = (authUser.user as any).accessToken;
      const firebaseUid = authUser.user.uid;

      const meestToken = await agent.Auth.socialLogin(
        firebaseUid,
        firebaseToken,
        store.commonStore.deviceUuid!, 
      );

      runInAction(() => {
        store.commonStore.setMeestToken(meestToken ?? null);    
      })

      //temp
      alert(`User ${authUser.user.email} signed in successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.appleSignInProgress = false;
      })
    }
  }

  emailLogin = async (email: string, password: string) => {
    this.emailSignInProgress = true;
    
    try {
      const authUser = await signInWithEmailAndPasswordAsync(email, password);

      if (!authUser.user.emailVerified) {
        alert('Email not verified!');
        throw Error(`Email ${authUser.user.email} not verified`);
      }

      const firebaseToken = (authUser.user as any).accessToken;
      const firebaseUid = authUser.user.uid;

      const meestToken = await agent.Auth.login(firebaseUid, firebaseToken, store.commonStore.deviceUuid!);

      runInAction(() => {
        store.commonStore.setMeestToken(meestToken ?? null);    
      })

      //temp
      alert(`User ${authUser.user.email} signed in successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.emailSignInProgress = false;
      })
    }
  }

  signUp = async (email: string, password: string) => {
    this.signUpInProgress = true;
    
    try {
      const authUser = await createAuthUserWithEmailAndPassword(email, password);
      const firebaseUid = authUser.user.uid;
      await sendEmailVerificationAsync();

      runInAction(async () => {
        const response = await agent.Auth.register(firebaseUid, store.commonStore.deviceUuid!);
        console.log(response);
      })

      store.navStore.toggleSignUpEmailSentShown();
      store.commonStore.setCurrentAuthData(email, password);

      //temp
      alert(`User ${authUser.user.email} signed up successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.signUpInProgress = false;
      })
    }
  }

  // resetPassword start procedure
  resetPasswordStart = async (email: string) => {
    this.passwordResetProgress = true;

    try {
      await sendPasswordResetEmailAsync(email);

      store.navStore.togglePasswordResetFormShown();
      store.navStore.togglePasswordResetEmailSentShown();
      store.commonStore.setCurrentAuthData(email);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.passwordResetProgress = false;
      })
    }
  }

  // resetPassword finalize procedure after link from firebase received
  resetPasswordFinish = async (oobCode: string, newPassword: string) => {
    this.passwordResetProgress = true;
    
    try {
      await confirmPasswordResetAsync(oobCode, newPassword);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.passwordResetProgress = false;
      })
    }
  }

  changePassword = async (password: string) => {

  }

  getCurrentUser = async () => {
    this.isLoadingUser = true;
    try {
      const user = await agent.Profile.profile();
      console.log(user);
      runInAction(() => {
        this.user = user!;
      });
    } catch (error) {
      console.error(error);
      // also set token to null. In such case it means that token is expired.
      store.commonStore.setMeestToken(null);
      store.commonStore.setDeviceUuid(null);
    } finally {
      runInAction(() => {
        this.isLoadingUser = false;
      })
    }
  }
}