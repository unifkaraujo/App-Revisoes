import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Cabecalho from '../../components/Cabecalho';
import BotaoLink from '../../components/BotaoLink';
import Botao from '../../components/Botao';
import CampoTextoComRotulo from '../../components/CampoTextoComRotulo';
import CampoCategoria from './components/CampoCategoria';
import CampoDiasRevisao from './components/CampoDiasRevisao';
import CampoConteudo from './components/CampoConteudo';
import {useFormularioRevisao} from './hooks/useFormularioRevisao';
import {useBotaoVoltar} from '../../hooks/useBotaoVoltar';
import {DadosRevisao, Revisao} from '../../types/Revisao';
import {Categoria} from '../../types/Categoria';
import {cores} from '../../theme/cores';

interface FormularioRevisaoProps {
  revisao: Revisao | null;
  categorias: Categoria[];
  onFechar: () => void;
  onSalvar: (revisao: DadosRevisao, id?: string) => Promise<void>;
  onCriarCategoria: (nome: string) => Promise<Categoria>;
}

export default function FormularioRevisao({
  revisao,
  categorias,
  onFechar,
  onSalvar,
  onCriarCategoria,
}: FormularioRevisaoProps) {
  const formulario = useFormularioRevisao({revisao, onSalvar});

  useBotaoVoltar(true, onFechar);

  return (
    <View style={estilos.tela}>
      <Cabecalho
        icone="📝"
        titulo={formulario.editando ? 'Editar Texto' : 'Novo Texto'}
        acao={<BotaoLink texto="Cancelar" onPress={onFechar} />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={estilos.conteudo}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={24}
        enableOnAndroid>
        <CampoTextoComRotulo
          rotulo="Título"
          placeholder="Digite o título"
          value={formulario.valores.titulo}
          onChangeText={formulario.alterarCampo('titulo')}
        />
        <CampoCategoria
          categorias={categorias}
          value={formulario.valores.categoriaId}
          onSelecionar={formulario.alterarCampo('categoriaId')}
          onCriar={onCriarCategoria}
        />
        <CampoConteudo
          value={formulario.valores.conteudo}
          onChangeText={formulario.alterarCampo('conteudo')}
          expandidoInicial={!formulario.editando}
        />
        <CampoDiasRevisao
          value={formulario.valores.numeroRevisao}
          dataRevisao={formulario.dataRevisao}
          onChangeText={formulario.alterarCampo('numeroRevisao')}
        />
        <Botao
          titulo={formulario.editando ? 'ATUALIZAR' : 'ADICIONAR'}
          onPress={formulario.salvar}
          desabilitado={!formulario.podeSalvar}
          carregando={formulario.salvando}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
  },
});
