import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api/users';
import {
  getReservationsForUser,
  createReservation,
  cancelReservation,
} from './api/reservations';
import './App.css';

interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  age: number;
  isStudent: boolean;
}

interface IReservation {
  _id?: string;
  reservationTime: string;
  status: string;
  userId: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [reservations, setReservations] = useState<
    Record<string, IReservation[]>
  >({});
  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    age: 0,
    isStudent: false,
  });
  const [newReservation, setNewReservation] = useState<IReservation>({
    reservationTime: '',
    status: 'reserved',
    userId: '',
  });
  const [editUserId, setEditUserId] = useState<string | null>(null);

  const fetchUsers = async (search?: string) => {
    const data = await getUsers(search);
    setUsers(data);
  };

  const fetchAllReservations = async () => {
    const allReservations: Record<string, IReservation[]> = {};
    for (const user of users) {
      const userReservations = await getReservationsForUser(user._id || '');
      allReservations[user._id || ''] = userReservations;
    }
    setReservations(allReservations);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchAllReservations();
    }
  }, [users]);

  useEffect(() => {
    fetchUsers(filterText);
  }, [filterText]);

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { _id, ...userData } = user;

    if (editUserId) {
      await updateUser(editUserId, userData);
      setEditUserId(null);
    } else {
      await createUser(userData);
    }

    setUser({
      firstName: '',
      lastName: '',
      age: 0,
      isStudent: false,
    });
    fetchUsers();
  };

  const handleEditUser = (user: IUser) => {
    setEditUserId(user._id || null);
    setUser(user);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setUsers(users.filter((u) => u._id !== userId));
    setReservations((prev) => {
      const updatedReservations = { ...prev };
      delete updatedReservations[userId];
      return updatedReservations;
    });
  };

  const handleAddReservation = async (userId: string) => {
    await createReservation({
      ...newReservation,
      userId,
      status: 'reserved',
    });
    setNewReservation({ reservationTime: '', status: 'reserved', userId: '' });
    fetchAllReservations();
  };

  const handleCancelReservation = async (
    reservationId: string,
    userId: string,
  ) => {
    await cancelReservation(reservationId);
    fetchAllReservations();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="app-container">
      <h1>User and Reservation Management</h1>

      <input
        type="text"
        placeholder="Filter by name or surname"
        value={filterText}
        onChange={handleFilterChange}
        className="search-input"
      />

      <form onSubmit={handleUserSubmit} className="user-form">
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastName: e.target.value }))
          }
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={user.age !== undefined ? user.age : ''}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
          required
        />
        <label>
          <input
            type="checkbox"
            checked={user.isStudent}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, isStudent: e.target.checked }))
            }
          />
          Is Student
        </label>
        <button type="submit">{editUserId ? 'Update User' : 'Add User'}</button>
      </form>

      {users.length > 0 ? (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-info">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p>Age: {user.age}</p>
                <p>Student: {user.isStudent ? 'Yes' : 'No'}</p>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id || '')}>
                  Delete
                </button>
              </div>
              <div className="reservations">
                <h4>Reservations</h4>
                <ul>
                  {reservations[user._id || '']?.map((res) => (
                    <li key={res._id}>
                      <p>
                        Time: {new Date(res.reservationTime).toLocaleString()},
                        Status: {res.status}
                      </p>
                      <button
                        onClick={() =>
                          handleCancelReservation(res._id || '', user._id || '')
                        }
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddReservation(user._id || '');
                  }}
                >
                  <input
                    type="datetime-local"
                    value={newReservation.reservationTime}
                    onChange={(e) =>
                      setNewReservation((prev) => ({
                        ...prev,
                        reservationTime: e.target.value,
                      }))
                    }
                    required
                  />
                  <button type="submit">Add Reservation</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="no-users">🚫 No users found</h3>
      )}
    </div>
  );
};

export default App;
