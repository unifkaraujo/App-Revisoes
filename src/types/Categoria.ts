export interface Categoria {
  id: string;
  nome: string;
  cor: string;
}

export type DadosCategoria = Omit<Categoria, 'id'>;
