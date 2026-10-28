import {Alert} from 'react-native';

export function confirmarExclusao(aoConfirmar: () => void) {
  Alert.alert(
    'Confirmar exclusão',
    'Tem certeza que deseja excluir este item?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Excluir', style: 'destructive', onPress: aoConfirmar},
    ],
  );
}

export function confirmarExclusaoCategoria(
  nome: string,
  aoConfirmar: () => void,
) {
  Alert.alert(
    'Excluir categoria',
    `Excluir "${nome}"? As revisões dela continuam salvas, só ficam sem categoria.`,
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Excluir', style: 'destructive', onPress: aoConfirmar},
    ],
  );
}

export function confirmarSaida(aoConfirmar: () => void) {
  Alert.alert('Sair', 'Deseja sair da sua conta?', [
    {text: 'Cancelar', style: 'cancel'},
    {text: 'Sair', style: 'destructive', onPress: aoConfirmar},
  ]);
}
