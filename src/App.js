import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/views/HomeView';
import Register from './Register/views/RegisterView'
import NavBar from './Home/components/NavBarComponent';

function App() {
  return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='register-business' element={<Register />} />
            </Routes>
        </>
  );
}

export default App;