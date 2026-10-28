import {useCallback, useEffect, useState} from 'react';
import {
  buscarRevisoes,
  excluirRevisao,
  salvarRevisao,
} from '../../../services/revisaoServico';
import {DadosRevisao, Revisao} from '../../../types/Revisao';
import {ordenarPorDataRevisao} from '../../../utils/regrasRevisao';

export function useRevisoes() {
  const [revisoes, setRevisoes] = useState<Revisao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [idExcluindo, setIdExcluindo] = useState<string | null>(null);

  const carregarRevisoes = useCallback(async () => {
    setCarregando(true);
    try {
      setRevisoes(ordenarPorDataRevisao(await buscarRevisoes()));
    } finally {
      setCarregando(false);
    }
  }, []);

  const recarregar = useCallback(() => {
    carregarRevisoes().catch(console.error);
  }, [carregarRevisoes]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const salvar = useCallback(
    async (revisao: DadosRevisao, id?: string) => {
      await salvarRevisao(revisao, id);
      recarregar();
    },
    [recarregar],
  );

  const excluir = useCallback(
    async (id: string) => {
      setIdExcluindo(id);
      try {
        await excluirRevisao(id);
        recarregar();
      } finally {
        setIdExcluindo(null);
      }
    },
    [recarregar],
  );

  return {revisoes, carregando, idExcluindo, salvar, excluir, recarregar};
}
