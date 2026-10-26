import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {cores} from '../theme/cores';

interface BarraPesquisaProps {
  value: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
}

export default function BarraPesquisa({
  value,
  onChangeText,
  placeholder,
}: BarraPesquisaProps) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.icone}>🔍</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={estilos.campo}
        placeholderTextColor={cores.placeholder}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: cores.superficie,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  icone: {
    fontSize: 22,
    marginRight: 4,
  },
  campo: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: cores.textoSecundario,
  },
});
