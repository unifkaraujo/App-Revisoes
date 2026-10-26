import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {cores} from '../theme/cores';

interface BotaoFlutuanteProps {
  onPress: () => void;
  rotulo?: string;
}

export default function BotaoFlutuante({
  onPress,
  rotulo = '+',
}: BotaoFlutuanteProps) {
  return (
    <TouchableOpacity style={estilos.botao} onPress={onPress}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: cores.primaria,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  rotulo: {
    fontSize: 28,
    color: cores.branco,
    lineHeight: 30,
  },
});
