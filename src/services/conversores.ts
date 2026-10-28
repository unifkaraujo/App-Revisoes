export type RespostaColecao<T> = Record<string, T> | null;

export function paraListaComId<T>(
  resposta: RespostaColecao<T>,
): (T & {id: string})[] {
  if (!resposta) {
    return [];
  }
  return Object.entries(resposta).map(([id, item]) => ({id, ...item}));
}
