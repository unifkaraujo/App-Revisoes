import {createAxiosInstance} from './axiosInstance';
import {Revisao} from '../types/Revisao';

let axiosInstance = createAxiosInstance(''); // instância vazia no início

export function setAxiosToken(token: string) {
  axiosInstance = createAxiosInstance(token);
}

export const fetchRevisoes = async (): Promise<Revisao[]> => {
  const response = await axiosInstance.get('/revisoes.json');
  const data = response.data;
  if (!data) return [];
  return Object.keys(data).map(key => ({
    id: key,
    ...data[key],
  }));
};

export const saveRevisao = async (
  revisao: Omit<Revisao, 'id'>,
  id?: string,
) => {
  if (id) {
    return axiosInstance.put(`/revisoes/${id}.json`, revisao);
  } else {
    return axiosInstance.post(`/revisoes.json`, revisao);
  }
};

export const deleteRevisao = async (id: string) => {
  return axiosInstance.delete(`/revisoes/${id}.json`);
};
