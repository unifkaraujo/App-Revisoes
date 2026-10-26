import {useCallback, useState} from 'react';
import {Revisao} from '../../../types/Revisao';

export function useModalRevisao() {
  const [visivel, setVisivel] = useState(false);
  const [revisaoSelecionada, setRevisaoSelecionada] = useState<Revisao | null>(
    null,
  );

  const abrir = useCallback((revisao: Revisao | null) => {
    setRevisaoSelecionada(revisao);
    setVisivel(true);
  }, []);

  const abrirNova = useCallback(() => abrir(null), [abrir]);

  const fechar = useCallback(() => setVisivel(false), []);

  return {visivel, revisaoSelecionada, abrirNova, abrirEdicao: abrir, fechar};
}
