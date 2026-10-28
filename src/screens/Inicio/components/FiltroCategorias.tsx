import React from 'react';
import {StyleSheet, View} from 'react-native';
import Chip from '../../../components/Chip';
import {Categoria} from '../../../types/Categoria';

interface FiltroCategoriasProps {
  principais: Categoria[];
  idSelecionado: string | null;
  onSelecionar: (id: string | null) => void;
  onVerTodas: () => void;
}

export default function FiltroCategorias({
  principais,
  idSelecionado,
  onSelecionar,
  onVerTodas,
}: FiltroCategoriasProps) {
  if (!principais.length) {
    return null;
  }

  const alternar = (id: string) =>
    onSelecionar(id === idSelecionado ? null : id);

  return (
    <View style={estilos.linha}>
      <Chip
        texto="Todas"
        selecionado={!idSelecionado}
        onPress={() => onSelecionar(null)}
      />
      {principais.map(categoria => (
        <Chip
          key={categoria.id}
          texto={categoria.nome}
          cor={categoria.cor}
          selecionado={categoria.id === idSelecionado}
          onPress={() => alternar(categoria.id)}
        />
      ))}
      <Chip texto="Ver todas ▾" onPress={onVerTodas} />
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
});
