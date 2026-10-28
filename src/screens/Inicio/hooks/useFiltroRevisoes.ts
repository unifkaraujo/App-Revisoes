import {useCallback, useMemo, useState} from 'react';
import {Revisao} from '../../../types/Revisao';
import {filtrarRevisoes} from '../../../utils/regrasRevisao';

export function useFiltroRevisoes(revisoes: Revisao[]) {
  const [pesquisa, setPesquisa] = useState('');
  const [idCategoria, setIdCategoria] = useState<string | null>(null);

  const revisoesFiltradas = useMemo(
    () => filtrarRevisoes(revisoes, {pesquisa, idCategoria}),
    [revisoes, pesquisa, idCategoria],
  );

  const removerCategoriaDoFiltro = useCallback(
    (id: string) => setIdCategoria(atual => (atual === id ? null : atual)),
    [],
  );

  return {
    pesquisa,
    setPesquisa,
    idCategoria,
    setIdCategoria,
    removerCategoriaDoFiltro,
    revisoesFiltradas,
  };
}
