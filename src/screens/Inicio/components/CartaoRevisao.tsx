import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Revisao} from '../../../types/Revisao';
import {Categoria} from '../../../types/Categoria';
import {cores} from '../../../theme/cores';

interface CartaoRevisaoProps {
  revisao: Revisao;
  categoria?: Categoria;
  excluindo: boolean;
  onSelecionar: (revisao: Revisao) => void;
  onExcluir: (id: string) => void;
}

export default function CartaoRevisao({
  revisao,
  categoria,
  excluindo,
  onSelecionar,
  onExcluir,
}: CartaoRevisaoProps) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onSelecionar(revisao)}>
      <View
        style={[estilos.cartao, categoria && {backgroundColor: categoria.cor}]}>
        <View style={estilos.cabecalho}>
          <View style={estilos.containerTitulo}>
            <Text style={estilos.titulo}>{revisao.titulo}</Text>
            {categoria ? (
              <Text style={estilos.categoria}>{categoria.nome}</Text>
            ) : null}
          </View>
          <Text style={estilos.data}>{revisao.dataRevisao}</Text>
        </View>
        <Text numberOfLines={2} style={estilos.conteudo}>
          {revisao.conteudo}
        </Text>
        <View style={estilos.acoes}>
          <TouchableOpacity onPress={() => onExcluir(revisao.id)}>
            <Text style={estilos.textoAcao}>
              {excluindo ? 'Excluindo...' : 'Excluir'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  containerTitulo: {
    flex: 1,
    paddingRight: 8,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: cores.textoForte,
  },
  data: {
    backgroundColor: cores.destaqueSuave,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 14,
    color: cores.destaque,
  },
  categoria: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    color: cores.textoSecundario,
  },
  conteudo: {
    color: cores.textoSuave,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  textoAcao: {
    marginLeft: 20,
    color: cores.tituloCabecalho,
  },
});
