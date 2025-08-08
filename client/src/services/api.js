import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getCastData = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addActorComment = async () => {
  return true
}

export const getActorComment = async () => {
  return {comment: "MOCK COMMENT"}
}

