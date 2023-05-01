import api from './server';

export const getPlace = async (pId) => {
  try {
    const response = await api.get(`/api/places/${pId}`);
    const data = response.data.places;
    return data;
  } catch (err) {
    throw err.response.data.message;
  }
};
