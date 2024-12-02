import axios from 'axios';

const BASE_URL = 'http://localhost:3000/users';

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  isStudent: boolean;
}

export const getUsers = async (search?: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      search: search || undefined,
    },
  });
  return response.data;
};

export const getUser = async (_id: string) => {
  const response = await axios.get(`${BASE_URL}/${_id}`);
  return response.data;
};

export const createUser = async (user: Omit<IUser, '_id'>) => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

export const updateUser = async (
  _id: string,
  user: Partial<Omit<IUser, '_id'>>,
) => {
  const response = await axios.put(`${BASE_URL}/${_id}`, user);
  return response.data;
};

export const deleteUser = async (_id: string) => {
  const response = await axios.delete(`${BASE_URL}/${_id}`);
  return response.data;
};
