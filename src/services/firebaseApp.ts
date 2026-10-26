import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configuracaoFirebase} from '../config/firebase';

const app = initializeApp(configuracaoFirebase);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

auth.languageCode = 'pt-BR';
