import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {cores} from '../theme/cores';

interface CabecalhoProps {
  icone: string;
  titulo: string;
  acao?: ReactNode;
}

export default function Cabecalho({icone, titulo, acao}: CabecalhoProps) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.icone}>{icone}</Text>
      <Text style={estilos.titulo}>{titulo}</Text>
      {acao}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.fundoCabecalho,
    padding: 16,
  },
  icone: {
    fontSize: 24,
    marginRight: 8,
  },
  titulo: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.tituloCabecalho,
  },
});
