import {useCallback, useState} from 'react';
import {Revisao} from '../../../types/Revisao';

export function useEdicaoRevisao() {
  const [aberto, setAberto] = useState(false);
  const [revisaoSelecionada, setRevisaoSelecionada] = useState<Revisao | null>(
    null,
  );

  const abrir = useCallback((revisao: Revisao | null) => {
    setRevisaoSelecionada(revisao);
    setAberto(true);
  }, []);

  const abrirNova = useCallback(() => abrir(null), [abrir]);

  const fechar = useCallback(() => setAberto(false), []);

  return {aberto, revisaoSelecionada, abrirNova, abrirEdicao: abrir, fechar};
}
