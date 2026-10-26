import React from 'react';
import {StyleSheet, View} from 'react-native';
import ModalDialogo from '../../../components/ModalDialogo';
import CampoTextoComRotulo from '../../../components/CampoTextoComRotulo';
import Botao from '../../../components/Botao';
import CampoConteudo from './CampoConteudo';
import CampoDiasRevisao from './CampoDiasRevisao';
import {useFormularioRevisao} from '../hooks/useFormularioRevisao';
import {DadosRevisao, Revisao} from '../../../types/Revisao';

interface ModalFormularioRevisaoProps {
  visivel: boolean;
  revisao: Revisao | null;
  onFechar: () => void;
  onSalvar: (revisao: DadosRevisao, id?: string) => Promise<void>;
}

export default function ModalFormularioRevisao({
  visivel,
  revisao,
  onFechar,
  onSalvar,
}: ModalFormularioRevisaoProps) {
  const formulario = useFormularioRevisao({revisao, visivel, onSalvar});

  return (
    <ModalDialogo
      visivel={visivel}
      titulo="Adicionar Novo Texto"
      onFechar={onFechar}>
      <CampoTextoComRotulo
        rotulo="Título"
        placeholder="Digite o título"
        value={formulario.valores.titulo}
        onChangeText={formulario.alterarCampo('titulo')}
      />
      <CampoConteudo
        value={formulario.valores.conteudo}
        onChangeText={formulario.alterarCampo('conteudo')}
      />
      <CampoDiasRevisao
        value={formulario.valores.numeroRevisao}
        dataRevisao={formulario.dataRevisao}
        onChangeText={formulario.alterarCampo('numeroRevisao')}
      />
      <View style={estilos.acoes}>
        <Botao
          titulo={formulario.editando ? 'ATUALIZAR' : 'ADICIONAR'}
          onPress={formulario.salvar}
          desabilitado={!formulario.podeSalvar}
          carregando={formulario.salvando}
        />
        <Botao titulo="CANCELAR" variante="secundario" onPress={onFechar} />
      </View>
    </ModalDialogo>
  );
}

const estilos = StyleSheet.create({
  acoes: {
    gap: 10,
  },
});
