import {useMemo, useState} from 'react';
import {Revisao} from '../../../types/Revisao';
import {filtrarPorPesquisa} from '../../../utils/regrasRevisao';

export function usePesquisaRevisoes(revisoes: Revisao[]) {
  const [pesquisa, setPesquisa] = useState('');

  const revisoesFiltradas = useMemo(
    () => filtrarPorPesquisa(revisoes, pesquisa),
    [revisoes, pesquisa],
  );

  return {pesquisa, setPesquisa, revisoesFiltradas};
}
