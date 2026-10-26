import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {cores} from '../theme/cores';

interface RotuloCampoProps {
  texto: string;
}

export default function RotuloCampo({texto}: RotuloCampoProps) {
  return <Text style={estilos.rotulo}>{texto}</Text>;
}

const estilos = StyleSheet.create({
  rotulo: {
    fontWeight: '600',
    marginBottom: 4,
    color: cores.textoSecundario,
  },
});
