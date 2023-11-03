import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhR6__Kf7h4i1nfkcTiqFJZkSJDmFgvM4",
  authDomain: "meestcom-810cd.firebaseapp.com",
  projectId: "meestcom-810cd",
  storageBucket: "meestcom-810cd.appspot.com",
  messagingSenderId: "973051368610",
  appId: "1:973051368610:web:5c91d560cbf0f1231bb3fb",
  measurementId: "G-11DDP91YCY"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});


const appleProvider = new OAuthProvider('apple.com');

appleProvider.addScope('email');
appleProvider.addScope('name');

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const sendEmailVerificationAsync = async () => {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser!);
  }
}

export const signInWithEmailAndPasswordAsync = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithApplePopup = async () => {
  return await signInWithPopup(auth, appleProvider);
}

export const signOutUser = async () => { 
  signOut(auth); 
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        console.log('firebase getCurrentUser', userAuth);
        resolve(userAuth);
      },
      reject
    );
  });
}

export const updatePasswordForUser = async (password: string) => {
  const user = auth.currentUser;
  if (user !== null) {
    await updatePassword(user, password);
  }
}

export const sendPasswordResetEmailAsync = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
}

export const confirmPasswordResetAsync = async (oobCode: string, newPassword: string) => {
  await confirmPasswordReset(auth, oobCode, newPassword);
}
