import {useMemo} from 'react';
import {Categoria} from '../../../types/Categoria';
import {Revisao} from '../../../types/Revisao';
import {
  contarPorCategoria,
  escolherPrincipais,
} from '../../../utils/regrasCategoria';

const LIMITE_PRINCIPAIS = 3;

interface UseCategoriasPrincipaisParametros {
  categorias: Categoria[];
  revisoes: Revisao[];
  idSelecionado: string | null;
}

export function useCategoriasPrincipais({
  categorias,
  revisoes,
  idSelecionado,
}: UseCategoriasPrincipaisParametros) {
  const contagem = useMemo(() => contarPorCategoria(revisoes), [revisoes]);

  const principais = useMemo(
    () =>
      escolherPrincipais(
        categorias,
        contagem,
        idSelecionado,
        LIMITE_PRINCIPAIS,
      ),
    [categorias, contagem, idSelecionado],
  );

  return {contagem, principais};
}
