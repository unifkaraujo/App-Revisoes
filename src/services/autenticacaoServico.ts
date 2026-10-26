import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {auth} from './firebaseApp';
import {Credenciais} from '../types/Credenciais';
import {Usuario} from '../types/Usuario';

function paraUsuario(usuarioFirebase: User | null): Usuario | null {
  if (!usuarioFirebase) {
    return null;
  }
  return {id: usuarioFirebase.uid, email: usuarioFirebase.email};
}

function obterUsuarioFirebase(): User {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }
  return auth.currentUser;
}

export async function entrar({email, senha}: Credenciais): Promise<void> {
  await signInWithEmailAndPassword(auth, email.trim(), senha);
}

export async function cadastrar({email, senha}: Credenciais): Promise<void> {
  await createUserWithEmailAndPassword(auth, email.trim(), senha);
}

export async function recuperarSenha(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim());
}

export function sair(): Promise<void> {
  return signOut(auth);
}

export function observarUsuario(
  aoMudar: (usuario: Usuario | null) => void,
): () => void {
  return onAuthStateChanged(auth, usuarioFirebase =>
    aoMudar(paraUsuario(usuarioFirebase)),
  );
}

export function obterIdUsuario(): string {
  return obterUsuarioFirebase().uid;
}

export function obterTokenUsuario(): Promise<string> {
  return obterUsuarioFirebase().getIdToken();
}
