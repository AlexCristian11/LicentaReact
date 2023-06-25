import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import { BsFillCartFill } from 'react-icons/bs'

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Make the API request to fetch the product data
        fetch('https://localhost:7277/api/products')
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched product data to the component's state
                setProducts(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
        /*console.log(products);*/
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/api/products/${productId}`);
    }


    return (
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div className="product" onClick={() => handleProductClick(product.id)}>
                                <img src={product.imagine} />
                                <h5>{product.nume}</h5>
                                <div className="details">
                                    <p>{product.pret} Lei</p>
                                    <div className="icon">
                                        <BsFillCartFill id="icon" />
                                    </div>
                                </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

export default Product