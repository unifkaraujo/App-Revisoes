import {obterIdUsuario} from './autenticacaoServico';

export function caminhoUsuario(): string {
  return `/usuarios/${obterIdUsuario()}`;
}

export function caminhoRevisoes(): string {
  return `${caminhoUsuario()}/revisoes`;
}

export function caminhoCategorias(): string {
  return `${caminhoUsuario()}/categorias`;
}
