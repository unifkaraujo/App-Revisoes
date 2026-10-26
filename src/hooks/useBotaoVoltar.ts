import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBotaoVoltar(ativo: boolean, aoVoltar: () => void) {
  useEffect(() => {
    if (!ativo) {
      return;
    }
    const assinatura = BackHandler.addEventListener('hardwareBackPress', () => {
      aoVoltar();
      return true;
    });
    return () => assinatura.remove();
  }, [ativo, aoVoltar]);
}
