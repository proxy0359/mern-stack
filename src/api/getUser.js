import api from './server';

export const getUser = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data.users;
  } catch (err) {
    throw (
      err.response.data.message || 'Cannot get USERS, Please try again later'
    );
  }
};
