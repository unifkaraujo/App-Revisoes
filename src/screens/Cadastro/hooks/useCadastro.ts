import {useState} from 'react';
import {cadastrar} from '../../../services/autenticacaoServico';
import {useEnvioFormulario} from '../../../hooks/useEnvioFormulario';
import {ErroValidacao} from '../../../utils/erros';

function validarConfirmacaoSenha(senha: string, confirmacao: string) {
  if (senha !== confirmacao) {
    throw new ErroValidacao('As senhas não conferem.');
  }
}

export function useCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const {enviar, enviando, erro} = useEnvioFormulario(async () => {
    validarConfirmacaoSenha(senha, confirmacaoSenha);
    await cadastrar({email, senha});
  });

  const podeEnviar = Boolean(email && senha && confirmacaoSenha) && !enviando;

  return {
    email,
    setEmail,
    senha,
    setSenha,
    confirmacaoSenha,
    setConfirmacaoSenha,
    enviar,
    enviando,
    erro,
    podeEnviar,
  };
}
