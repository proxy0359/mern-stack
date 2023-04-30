import api from './server';

export const setPlace = async (body) => {
  try {
    const response = await api.post('/api/places', body);
    return await response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};
