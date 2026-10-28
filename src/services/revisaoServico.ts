import {DadosRevisao, Revisao} from '../types/Revisao';
import {clienteHttp} from './clienteHttp';
import {caminhoRevisoes} from './caminhos';
import {paraListaComId, RespostaColecao} from './conversores';

function caminhoRevisao(id: string): string {
  return `${caminhoRevisoes()}/${id}.json`;
}

export async function buscarRevisoes(): Promise<Revisao[]> {
  const {data} = await clienteHttp.get<RespostaColecao<DadosRevisao>>(
    `${caminhoRevisoes()}.json`,
  );
  return paraListaComId(data);
}

async function criarRevisao(revisao: DadosRevisao): Promise<void> {
  await clienteHttp.post(`${caminhoRevisoes()}.json`, revisao);
}

async function atualizarRevisao(
  id: string,
  revisao: DadosRevisao,
): Promise<void> {
  await clienteHttp.put(caminhoRevisao(id), revisao);
}

export function salvarRevisao(
  revisao: DadosRevisao,
  id?: string,
): Promise<void> {
  return id ? atualizarRevisao(id, revisao) : criarRevisao(revisao);
}

export async function excluirRevisao(id: string): Promise<void> {
  await clienteHttp.delete(caminhoRevisao(id));
}
