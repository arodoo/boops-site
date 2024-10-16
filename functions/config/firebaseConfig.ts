import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import * as dotenv from 'dotenv'

dotenv.config() // Cargar variables de entorno
/*
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN);
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_STORAGE_BUCKET:', process.env.FIREBASE_STORAGE_BUCKET);
console.log('FIREBASE_MESSAGING_SENDER_ID:', process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log('FIREBASE_APP_ID:', process.env.FIREBASE_APP_ID); */

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export default firebaseApp
