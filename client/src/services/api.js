import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export const getCastData = async () => {
  const response = await api.get('/');
  return response.data;
};

export const addActorComment = async (id, comment) => {
  const response = await api.post(`/${id}/comment`, { comment });
  return response;
};

export const getActorComment = async (id) => {
  const response = await api.get(`/${id}/comment`);
  return response.data;
};

export const deleteActor = async (id) => {
  const response = await api.delete(`/${id}`);
  return response;
};

export const deleteActorComment = async (id) => {
  const response = await api.delete(`/${id}/comment`);
  return response;
};