import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {cores} from '../theme/cores';

interface BotaoLinkProps {
  texto: string;
  onPress: () => void;
}

export default function BotaoLink({texto, onPress}: BotaoLinkProps) {
  return (
    <TouchableOpacity onPress={onPress} style={estilos.botao}>
      <Text style={estilos.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  texto: {
    color: cores.destaque,
    fontSize: 15,
  },
});
