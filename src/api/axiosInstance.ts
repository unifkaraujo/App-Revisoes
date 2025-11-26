import axios from 'axios';

const FIREBASE_URL = 'https://revisoes-b93ee-default-rtdb.firebaseio.com';

export function createAxiosInstance(token: string) {
  return axios.create({
    baseURL: FIREBASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      auth: token,
    },
  });
}
