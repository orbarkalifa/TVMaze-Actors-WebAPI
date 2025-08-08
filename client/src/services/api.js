import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getCastData = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addActorComment = async (id, comment) => {
  const response = await axios.post(`${API_BASE_URL}/${id}/comment`, {comment})
  return response.data
}

export const getActorComment = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}/comment`)
  return response.data
}

export const deleteActor = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`)
  return response
}