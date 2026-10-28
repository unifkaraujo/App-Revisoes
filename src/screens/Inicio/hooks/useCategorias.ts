import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  buscarCategorias,
  criarCategoria,
  excluirCategoria,
} from '../../../services/categoriaServico';
import {Categoria} from '../../../types/Categoria';
import {gerarCorCategoria} from '../../../utils/coresCategoria';
import {
  encontrarPorNome,
  indexarPorId,
  ordenarPorNome,
} from '../../../utils/regrasCategoria';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    buscarCategorias()
      .then(lista => setCategorias(ordenarPorNome(lista)))
      .catch(console.error);
  }, []);

  const criar = useCallback(
    async (nome: string): Promise<Categoria> => {
      const existente = encontrarPorNome(categorias, nome);
      if (existente) {
        return existente;
      }
      const nova = await criarCategoria({
        nome: nome.trim(),
        cor: gerarCorCategoria(categorias.map(categoria => categoria.cor)),
      });
      setCategorias(atuais => ordenarPorNome([...atuais, nova]));
      return nova;
    },
    [categorias],
  );

  const excluir = useCallback(async (id: string, idsRevisoes: string[]) => {
    await excluirCategoria(id, idsRevisoes);
    setCategorias(atuais => atuais.filter(categoria => categoria.id !== id));
  }, []);

  const categoriasPorId = useMemo(() => indexarPorId(categorias), [categorias]);

  return {categorias, categoriasPorId, criar, excluir};
}
