import React from 'react';
import {StyleSheet, View} from 'react-native';
import RotuloCampo from '../../../components/RotuloCampo';
import Chip from '../../../components/Chip';
import CampoTexto from '../../../components/CampoTexto';
import BotaoLink from '../../../components/BotaoLink';
import {useNovaCategoria} from '../hooks/useNovaCategoria';
import {Categoria} from '../../../types/Categoria';

interface CampoCategoriaProps {
  categorias: Categoria[];
  value: string;
  onSelecionar: (id: string) => void;
  onCriar: (nome: string) => Promise<Categoria>;
}

export default function CampoCategoria({
  categorias,
  value,
  onSelecionar,
  onCriar,
}: CampoCategoriaProps) {
  const novaCategoria = useNovaCategoria({
    onCriar,
    onCriada: categoria => onSelecionar(categoria.id),
  });

  const alternar = (id: string) => onSelecionar(id === value ? '' : id);

  return (
    <View style={estilos.container}>
      <RotuloCampo texto="Categoria" />
      <View style={estilos.chips}>
        {categorias.map(categoria => (
          <Chip
            key={categoria.id}
            texto={categoria.nome}
            cor={categoria.cor}
            selecionado={categoria.id === value}
            onPress={() => alternar(categoria.id)}
          />
        ))}
        <Chip
          texto="+ Nova"
          selecionado={novaCategoria.aberto}
          onPress={novaCategoria.alternar}
        />
      </View>
      {novaCategoria.aberto ? (
        <View style={estilos.linhaNova}>
          <CampoTexto
            placeholder="Nome da categoria"
            value={novaCategoria.nome}
            onChangeText={novaCategoria.setNome}
            onSubmitEditing={novaCategoria.criar}
            style={estilos.campoNova}
            autoFocus
          />
          <BotaoLink
            texto={novaCategoria.criando ? 'Criando...' : 'Criar'}
            onPress={novaCategoria.criar}
          />
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  linhaNova: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  campoNova: {
    flex: 1,
    marginBottom: 0,
  },
});
