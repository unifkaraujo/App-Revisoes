import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RotuloCampo from '../../../components/RotuloCampo';
import CampoTexto from '../../../components/CampoTexto';
import {cores} from '../../../theme/cores';

const LINHAS_PREVIA = 8;

interface CampoConteudoProps {
  value: string;
  onChangeText: (texto: string) => void;
  expandidoInicial: boolean;
}

export default function CampoConteudo({
  value,
  onChangeText,
  expandidoInicial,
}: CampoConteudoProps) {
  const [expandido, setExpandido] = useState(expandidoInicial);

  return (
    <View style={estilos.container}>
      <RotuloCampo texto="Conteúdo" />
      {expandido ? (
        <CampoTexto
          placeholder="Digite o conteúdo"
          value={value}
          onChangeText={onChangeText}
          style={estilos.campo}
          multiline
        />
      ) : (
        <View style={estilos.previa}>
          <Text numberOfLines={LINHAS_PREVIA} style={estilos.textoPrevia}>
            {value}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setExpandido(atual => !atual)}
        style={estilos.alternador}>
        <Text style={estilos.textoAlternador}>
          {expandido ? '▲ Recolher' : '▼ Ver tudo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  campo: {
    minHeight: 160,
    textAlignVertical: 'top',
    marginBottom: 0,
  },
  previa: {
    backgroundColor: cores.superficie,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoPrevia: {
    color: cores.textoPrincipal,
  },
  alternador: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textoAlternador: {
    color: cores.destaque,
    fontWeight: '600',
  },
});
