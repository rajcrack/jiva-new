import { brand } from '../../_mock/brand';

export const createBrand = async (data) => {
  return {
    displayName: 'Admin',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/dashboard/jiva-smile-logo.png',
  };
};
export const updateBrand = async (data) => {
  return {
    displayName: 'Admin',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  };
};

export const deleteBrand = async (data) => {
  return {
    displayName: 'Admin',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  };
};
export const getBrandById = async (id) => {
  return {
    displayName: 'Admin',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  };
};
export const getBrandList = async (data) => {
  return brand;
};
