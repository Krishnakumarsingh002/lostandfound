import React, { useState } from 'react';
import './AddItem.css';
import { api } from '../services/api';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username') || 'Guest';

  const onItemAdded = () => {
    setMessage('Item added successfully!');
    alert('Item added successfully!');
    setItemName('');
    setDescription('');
    setCategory('');
    setLocation('');
    setImageUrl('');
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user by username
      const userResponse = await api.get(`/users?username=${username}`);
      const user = userResponse.data;

      if (!user) {
        alert('User not found');
        return;
      }

      const newItem = {
        userId : user.userId,
        title : itemName,
        description : description,
        category : category,
        location : location,
        dateReported : new Date().toISOString(),
        imageUrl : imageUrl,
        createdAt: new Date().toISOString(),
        claimedBy: 0
      }
      await api.post('/items', newItem);
      onItemAdded();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl("https://via.placeholder.com/200")} required />
        </label>
        <button type="submit" className="add-item-button">Add Item</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddItem;
