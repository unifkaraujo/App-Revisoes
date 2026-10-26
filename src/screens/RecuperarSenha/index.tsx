import React from 'react';
import LayoutAcesso from '../../components/LayoutAcesso';
import CampoTextoComRotulo from '../../components/CampoTextoComRotulo';
import Botao from '../../components/Botao';
import BotaoLink from '../../components/BotaoLink';
import Mensagem from '../../components/Mensagem';
import {useRecuperarSenha} from './hooks/useRecuperarSenha';

interface RecuperarSenhaProps {
  onVoltar: () => void;
}

const MENSAGEM_ENVIADO =
  'Se este e-mail estiver cadastrado, você vai receber um link para criar uma nova senha.';

export default function RecuperarSenha({onVoltar}: RecuperarSenhaProps) {
  const recuperacao = useRecuperarSenha();

  return (
    <LayoutAcesso
      titulo="Recuperar senha"
      subtitulo="Informe seu e-mail para receber o link de redefinição.">
      <CampoTextoComRotulo
        rotulo="E-mail"
        placeholder="seu@email.com"
        value={recuperacao.email}
        onChangeText={recuperacao.setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Mensagem texto={recuperacao.erro} />
      <Mensagem
        texto={recuperacao.enviado ? MENSAGEM_ENVIADO : null}
        tipo="sucesso"
      />
      <Botao
        titulo="ENVIAR LINK"
        onPress={recuperacao.enviarEmail}
        desabilitado={!recuperacao.podeEnviar}
        carregando={recuperacao.enviando}
      />
      <BotaoLink texto="Voltar para o login" onPress={onVoltar} />
    </LayoutAcesso>
  );
}
