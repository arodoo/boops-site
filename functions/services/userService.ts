import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'


export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    throw new Error(`Firebase Error when registering user`);
  }
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    throw new Error(`Firebase Error when logging in user`);
  }
};