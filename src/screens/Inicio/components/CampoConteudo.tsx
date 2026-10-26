import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import RotuloCampo from '../../../components/RotuloCampo';
import CampoTexto from '../../../components/CampoTexto';

interface CampoConteudoProps {
  value: string;
  onChangeText: (texto: string) => void;
}

export default function CampoConteudo({
  value,
  onChangeText,
}: CampoConteudoProps) {
  return (
    <>
      <RotuloCampo texto="Conteúdo" />
      <ScrollView style={estilos.rolagem} keyboardShouldPersistTaps="handled">
        <CampoTexto
          placeholder="Digite o conteúdo"
          value={value}
          onChangeText={onChangeText}
          style={estilos.campo}
          multiline
        />
      </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  rolagem: {
    maxHeight: 150,
    marginBottom: 15,
  },
  campo: {
    minHeight: 100,
  },
});
