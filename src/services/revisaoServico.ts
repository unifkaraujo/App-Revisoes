import {DadosRevisao, Revisao} from '../types/Revisao';
import {clienteHttp} from './clienteHttp';
import {obterIdUsuario} from './autenticacaoServico';

type RespostaRevisoes = Record<string, DadosRevisao> | null;

function caminhoRevisoes(): string {
  return `/usuarios/${obterIdUsuario()}/revisoes`;
}

function caminhoRevisao(id: string): string {
  return `${caminhoRevisoes()}/${id}.json`;
}

function paraRevisoes(resposta: RespostaRevisoes): Revisao[] {
  if (!resposta) {
    return [];
  }
  return Object.entries(resposta).map(([id, revisao]) => ({id, ...revisao}));
}

export async function buscarRevisoes(): Promise<Revisao[]> {
  const {data} = await clienteHttp.get<RespostaRevisoes>(
    `${caminhoRevisoes()}.json`,
  );
  return paraRevisoes(data);
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
