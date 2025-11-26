/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {Revisao} from '../types/Revisao';
import RevisaoModal from '../components/RevisaoModal';
import {loginFirebase} from '../api//firebaseAuth';
import {
  setAxiosToken,
  fetchRevisoes,
  saveRevisao,
  deleteRevisao,
} from '../api/revisoesService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomeScreen() {
  const [revisoes, setRevisoes] = useState<Revisao[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRevisao, setSelectedRevisao] = useState<Revisao | null>(null);
  const [searchText, setSearchText] = useState('');

  const [loadingDados, setLoadingDados] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);

  const [idExcluindo, setIdExcluindo] = useState<string | null>(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function init() {
      setLoadingDados(true);
      try {
        const token = await loginFirebase(
          'SEU_EMAIL',
          'SUA_SENHA',
        );
        setAxiosToken(token);

        await loadRevisoes();
      } catch (e: any) {
        console.error(e);
        setLoadingDados(false);
      }
    }
    init();
  }, []);

  const loadRevisoes = async () => {
    setLoadingDados(true);
    const data = await fetchRevisoes();

    const parseDate = (brDate: string): Date => {
      const [day, month, year] = brDate.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const sorted = data.sort(
      (a, b) =>
        parseDate(a.dataRevisao).getTime() - parseDate(b.dataRevisao).getTime(),
    );
    setRevisoes(sorted);
    setLoadingDados(false);
  };

  const handleSave = async (revisao: Omit<Revisao, 'id'>, id?: string) => {
    await saveRevisao(revisao, id);
    loadRevisoes();
    setModalVisible(false);
  };

  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => handleDelete(id),
        },
      ],
    );
  };

  const handleDelete = async (id: string) => {
    setIdExcluindo(id);
    setLoadingExcluir(true);
    try {
      await deleteRevisao(id);
      loadRevisoes();
    } finally {
      setIdExcluindo(null);
      setLoadingExcluir(false);
    }
  };

  const filteredRevisoes = useMemo(() => {
    return revisoes.filter(
      r =>
        r.titulo?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.conteudo.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [revisoes, searchText]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📘</Text>
        <Text style={styles.headerTitle}>RevisõesApp</Text>
      </View>

      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Pesquisar textos..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {loadingDados ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingSpinner size={40} color="#333" />
        </View>
      ) : (
        <FlatList
          data={filteredRevisoes}
          keyExtractor={item => item.id}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          contentContainerStyle={{paddingBottom: 80}}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedRevisao(item);
                setModalVisible(true);
              }}>
              <View style={styles.item}>
                <View style={styles.itemHeader}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.itemTitle}>{item.titulo}</Text>
                  </View>
                  <Text style={styles.dataRevisao}>{item.dataRevisao}</Text>
                </View>
                <Text numberOfLines={2} style={{color: '#555'}}>
                  {item.conteudo}
                </Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                    <Text style={styles.actionText}>
                      {loadingExcluir && item.id === idExcluindo
                        ? 'Excluindo...'
                        : 'Excluir'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedRevisao(null);
          setModalVisible(true);
          setRefresh(prev => !prev);
        }}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <RevisaoModal
        visible={modalVisible}
        revisaoToEdit={selectedRevisao}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        refresh={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9fafa'},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f0ff',
    padding: 16,
  },
  headerIcon: {fontSize: 24, marginRight: 8},
  headerTitle: {fontSize: 20, fontWeight: 'bold', color: '#1a3c5a'},

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {fontSize: 22, marginRight: 4},
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },

  item: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: '#00010D',
  },
  dataRevisao: {
    backgroundColor: '#e6f3ff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 14,
    color: '#007acc',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionText: {
    marginLeft: 20,
    color: '#007acc',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 30,
  },
});
