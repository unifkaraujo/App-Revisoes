import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import BarraPesquisa from '../../components/BarraPesquisa';
import CarregamentoTela from '../../components/CarregamentoTela';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import BotaoLink from '../../components/BotaoLink';
import FiltroCategorias from './components/FiltroCategorias';
import ModalCategorias from './components/ModalCategorias';
import ListaRevisoes from './components/ListaRevisoes';
import FormularioRevisao from '../FormularioRevisao';
import {useRevisoes} from './hooks/useRevisoes';
import {useCategorias} from './hooks/useCategorias';
import {useCategoriasPrincipais} from './hooks/useCategoriasPrincipais';
import {useFiltroRevisoes} from './hooks/useFiltroRevisoes';
import {useEdicaoRevisao} from './hooks/useEdicaoRevisao';
import {DadosRevisao} from '../../types/Revisao';
import {Categoria} from '../../types/Categoria';
import {idsDaCategoria} from '../../utils/regrasRevisao';
import {
  confirmarExclusao,
  confirmarExclusaoCategoria,
  confirmarSaida,
} from '../../utils/alertas';
import {cores} from '../../theme/cores';
import {sair} from '../../services/autenticacaoServico';
import {NOME_APP} from '../../config/app';

export default function Inicio() {
  const {revisoes, carregando, idExcluindo, salvar, excluir, recarregar} =
    useRevisoes();
  const categorias = useCategorias();
  const filtro = useFiltroRevisoes(revisoes);
  const {contagem, principais} = useCategoriasPrincipais({
    categorias: categorias.categorias,
    revisoes,
    idSelecionado: filtro.idCategoria,
  });
  const edicao = useEdicaoRevisao();
  const [listaCategoriasAberta, setListaCategoriasAberta] = useState(false);

  const salvarEFechar = async (revisao: DadosRevisao, id?: string) => {
    await salvar(revisao, id);
    edicao.fechar();
  };

  const pedirExclusao = (id: string) => confirmarExclusao(() => excluir(id));

  const excluirCategoria = (categoria: Categoria) => {
    filtro.removerCategoriaDoFiltro(categoria.id);
    categorias
      .excluir(categoria.id, idsDaCategoria(revisoes, categoria.id))
      .then(recarregar)
      .catch(console.error);
  };

  const pedirExclusaoCategoria = (categoria: Categoria) =>
    confirmarExclusaoCategoria(categoria.nome, () =>
      excluirCategoria(categoria),
    );

  return (
    <View style={estilos.container}>
      <Cabecalho
        icone="📘"
        titulo={NOME_APP}
        acao={<BotaoLink texto="Sair" onPress={() => confirmarSaida(sair)} />}
      />
      <BarraPesquisa
        value={filtro.pesquisa}
        onChangeText={filtro.setPesquisa}
        placeholder="Pesquisar textos..."
      />
      <FiltroCategorias
        principais={principais}
        idSelecionado={filtro.idCategoria}
        onSelecionar={filtro.setIdCategoria}
        onVerTodas={() => setListaCategoriasAberta(true)}
      />
      {carregando ? (
        <CarregamentoTela />
      ) : (
        <ListaRevisoes
          revisoes={filtro.revisoesFiltradas}
          categoriasPorId={categorias.categoriasPorId}
          idExcluindo={idExcluindo}
          onSelecionar={edicao.abrirEdicao}
          onExcluir={pedirExclusao}
        />
      )}
      <ModalCategorias
        visivel={listaCategoriasAberta}
        categorias={categorias.categorias}
        contagem={contagem}
        idSelecionado={filtro.idCategoria}
        onSelecionar={filtro.setIdCategoria}
        onExcluir={pedirExclusaoCategoria}
        onFechar={() => setListaCategoriasAberta(false)}
      />
      {edicao.aberto ? (
        <FormularioRevisao
          revisao={edicao.revisaoSelecionada}
          categorias={categorias.categorias}
          onFechar={edicao.fechar}
          onSalvar={salvarEFechar}
          onCriarCategoria={categorias.criar}
        />
      ) : (
        <BotaoFlutuante onPress={edicao.abrirNova} />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
});
