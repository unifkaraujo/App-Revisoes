import React, {ReactNode} from 'react';
import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import {cores} from '../theme/cores';

interface ModalDialogoProps {
  visivel: boolean;
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

export default function ModalDialogo({
  visivel,
  titulo,
  onFechar,
  children,
}: ModalDialogoProps) {
  return (
    <Modal
      visible={visivel}
      transparent
      statusBarTranslucent
      onRequestClose={onFechar}
      animationType="fade">
      <View style={estilos.sobreposicao}>
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>{titulo}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const {width: larguraTela, height: alturaTela} = Dimensions.get('window');

const estilos = StyleSheet.create({
  sobreposicao: {
    flex: 1,
    backgroundColor: cores.sobreposicao,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudo: {
    backgroundColor: cores.superficie,
    padding: 20,
    borderRadius: 10,
    width: larguraTela * 0.85,
    maxHeight: alturaTela * 0.8,
    elevation: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: cores.textoPrincipal,
  },
});
