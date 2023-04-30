import api from './server';
export const getUserPlace = async (uId) => {
  try {
    const response = await api.get(`/api/places/user/${ud}`);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};
