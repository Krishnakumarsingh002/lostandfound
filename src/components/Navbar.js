import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ username }) => {
    const navigate = useNavigate();

    const handleAddLostItem = () => {
        navigate('/add-item');
    };

    const handleHistory = () => {
        navigate('/history');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.reload();
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={handleHome}>
                {/* <img src="/path/to/your/icon.png" alt="Home Icon" className="navbar-icon" /> */}
                Lost and Found Portal
            </div>
            <div className="navbar-user">Hello, {username}</div>
            <div className="navbar-actions">
                <button onClick={handleAddLostItem} className="add-item-button">Add Lost Item</button>
                {
                    window.location.pathname === '/history' ? <button onClick={handleHome} className='history-button'>Home</button> : <button onClick={handleHistory} className="history-button">History</button>
                }
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
