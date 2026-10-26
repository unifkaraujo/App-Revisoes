import React from 'react';
import Inicio from '../screens/Inicio';
import RotasAcesso from './RotasAcesso';
import CarregamentoTela from '../components/CarregamentoTela';
import {useAutenticacao} from '../hooks/useAutenticacao';

export default function Rotas() {
  const {usuario, verificando} = useAutenticacao();

  if (verificando) {
    return <CarregamentoTela />;
  }
  return usuario ? <Inicio /> : <RotasAcesso />;
}
