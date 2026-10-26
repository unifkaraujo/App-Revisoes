import React from 'react';
import {StyleSheet, View} from 'react-native';
import IndicadorCarregamento from './IndicadorCarregamento';
import {cores} from '../theme/cores';

export default function CarregamentoTela() {
  return (
    <View style={estilos.container}>
      <IndicadorCarregamento tamanho={40} cor={cores.textoSecundario} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
