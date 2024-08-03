import React, { useState } from 'react';
import './ItemCard.css';
import { getUserById } from '../services/api';

const ItemCardFound = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchClaimedByUser = async (item) => {
    try {
      const response  =  await getUserById(item.claimedBy);
      return response.data
    } catch (error) {
      console.error('Error fetching claimed by user:', error);
    }
  };

  const fetchReportedByUser = async (item) => {
    try {
      const response =  await getUserById(item.userId);
      return response.data

    } catch (error) {
      console.error('Error fetching reported by user:', error);
    }
  };

  const getDetails = async (item) => {
    try {
        const claimedByUser = await fetchClaimedByUser(item);
        const reportedByUser = await fetchReportedByUser(item);
        setUserDetails({
            claimedByUser: claimedByUser,
            reportedByUser: reportedByUser
        })

        setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Found at:</strong> {item.location}</p>
        <button className="btn" onClick={async() => await getDetails(item)}>Details</button>
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
            </div>
            
            {userDetails && (
              <div className="modal-user-details">
                <h3>Claimed By:</h3>
                <p><strong>Username:</strong> {userDetails.claimedByUser.username}</p>
                <p><strong>Email:</strong> {userDetails.claimedByUser.email}</p>
                <p><strong>Phone Number:</strong> {userDetails.claimedByUser.phoneNumber}</p>
                <br></br>
                <h3>Reported By:</h3>
                <p><strong>Username:</strong> {userDetails.reportedByUser.username}</p>
                <p><strong>Email:</strong> {userDetails.reportedByUser.email}</p>
                <p><strong>Phone Number:</strong> {userDetails.reportedByUser.phoneNumber
                }</p>
              </div>
            )}
            <button className="btn" style={{backgroundColor : 'red'}} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCardFound;
