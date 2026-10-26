import {useState} from 'react';
import {entrar} from '../../../services/autenticacaoServico';
import {useEnvioFormulario} from '../../../hooks/useEnvioFormulario';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {enviar, enviando, erro} = useEnvioFormulario(() =>
    entrar({email, senha}),
  );

  const podeEnviar = Boolean(email && senha) && !enviando;

  return {email, setEmail, senha, setSenha, enviar, enviando, erro, podeEnviar};
}
