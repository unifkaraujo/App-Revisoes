/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Revisao} from '../types/Revisao';
import {format} from 'date-fns';
import LoadingSpinner from './LoadingSpinner';

interface RevisaoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (revisao: Omit<Revisao, 'id'>, idToEdit?: string) => void;
  revisaoToEdit: Revisao | null;
  refresh: boolean;
}

const RevisaoModal = ({
  visible,
  onClose,
  onSave,
  revisaoToEdit,
  refresh,
}: RevisaoModalProps) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [numeroRevisao, setNumeroRevisao] = useState('1');
  const [dataRevisao, setDataRevisao] = useState('');
  const [loadingSave, setLoadingSave] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (revisaoToEdit) {
      setTitulo(revisaoToEdit.titulo || '');
      setConteudo(revisaoToEdit.conteudo);
      setNumeroRevisao(String(revisaoToEdit.numeroRevisao));
      setDataRevisao(revisaoToEdit.dataRevisao);
    } else {
      setTitulo('');
      setConteudo('');
      setNumeroRevisao('1');
      setDataRevisao('');
    }
  }, [revisaoToEdit, refresh]);

  useEffect(() => {
    const dias = parseInt(numeroRevisao, 10);
    if (!isNaN(dias)) {
      const novaData = new Date();
      novaData.setDate(novaData.getDate() + dias);
      setDataRevisao(format(novaData, 'dd/MM/yyyy'));
    } else {
      setDataRevisao('');
    }
  }, [numeroRevisao, revisaoToEdit, refresh]);

  const handleSave = async () => {
    if (!numeroRevisao || !conteudo || !titulo) return;

    setLoadingSave(true);

    try {
      await onSave(
        {
          titulo,
          conteudo,
          numeroRevisao: parseInt(numeroRevisao, 10),
          dataRevisao,
        },
        revisaoToEdit?.id,
      );
    } finally {
      setLoadingSave(false);
    }
  };

  const closeModal = () => {
    onClose();
  };

  const isDisabled = loadingSave || !numeroRevisao || !conteudo || !titulo;

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={closeModal}
      animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Adicionar Novo Texto</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Digite o título"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Conteúdo</Text>
          </View>

          <ScrollView
            style={{maxHeight: 150, marginBottom: 15}}
            keyboardShouldPersistTaps="handled">
            <TextInput
              ref={inputRef}
              placeholder="Digite o conteúdo"
              placeholderTextColor="#888"
              value={conteudo}
              onChangeText={setConteudo}
              style={[styles.input, {minHeight: 100}]}
              multiline
            />
          </ScrollView>

          <View style={styles.row}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Número de dias</Text>
              <TextInput
                placeholder="Ex: 5"
                placeholderTextColor="#888"
                value={numeroRevisao}
                onChangeText={setNumeroRevisao}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            {dataRevisao ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingLeft: 10,
                  paddingTop: 20,
                }}>
                <Text style={styles.preview}>{dataRevisao}</Text>
              </View>
            ) : null}
          </View>

          <View style={{gap: 10}}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={isDisabled}
              style={[styles.button, {backgroundColor: '#007bff'}]}>
              <Text style={styles.textButton}>
                {revisaoToEdit ? 'ATUALIZAR' : 'ADICIONAR'}
              </Text>
              {loadingSave && <LoadingSpinner size={'small'} color="white" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
              style={[styles.button, {backgroundColor: 'gray'}]}>
              <Text style={styles.textButton}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: screenWidth * 0.85,
    maxHeight: screenHeight * 0.8,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#1a1a1a',
  },
  preview: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    padding: 7,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  textButton: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RevisaoModal;
