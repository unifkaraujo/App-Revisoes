import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Revisao} from '../../../types/Revisao';
import {cores} from '../../../theme/cores';

interface CartaoRevisaoProps {
  revisao: Revisao;
  excluindo: boolean;
  onSelecionar: (revisao: Revisao) => void;
  onExcluir: (id: string) => void;
}

export default function CartaoRevisao({
  revisao,
  excluindo,
  onSelecionar,
  onExcluir,
}: CartaoRevisaoProps) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onSelecionar(revisao)}>
      <View style={estilos.cartao}>
        <View style={estilos.cabecalho}>
          <View style={estilos.containerTitulo}>
            <Text style={estilos.titulo}>{revisao.titulo}</Text>
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
    color: cores.destaque,
  },
});
