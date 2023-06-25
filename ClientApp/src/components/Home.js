import React, { Component, useEffect, useState } from 'react';
import Product from './Product';
import { Route, BrowserRouter } from 'react-router-dom';
import './Home.css';

const Home = () => {
  
    return (
        <div className="productsList">
            <Product className="product" />
        </div>
    );
}

export default Home;