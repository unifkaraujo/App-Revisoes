import {Revisao} from '../types/Revisao';
import {converterDataBr, formatarDataBr, somarDiasAHoje} from './datas';

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

export function filtrarPorPesquisa(
  revisoes: Revisao[],
  pesquisa: string,
): Revisao[] {
  const termo = pesquisa.toLowerCase();
  return revisoes.filter(revisao => correspondePesquisa(revisao, termo));
}

export function calcularDataRevisao(numeroDias: string): string {
  const dias = parseInt(numeroDias, 10);
  return isNaN(dias) ? '' : formatarDataBr(somarDiasAHoje(dias));
}
