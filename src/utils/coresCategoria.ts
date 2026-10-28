const SATURACAO = 0.65;
const LUMINOSIDADE = 0.88;
const CANDIDATOS = 12;

function canalParaHex(canal: number): string {
  return Math.round(canal * 255)
    .toString(16)
    .padStart(2, '0');
}

function matizParaHex(matiz: number): string {
  const amplitude = SATURACAO * Math.min(LUMINOSIDADE, 1 - LUMINOSIDADE);
  const canal = (n: number) => {
    const k = (n + matiz / 30) % 12;
    return LUMINOSIDADE - amplitude * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return `#${[0, 8, 4].map(n => canalParaHex(canal(n))).join('')}`;
}

function hexParaMatiz(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const maximo = Math.max(r, g, b);
  const variacao = maximo - Math.min(r, g, b);
  if (variacao === 0) {
    return 0;
  }
  const setor =
    maximo === r
      ? (g - b) / variacao
      : maximo === g
      ? (b - r) / variacao + 2
      : (r - g) / variacao + 4;
  return (setor * 60 + 360) % 360;
}

function distanciaMatiz(a: number, b: number): number {
  const diferenca = Math.abs(a - b);
  return Math.min(diferenca, 360 - diferenca);
}

function menorDistancia(matiz: number, matizes: number[]): number {
  return Math.min(360, ...matizes.map(outro => distanciaMatiz(matiz, outro)));
}

export function gerarCorCategoria(coresExistentes: string[]): string {
  const matizes = coresExistentes.map(hexParaMatiz);
  const candidatos = Array.from(
    {length: CANDIDATOS},
    () => Math.random() * 360,
  );
  const maisDistante = candidatos.reduce((melhor, candidato) =>
    menorDistancia(candidato, matizes) > menorDistancia(melhor, matizes)
      ? candidato
      : melhor,
  );
  return matizParaHex(maisDistante);
}
