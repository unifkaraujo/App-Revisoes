import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {cores} from '../theme/cores';

type TipoMensagem = 'erro' | 'sucesso';

interface MensagemProps {
  texto: string | null;
  tipo?: TipoMensagem;
}

export default function Mensagem({texto, tipo = 'erro'}: MensagemProps) {
  if (!texto) {
    return null;
  }
  return <Text style={[estilos.texto, estilosTipo[tipo]]}>{texto}</Text>;
}

const estilos = StyleSheet.create({
  texto: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
});

const estilosTipo = StyleSheet.create({
  erro: {color: cores.erro},
  sucesso: {color: cores.sucesso},
});
