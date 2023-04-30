import api from './server';
export const getUserPlace = async (uId) => {
  try {
    const response = await api.get(`/api/places/user/${uId}`);
    return response.data.places;
  } catch (err) {
    throw err.response.data.message;
  }
};
