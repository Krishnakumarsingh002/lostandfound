import React from 'react';
import './CategoriesList.css';

const CategoriesList = ({ onSelectCategory }) => {
  const categories = [
    { id: 1, name: 'All Categories',path:'all' },
    { id: 2, name: 'Electronics',path:'electronics' },
    { id: 3, name: 'Clothing',path:'clothing' },
    { id: 4, name: 'Books',path:'books' },
    { id: 5, name: 'Accessories',path:'accessories' },
    { id: 6, name: 'Home & Kitchen',path:'home' },
    { id: 7, name: 'Toys',  path:'toys' },
    { id: 8, name: 'Sports Equipment',path:'sports' },
    { id: 9, name: 'Health & Beauty',path:'health' },
    { id: 10, name: 'Automotive',path:'automotive' },
    { id: 11, name: 'Others',path:'others' }
  ];

  return (
    <>
    <h2>Categories</h2>
    <ul className="categories-list">
      {categories.map(category => (
        <li key={category.id} onClick={() => onSelectCategory(category.name)}>
          {category.name}
        </li>
      ))}
    </ul>
    </>
  );
};

export default CategoriesList;
