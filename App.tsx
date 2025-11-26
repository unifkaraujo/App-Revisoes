import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#e0f0ff" barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#e0f0ff',
        }}>
        <HomeScreen />
      </SafeAreaView>
    </>
  );
}
