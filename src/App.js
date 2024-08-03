import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import './styles.css';
import AddItem from './components/AddItem';
import History from './components/History';

const App = () => {

  

  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/login" element={localStorage.getItem('loggedIn') === 'true' ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={localStorage.getItem('loggedIn') === 'true' ? <Home /> : <Navigate to="/login" />} />
          <Route path="/history" element={localStorage.getItem('loggedIn') === 'true' ? <History /> : <Navigate to="/login" />} />
          <Route path="/sign-up" element={localStorage.getItem('loggedIn') === 'true' ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/add-item" element={localStorage.getItem('loggedIn')==='true' ? <AddItem/> : <Navigate to="/login"/>} />
          {/* <Route path="/" element={<Navigate to={localStorage.getItem('loggedIn') === 'true' ? "/home" : "/login"} />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
