import {Categoria} from '../types/Categoria';
import {Revisao} from '../types/Revisao';

function normalizar(nome: string): string {
  return nome.trim().toLowerCase();
}

export function encontrarPorNome(
  categorias: Categoria[],
  nome: string,
): Categoria | undefined {
  return categorias.find(
    categoria => normalizar(categoria.nome) === normalizar(nome),
  );
}

export function ordenarPorNome(categorias: Categoria[]): Categoria[] {
  return [...categorias].sort((a, b) => a.nome.localeCompare(b.nome));
}

export function indexarPorId(
  categorias: Categoria[],
): Record<string, Categoria> {
  return Object.fromEntries(
    categorias.map(categoria => [categoria.id, categoria]),
  );
}

export function contarPorCategoria(
  revisoes: Revisao[],
): Record<string, number> {
  return revisoes.reduce<Record<string, number>>((contagem, revisao) => {
    if (revisao.categoriaId) {
      contagem[revisao.categoriaId] = (contagem[revisao.categoriaId] ?? 0) + 1;
    }
    return contagem;
  }, {});
}

function ordenarPorUso(
  categorias: Categoria[],
  contagem: Record<string, number>,
): Categoria[] {
  return [...categorias].sort(
    (a, b) => (contagem[b.id] ?? 0) - (contagem[a.id] ?? 0),
  );
}

export function escolherPrincipais(
  categorias: Categoria[],
  contagem: Record<string, number>,
  idSelecionado: string | null,
  limite: number,
): Categoria[] {
  const principais = ordenarPorUso(categorias, contagem).slice(0, limite);
  const selecionada = categorias.find(({id}) => id === idSelecionado);
  if (!selecionada || principais.includes(selecionada)) {
    return principais;
  }
  return [...principais.slice(0, limite - 1), selecionada];
}
