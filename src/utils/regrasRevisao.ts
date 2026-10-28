import {Revisao} from '../types/Revisao';
import {converterDataBr, formatarDataBr, somarDiasAHoje} from './datas';

export interface FiltroRevisoes {
  pesquisa: string;
  idCategoria: string | null;
}

function obterTempoRevisao(revisao: Revisao): number {
  return converterDataBr(revisao.dataRevisao).getTime();
}

export function ordenarPorDataRevisao(revisoes: Revisao[]): Revisao[] {
  return [...revisoes].sort(
    (a, b) => obterTempoRevisao(a) - obterTempoRevisao(b),
  );
}

function contemTermo(texto: string = '', termo: string): boolean {
  return texto.toLowerCase().includes(termo);
}

function correspondePesquisa(revisao: Revisao, termo: string): boolean {
  return (
    contemTermo(revisao.titulo, termo) || contemTermo(revisao.conteudo, termo)
  );
}

function correspondeCategoria(
  revisao: Revisao,
  idCategoria: string | null,
): boolean {
  return !idCategoria || revisao.categoriaId === idCategoria;
}

export function filtrarRevisoes(
  revisoes: Revisao[],
  {pesquisa, idCategoria}: FiltroRevisoes,
): Revisao[] {
  const termo = pesquisa.toLowerCase();
  return revisoes.filter(
    revisao =>
      correspondeCategoria(revisao, idCategoria) &&
      correspondePesquisa(revisao, termo),
  );
}

export function idsDaCategoria(
  revisoes: Revisao[],
  idCategoria: string,
): string[] {
  return revisoes
    .filter(revisao => revisao.categoriaId === idCategoria)
    .map(revisao => revisao.id);
}

export function calcularDataRevisao(numeroDias: string): string {
  const dias = parseInt(numeroDias, 10);
  return isNaN(dias) ? '' : formatarDataBr(somarDiasAHoje(dias));
}
