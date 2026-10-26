import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Rotas from './src/navigation/Rotas';
import {cores} from './src/theme/cores';

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={cores.fundoCabecalho}
        barStyle="dark-content"
      />
      <SafeAreaView style={estilos.container}>
        <Rotas />
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoCabecalho,
  },
});
