import {addDays, format, parse} from 'date-fns';

const FORMATO_DATA_BR = 'dd/MM/yyyy';

export function formatarDataBr(data: Date): string {
  return format(data, FORMATO_DATA_BR);
}

export function converterDataBr(valor: string): Date {
  return parse(valor, FORMATO_DATA_BR, new Date());
}

export function somarDiasAHoje(dias: number): Date {
  return addDays(new Date(), dias);
}
