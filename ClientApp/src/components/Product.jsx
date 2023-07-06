import React, { Component, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import { BsFillCartFill } from 'react-icons/bs';
import { DarkModeContext } from '../DarkModeContext';

const Product = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    useEffect(() => {
        fetch('https://localhost:7277/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/api/products/${productId}`);
    }

    const filteredProducts = categoryId
        ? products.filter((product) => product.categoryId === categoryId)
        : products;



    return (
        <ul>
            {filteredProducts.map((product) => (
                <li key={product.id} >
                    <div className={`product ${isDarkMode ? 'dark-mode-product' : ''}`} onClick={() => handleProductClick(product.id)}>
                                <img src={product.imagine} />
                                <h5>{product.nume}</h5>
                                <div className="details">
                                    <p>{product.pret} Lei</p>
                                    <button className="icon">
                                        <BsFillCartFill id="icon" />
                                    </button>
                                </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

export default Product;