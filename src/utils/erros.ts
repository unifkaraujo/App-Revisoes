import {FirebaseError} from 'firebase/app';

export class ErroValidacao extends Error {}

const MENSAGEM_PADRAO = 'Algo deu errado. Tente novamente.';

const MENSAGENS_FIREBASE: Record<string, string> = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/missing-email': 'Informe o e-mail.',
  'auth/missing-password': 'Informe a senha.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/too-many-requests':
    'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
};

export function obterMensagemErro(erro: unknown): string {
  if (erro instanceof ErroValidacao) {
    return erro.message;
  }
  if (erro instanceof FirebaseError) {
    return MENSAGENS_FIREBASE[erro.code] ?? MENSAGEM_PADRAO;
  }
  return MENSAGEM_PADRAO;
}
