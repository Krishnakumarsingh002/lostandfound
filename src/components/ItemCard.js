import React, { useState } from 'react';
import './ItemCard.css';
import { api } from '../services/api';

const ItemCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const claimById = async (itemId) => {
    try {
      await api.post("/items/claim", { itemId: itemId , username: localStorage.getItem('username')});

      alert('Item claimed successfully!');
      window.location.reload();
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error('Error claiming item:', error);
    }
  };

  const getDetails = async (userId) => {
    try {
      const userResponse = await api.get(`/users/${userId}`);
      setUserDetails(userResponse.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Found at:</strong> {item.location}</p>
        <button className="btn" onClick={() => getDetails(item.userId)}>Claim</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Item Details</h2>
            <div className="modal-item-details">
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Found at:</strong> {item.location}</p>
              <p><strong>Uploaded By: </strong></p>
            </div>
            {userDetails && (
              <div className="modal-user-details">
                <h3>Uploaded By:</h3>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
              </div>
            )}
            {error && <p className="error" style={{color: 'red'}}>{error}</p>}
            <button className="btn" onClick={() => claimById(item.itemId)}>Claim</button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn" style={{backgroundColor : 'red'}} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
