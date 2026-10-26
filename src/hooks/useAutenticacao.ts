import {useEffect, useState} from 'react';
import {observarUsuario} from '../services/autenticacaoServico';
import {Usuario} from '../types/Usuario';

export function useAutenticacao() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(
    () =>
      observarUsuario(usuarioAtual => {
        setUsuario(usuarioAtual);
        setVerificando(false);
      }),
    [],
  );

  return {usuario, verificando};
}
