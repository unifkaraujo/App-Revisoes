import React from 'react';
import {StyleSheet, View} from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import BarraPesquisa from '../../components/BarraPesquisa';
import CarregamentoTela from '../../components/CarregamentoTela';
import BotaoFlutuante from '../../components/BotaoFlutuante';
import BotaoLink from '../../components/BotaoLink';
import ListaRevisoes from './components/ListaRevisoes';
import ModalFormularioRevisao from './components/ModalFormularioRevisao';
import {useRevisoes} from './hooks/useRevisoes';
import {usePesquisaRevisoes} from './hooks/usePesquisaRevisoes';
import {useModalRevisao} from './hooks/useModalRevisao';
import {DadosRevisao} from '../../types/Revisao';
import {confirmarExclusao, confirmarSaida} from '../../utils/alertas';
import {cores} from '../../theme/cores';
import {sair} from '../../services/autenticacaoServico';

export default function Inicio() {
  const {revisoes, carregando, idExcluindo, salvar, excluir} = useRevisoes();
  const {pesquisa, setPesquisa, revisoesFiltradas} =
    usePesquisaRevisoes(revisoes);
  const modal = useModalRevisao();

  const salvarEFechar = async (revisao: DadosRevisao, id?: string) => {
    await salvar(revisao, id);
    modal.fechar();
  };

  const pedirExclusao = (id: string) => confirmarExclusao(() => excluir(id));

  return (
    <View style={estilos.container}>
      <Cabecalho
        icone="📘"
        titulo="RevisõesApp"
        acao={<BotaoLink texto="Sair" onPress={() => confirmarSaida(sair)} />}
      />
      <BarraPesquisa
        value={pesquisa}
        onChangeText={setPesquisa}
        placeholder="Pesquisar textos..."
      />
      {carregando ? (
        <CarregamentoTela />
      ) : (
        <ListaRevisoes
          revisoes={revisoesFiltradas}
          idExcluindo={idExcluindo}
          onSelecionar={modal.abrirEdicao}
          onExcluir={pedirExclusao}
        />
      )}
      <BotaoFlutuante onPress={modal.abrirNova} />
      <ModalFormularioRevisao
        visivel={modal.visivel}
        revisao={modal.revisaoSelecionada}
        onFechar={modal.fechar}
        onSalvar={salvarEFechar}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
});
