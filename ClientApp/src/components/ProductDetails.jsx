import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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

        
        fetch(`https://localhost:7277/api/cart-add?userId=${userId}&productId=${product.id}&quantity=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                NotificationManager.removeAll();
                if (response.ok) {
                    console.log('Product added to cart successfully.');
                    NotificationManager.success("Produs adăgat cu succes");
                    
                } else {
                    console.log('Error adding product to cart:', response.status);
                    NotificationManager.error("Eroare adăugare produs");
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
                
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
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    );
};

export default ProductDetails;