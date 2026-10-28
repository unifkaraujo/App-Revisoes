import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import CartaoRevisao from './CartaoRevisao';
import {Revisao} from '../../../types/Revisao';
import {Categoria} from '../../../types/Categoria';

interface ListaRevisoesProps {
  revisoes: Revisao[];
  categoriasPorId: Record<string, Categoria>;
  idExcluindo: string | null;
  onSelecionar: (revisao: Revisao) => void;
  onExcluir: (id: string) => void;
}

export default function ListaRevisoes({
  revisoes,
  categoriasPorId,
  idExcluindo,
  onSelecionar,
  onExcluir,
}: ListaRevisoesProps) {
  return (
    <FlatList
      data={revisoes}
      keyExtractor={revisao => revisao.id}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews
      contentContainerStyle={estilos.conteudo}
      renderItem={({item: revisao}) => (
        <CartaoRevisao
          revisao={revisao}
          categoria={
            revisao.categoriaId
              ? categoriasPorId[revisao.categoriaId]
              : undefined
          }
          excluindo={revisao.id === idExcluindo}
          onSelecionar={onSelecionar}
          onExcluir={onExcluir}
        />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    paddingBottom: 80,
  },
});
