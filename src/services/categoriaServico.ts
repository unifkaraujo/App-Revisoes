import {Categoria, DadosCategoria} from '../types/Categoria';
import {clienteHttp} from './clienteHttp';
import {caminhoCategorias, caminhoUsuario} from './caminhos';
import {paraListaComId, RespostaColecao} from './conversores';

interface RespostaCriacao {
  name: string;
}

export async function buscarCategorias(): Promise<Categoria[]> {
  const {data} = await clienteHttp.get<RespostaColecao<DadosCategoria>>(
    `${caminhoCategorias()}.json`,
  );
  return paraListaComId(data);
}

export async function criarCategoria(
  categoria: DadosCategoria,
): Promise<Categoria> {
  const {data} = await clienteHttp.post<RespostaCriacao>(
    `${caminhoCategorias()}.json`,
    categoria,
  );
  return {id: data.name, ...categoria};
}

function remocoesDaCategoria(id: string, idsRevisoes: string[]) {
  const remocoes: Record<string, null> = {[`categorias/${id}`]: null};
  idsRevisoes.forEach(idRevisao => {
    remocoes[`revisoes/${idRevisao}/categoriaId`] = null;
  });
  return remocoes;
}

export async function excluirCategoria(
  id: string,
  idsRevisoes: string[],
): Promise<void> {
  await clienteHttp.patch(
    `${caminhoUsuario()}.json`,
    remocoesDaCategoria(id, idsRevisoes),
  );
}
