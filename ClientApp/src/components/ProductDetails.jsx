import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { BsFillCartFill } from 'react-icons/bs';

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7277/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleAddToCart = () => {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        console.log(product.id);

        if (!userId) {
            console.log('User is not logged in.');
            return;
        }

        // Make the API request to add the product to the cart
        fetch('https://localhost:7277/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                productId: parseInt(product.id)
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Product added to cart successfully.');
                    
                    // Handle the case when the product is added to the cart successfully
                } else {
                    console.log('Error adding product to cart:', response.status);
                    // Handle the case when there was an error adding the product to the cart
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
                // Handle any other errors that occurred during the request
            });
    };

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="product-page">
            <img src={product.imagine} id="details-image"/>
            <div className="product-details">
                <h1 id="name">{product.nume}</h1>
                <div className="test">
                    <h3>Preț:</h3>
                    <p id="price">{product.pret} Lei</p>
                    <h3>Descriere:</h3>
                    <p id="description">{product.descriere}</p>
                    <button id="add-to-cart" onClick={handleAddToCart}>Adaugă în coș <BsFillCartFill id="icon-product" /></button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;