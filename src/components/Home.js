import React, { useState, useEffect } from 'react';
import CategoriesList from './CategoriesList';
import ItemCard from './ItemCard';
import Navbar from './Navbar';
import { api } from '../services/api'; // Import the getItems function
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const fetchItems = async () => {
      try {

        const response = await api.get(`/items/category?status=LOST&category=${selectedCategory}`);

        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const username = localStorage.getItem('username') || 'Guest';

  return (<>
      <Navbar username={username} />
      <div className="home-content">
        <div className="category-section">
          <CategoriesList onSelectCategory={setSelectedCategory} />
        </div>

        {items.length === 0 && <p className="no-items">No items found</p>}

        <div className="items-section">
          {items.map(item => (
            <ItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
