import {useState} from 'react';
import {Categoria} from '../../../types/Categoria';

interface UseNovaCategoriaParametros {
  onCriar: (nome: string) => Promise<Categoria>;
  onCriada: (categoria: Categoria) => void;
}

export function useNovaCategoria({
  onCriar,
  onCriada,
}: UseNovaCategoriaParametros) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [criando, setCriando] = useState(false);

  const alternar = () => setAberto(atual => !atual);

  const concluir = (categoria: Categoria) => {
    onCriada(categoria);
    setNome('');
    setAberto(false);
  };

  const criar = async () => {
    if (!nome.trim() || criando) {
      return;
    }
    setCriando(true);
    try {
      concluir(await onCriar(nome));
    } catch (erro) {
      console.error(erro);
    } finally {
      setCriando(false);
    }
  };

  return {aberto, nome, setNome, criando, alternar, criar};
}
