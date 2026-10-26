import React from 'react';
import {StyleProp, TextInputProps, View, ViewStyle} from 'react-native';
import RotuloCampo from './RotuloCampo';
import CampoTexto from './CampoTexto';

interface CampoTextoComRotuloProps extends TextInputProps {
  rotulo: string;
  estiloContainer?: StyleProp<ViewStyle>;
}

export default function CampoTextoComRotulo({
  rotulo,
  estiloContainer,
  ...propsCampo
}: CampoTextoComRotuloProps) {
  return (
    <View style={estiloContainer}>
      <RotuloCampo texto={rotulo} />
      <CampoTexto {...propsCampo} />
    </View>
  );
}
