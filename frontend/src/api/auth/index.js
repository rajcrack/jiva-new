import axios from 'axios';

import { API_URL } from '../../utils/constant';

export const profile = async () => {
  return {
    displayName: 'Admin',
    email: 'admin@gmail.com',
    photoURL: '/assets/images/dashboard/jiva-smile-logo.png',
  };
};
export const login = async (data) => {
  const loginData = await axios.post(`${API_URL}/admin/login`, data);

  return loginData.data;
};
