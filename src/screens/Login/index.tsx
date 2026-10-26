import React from 'react';
import LayoutAcesso from '../../components/LayoutAcesso';
import CampoTextoComRotulo from '../../components/CampoTextoComRotulo';
import Botao from '../../components/Botao';
import BotaoLink from '../../components/BotaoLink';
import Mensagem from '../../components/Mensagem';
import {useLogin} from './hooks/useLogin';

interface LoginProps {
  onCriarConta: () => void;
  onEsqueciSenha: () => void;
}

export default function Login({onCriarConta, onEsqueciSenha}: LoginProps) {
  const login = useLogin();

  return (
    <LayoutAcesso titulo="Entrar">
      <CampoTextoComRotulo
        rotulo="E-mail"
        placeholder="seu@email.com"
        value={login.email}
        onChangeText={login.setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <CampoTextoComRotulo
        rotulo="Senha"
        placeholder="Digite sua senha"
        value={login.senha}
        onChangeText={login.setSenha}
        secureTextEntry
        autoComplete="password"
      />
      <Mensagem texto={login.erro} />
      <Botao
        titulo="ENTRAR"
        onPress={login.enviar}
        desabilitado={!login.podeEnviar}
        carregando={login.enviando}
      />
      <BotaoLink texto="Esqueci minha senha" onPress={onEsqueciSenha} />
      <BotaoLink texto="Não tem conta? Cadastre-se" onPress={onCriarConta} />
    </LayoutAcesso>
  );
}
