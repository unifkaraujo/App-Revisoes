import {initializeApp} from 'firebase/app';
import {
  initializeAuth,
  signInWithEmailAndPassword,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseConfig} from './firebaseConfig';

const app = initializeApp(firebaseConfig);

// Configuração do Auth com persistência no React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export async function loginFirebase(
  email: string,
  password: string,
): Promise<string> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  return token;
}
