import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { BsFillCartFill } from 'react-icons/bs';

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Make the API request to fetch the product details
        fetch(`https://localhost:7277/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched product data to the component's state
                setProduct(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="product-page">
            <img src={product.imagine} />
            <div className="product-details">
                <h1 id="name">{product.nume}</h1>
                <div className="test">
                    <h3>Preț:</h3>
                    <p id="price">{product.pret} Lei</p>
                    <h3>Descriere:</h3>
                    <p id="description">{product.descriere}</p>
                    <button id="add-to-cart">Adaugă în coș <BsFillCartFill id="icon-product" /></button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;