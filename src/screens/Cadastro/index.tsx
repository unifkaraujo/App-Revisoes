import React from 'react';
import LayoutAcesso from '../../components/LayoutAcesso';
import CampoTextoComRotulo from '../../components/CampoTextoComRotulo';
import Botao from '../../components/Botao';
import BotaoLink from '../../components/BotaoLink';
import Mensagem from '../../components/Mensagem';
import {useCadastro} from './hooks/useCadastro';

interface CadastroProps {
  onVoltar: () => void;
}

export default function Cadastro({onVoltar}: CadastroProps) {
  const cadastro = useCadastro();

  return (
    <LayoutAcesso titulo="Criar conta">
      <CampoTextoComRotulo
        rotulo="E-mail"
        placeholder="seu@email.com"
        value={cadastro.email}
        onChangeText={cadastro.setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <CampoTextoComRotulo
        rotulo="Senha"
        placeholder="Mínimo de 6 caracteres"
        value={cadastro.senha}
        onChangeText={cadastro.setSenha}
        secureTextEntry
        autoComplete="password-new"
      />
      <CampoTextoComRotulo
        rotulo="Confirmar senha"
        placeholder="Digite a senha novamente"
        value={cadastro.confirmacaoSenha}
        onChangeText={cadastro.setConfirmacaoSenha}
        secureTextEntry
        autoComplete="password-new"
      />
      <Mensagem texto={cadastro.erro} />
      <Botao
        titulo="CADASTRAR"
        onPress={cadastro.enviar}
        desabilitado={!cadastro.podeEnviar}
        carregando={cadastro.enviando}
      />
      <BotaoLink texto="Já tenho conta" onPress={onVoltar} />
    </LayoutAcesso>
  );
}
