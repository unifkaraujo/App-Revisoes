import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IndicadorCarregamento from './IndicadorCarregamento';
import {cores} from '../theme/cores';

type VarianteBotao = 'primario' | 'secundario';

interface BotaoProps {
  titulo: string;
  onPress: () => void;
  variante?: VarianteBotao;
  desabilitado?: boolean;
  carregando?: boolean;
}

export default function Botao({
  titulo,
  onPress,
  variante = 'primario',
  desabilitado = false,
  carregando = false,
}: BotaoProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={desabilitado}
      style={[estilos.botao, estilosVariante[variante]]}>
      <Text style={estilos.texto}>{titulo}</Text>
      {carregando && (
        <IndicadorCarregamento tamanho="small" cor={cores.branco} />
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderRadius: 7,
    gap: 4,
  },
  texto: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '600',
  },
});

const estilosVariante = StyleSheet.create({
  primario: {backgroundColor: cores.primaria},
  secundario: {backgroundColor: cores.neutra},
});
