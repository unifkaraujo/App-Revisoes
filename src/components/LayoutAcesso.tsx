import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {cores} from '../theme/cores';

interface LayoutAcessoProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}

export default function LayoutAcesso({
  titulo,
  subtitulo,
  children,
}: LayoutAcessoProps) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={estilos.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid>
      <Text style={estilos.icone}>📘</Text>
      <Text style={estilos.nomeApp}>RevisõesApp</Text>
      <View style={estilos.cartao}>
        <Text style={estilos.titulo}>{titulo}</Text>
        {subtitulo && <Text style={estilos.subtitulo}>{subtitulo}</Text>}
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: cores.fundoCabecalho,
  },
  icone: {
    fontSize: 48,
    textAlign: 'center',
  },
  nomeApp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: cores.tituloCabecalho,
    marginBottom: 24,
  },
  cartao: {
    backgroundColor: cores.superficie,
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: cores.textoPrincipal,
    marginBottom: 15,
  },
  subtitulo: {
    textAlign: 'center',
    color: cores.textoSuave,
    marginTop: -8,
    marginBottom: 15,
  },
});
