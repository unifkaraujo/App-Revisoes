import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {cores} from '../theme/cores';

interface ChipProps {
  texto: string;
  cor?: string;
  selecionado?: boolean;
  onPress: () => void;
  estilo?: StyleProp<ViewStyle>;
}

export default function Chip({
  texto,
  cor = cores.superficie,
  selecionado = false,
  onPress,
  estilo,
}: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        estilos.chip,
        {backgroundColor: cor},
        selecionado && estilos.chipSelecionado,
        estilo,
      ]}>
      <Text numberOfLines={1} style={estilos.texto}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: cores.borda,
    maxWidth: '100%',
  },
  chipSelecionado: {
    borderColor: cores.tituloCabecalho,
  },
  texto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.textoSecundario,
  },
});
