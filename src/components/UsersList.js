import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };



  return (
    <div className="users-container">
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
