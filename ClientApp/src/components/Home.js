import React, { Component, useEffect, useState } from 'react';
import Products from './Products';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Home = () => {
  
    return (
        <div>
            <Products />   
        </div>
    );
}

export default Home;