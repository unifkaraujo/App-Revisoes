import {useState} from 'react';
import {recuperarSenha} from '../../../services/autenticacaoServico';
import {useEnvioFormulario} from '../../../hooks/useEnvioFormulario';

export function useRecuperarSenha() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const {enviar, enviando, erro} = useEnvioFormulario(() =>
    recuperarSenha(email),
  );

  const enviarEmail = async () => {
    setEnviado(await enviar());
  };

  const podeEnviar = Boolean(email) && !enviando;

  return {email, setEmail, enviarEmail, enviando, enviado, erro, podeEnviar};
}
