import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CampoTextoComRotulo from '../../../components/CampoTextoComRotulo';
import {cores} from '../../../theme/cores';

interface CampoDiasRevisaoProps {
  value: string;
  dataRevisao: string;
  onChangeText: (texto: string) => void;
}

export default function CampoDiasRevisao({
  value,
  dataRevisao,
  onChangeText,
}: CampoDiasRevisaoProps) {
  return (
    <View style={estilos.linha}>
      <CampoTextoComRotulo
        rotulo="Número de dias"
        placeholder="Ex: 5"
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        estiloContainer={estilos.campo}
      />
      {dataRevisao ? (
        <View style={estilos.containerPrevia}>
          <Text style={estilos.previa}>{dataRevisao}</Text>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  campo: {
    flex: 1,
  },
  containerPrevia: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingTop: 20,
  },
  previa: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.textoSecundario,
  },
});
