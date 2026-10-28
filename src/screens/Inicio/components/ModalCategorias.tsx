import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalDialogo from '../../../components/ModalDialogo';
import Botao from '../../../components/Botao';
import {Categoria} from '../../../types/Categoria';
import {cores} from '../../../theme/cores';

interface ModalCategoriasProps {
  visivel: boolean;
  categorias: Categoria[];
  contagem: Record<string, number>;
  idSelecionado: string | null;
  onSelecionar: (id: string | null) => void;
  onExcluir: (categoria: Categoria) => void;
  onFechar: () => void;
}

interface LinhaCategoriaProps {
  nome: string;
  cor: string;
  quantidade?: number;
  selecionada: boolean;
  onPress: () => void;
  onExcluir?: () => void;
}

function LinhaCategoria({
  nome,
  cor,
  quantidade,
  selecionada,
  onPress,
  onExcluir,
}: LinhaCategoriaProps) {
  return (
    <View style={[estilos.linha, selecionada && estilos.linhaSelecionada]}>
      <TouchableOpacity style={estilos.areaNome} onPress={onPress}>
        <View style={[estilos.marcador, {backgroundColor: cor}]} />
        <Text numberOfLines={1} style={estilos.nome}>
          {nome}
        </Text>
        {quantidade !== undefined && (
          <Text style={estilos.quantidade}>{quantidade}</Text>
        )}
      </TouchableOpacity>
      {onExcluir && (
        <TouchableOpacity onPress={onExcluir} style={estilos.botaoExcluir}>
          <Text style={estilos.textoExcluir}>Excluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function ModalCategorias({
  visivel,
  categorias,
  contagem,
  idSelecionado,
  onSelecionar,
  onExcluir,
  onFechar,
}: ModalCategoriasProps) {
  const selecionar = (id: string | null) => {
    onSelecionar(id);
    onFechar();
  };

  return (
    <ModalDialogo visivel={visivel} titulo="Categorias" onFechar={onFechar}>
      <ScrollView style={estilos.lista}>
        <LinhaCategoria
          nome="Todas"
          cor={cores.superficie}
          selecionada={!idSelecionado}
          onPress={() => selecionar(null)}
        />
        {categorias.map(categoria => (
          <LinhaCategoria
            key={categoria.id}
            nome={categoria.nome}
            cor={categoria.cor}
            quantidade={contagem[categoria.id] ?? 0}
            selecionada={categoria.id === idSelecionado}
            onPress={() => selecionar(categoria.id)}
            onExcluir={() => onExcluir(categoria)}
          />
        ))}
      </ScrollView>
      <Botao titulo="FECHAR" variante="secundario" onPress={onFechar} />
    </ModalDialogo>
  );
}

const estilos = StyleSheet.create({
  lista: {
    marginBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  linhaSelecionada: {
    backgroundColor: cores.destaqueSuave,
  },
  areaNome: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  marcador: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  nome: {
    flex: 1,
    fontSize: 16,
    color: cores.textoPrincipal,
  },
  quantidade: {
    fontSize: 14,
    color: cores.textoSuave,
  },
  botaoExcluir: {
    paddingVertical: 12,
    paddingLeft: 16,
  },
  textoExcluir: {
    color: cores.erro,
  },
});
