import {useState} from 'react';
import {obterMensagemErro} from '../utils/erros';

export function useEnvioFormulario(acao: () => Promise<void>) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const enviar = async (): Promise<boolean> => {
    setEnviando(true);
    setErro(null);
    try {
      await acao();
      return true;
    } catch (excecao) {
      setErro(obterMensagemErro(excecao));
      return false;
    } finally {
      setEnviando(false);
    }
  };

  return {enviar, enviando, erro};
}
