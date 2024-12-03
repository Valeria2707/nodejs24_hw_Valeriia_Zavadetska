import axios from 'axios';

const BASE_URL = 'http://localhost:3000/menus';

export interface IMenu {
  _id?: string;
  name: string;
  description: string;
  price: number;
}

export const getMenus = async (search?: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      search: search || undefined,
    },
  });
  return response.data;
};

export const createMenu = async (menu: Omit<IMenu, '_id'>): Promise<IMenu> => {
  const response = await axios.post(BASE_URL, menu);
  return response.data;
};

export const updateMenu = async (
  menuId: string,
  menu: Partial<Omit<IMenu, '_id'>>,
): Promise<IMenu> => {
  const response = await axios.put(`${BASE_URL}/${menuId}`, menu);
  return response.data;
};

export const deleteMenu = async (menuId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${menuId}`);
};
