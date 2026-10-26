import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {cores} from '../theme/cores';

interface IndicadorCarregamentoProps {
  tamanho?: number | 'small' | 'large';
  cor?: string;
}

export default function IndicadorCarregamento({
  tamanho = 'large',
  cor = cores.primaria,
}: IndicadorCarregamentoProps) {
  return (
    <View style={estilos.container}>
      <ActivityIndicator size={tamanho} color={cor} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
