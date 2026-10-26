import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {cores} from '../theme/cores';

export default function CampoTexto({style, ...propsCampo}: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={cores.placeholder}
      style={[estilos.campo, style]}
      {...propsCampo}
    />
  );
}

const estilos = StyleSheet.create({
  campo: {
    backgroundColor: cores.superficie,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: cores.borda,
    color: cores.textoPrincipal,
  },
});
