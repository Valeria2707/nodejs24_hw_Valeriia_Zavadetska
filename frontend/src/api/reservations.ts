import axios from 'axios';

const BASE_URL = 'http://localhost:3000/reservations';

interface IReservation {
  _id: string;
  reservationTime: string;
  status: string;
  userId: string;
}

export const getReservationsForUser = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

export const createReservation = async (
  reservation: Omit<IReservation, '_id'>,
) => {
  const response = await axios.post(BASE_URL, reservation);
  return response.data;
};

export const cancelReservation = async (reservationId: string) => {
  const response = await axios.patch(`${BASE_URL}/${reservationId}/cancel`);
  return response.data;
};
