import React, {useCallback, useState} from 'react';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import RecuperarSenha from '../screens/RecuperarSenha';
import {useBotaoVoltar} from '../hooks/useBotaoVoltar';

type TelaAcesso = 'login' | 'cadastro' | 'recuperarSenha';

export default function RotasAcesso() {
  const [tela, setTela] = useState<TelaAcesso>('login');

  const irParaLogin = useCallback(() => setTela('login'), []);

  useBotaoVoltar(tela !== 'login', irParaLogin);

  if (tela === 'cadastro') {
    return <Cadastro onVoltar={irParaLogin} />;
  }
  if (tela === 'recuperarSenha') {
    return <RecuperarSenha onVoltar={irParaLogin} />;
  }
  return (
    <Login
      onCriarConta={() => setTela('cadastro')}
      onEsqueciSenha={() => setTela('recuperarSenha')}
    />
  );
}
