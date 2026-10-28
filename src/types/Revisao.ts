export interface Revisao {
  id: string;
  dataRevisao: string;
  numeroRevisao: number;
  conteudo: string;
  titulo?: string;
  categoriaId?: string;
}

export type DadosRevisao = Omit<Revisao, 'id'>;
