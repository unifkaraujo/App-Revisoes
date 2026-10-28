import {useState} from 'react';
import {DadosRevisao, Revisao} from '../../../types/Revisao';
import {calcularDataRevisao} from '../../../utils/regrasRevisao';

export interface ValoresFormularioRevisao {
  titulo: string;
  conteudo: string;
  numeroRevisao: string;
  categoriaId: string;
}

type SalvarRevisao = (revisao: DadosRevisao, id?: string) => Promise<void>;

interface UseFormularioRevisaoParametros {
  revisao: Revisao | null;
  onSalvar: SalvarRevisao;
}

const FORMULARIO_VAZIO: ValoresFormularioRevisao = {
  titulo: '',
  conteudo: '',
  numeroRevisao: '1',
  categoriaId: '',
};

function paraValoresFormulario(
  revisao: Revisao | null,
): ValoresFormularioRevisao {
  if (!revisao) {
    return FORMULARIO_VAZIO;
  }
  return {
    titulo: revisao.titulo ?? '',
    conteudo: revisao.conteudo,
    numeroRevisao: String(revisao.numeroRevisao),
    categoriaId: revisao.categoriaId ?? '',
  };
}

function estaCompleto({
  titulo,
  conteudo,
  numeroRevisao,
}: ValoresFormularioRevisao) {
  return Boolean(titulo && conteudo && numeroRevisao);
}

function paraDadosRevisao(
  valores: ValoresFormularioRevisao,
  dataRevisao: string,
): DadosRevisao {
  return {
    titulo: valores.titulo,
    conteudo: valores.conteudo,
    numeroRevisao: parseInt(valores.numeroRevisao, 10),
    dataRevisao,
    ...(valores.categoriaId ? {categoriaId: valores.categoriaId} : {}),
  };
}

export function useFormularioRevisao({
  revisao,
  onSalvar,
}: UseFormularioRevisaoParametros) {
  const [valores, setValores] = useState(() => paraValoresFormulario(revisao));
  const [salvando, setSalvando] = useState(false);

  const alterarCampo =
    (campo: keyof ValoresFormularioRevisao) => (valor: string) =>
      setValores(anteriores => ({...anteriores, [campo]: valor}));

  const dataRevisao = calcularDataRevisao(valores.numeroRevisao);
  const podeSalvar = estaCompleto(valores) && !salvando;

  const salvar = async () => {
    if (!podeSalvar) {
      return;
    }
    setSalvando(true);
    try {
      await onSalvar(paraDadosRevisao(valores, dataRevisao), revisao?.id);
    } finally {
      setSalvando(false);
    }
  };

  return {
    valores,
    alterarCampo,
    dataRevisao,
    salvando,
    podeSalvar,
    salvar,
    editando: Boolean(revisao),
  };
}
