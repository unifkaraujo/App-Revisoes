import axios from 'axios';
import {configuracaoFirebase} from '../config/firebase';
import {obterTokenUsuario} from './autenticacaoServico';

export const clienteHttp = axios.create({
  baseURL: configuracaoFirebase.databaseURL,
  headers: {'Content-Type': 'application/json'},
});

clienteHttp.interceptors.request.use(async requisicao => {
  requisicao.params = {...requisicao.params, auth: await obterTokenUsuario()};
  return requisicao;
});
