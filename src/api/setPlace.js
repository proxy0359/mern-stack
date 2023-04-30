import api from './server';

export const setPlace = async (body) => {
  const response = await api.post('/api/place', body);
};
