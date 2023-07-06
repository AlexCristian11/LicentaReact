import React, { useState, useContext } from 'react';
import './Cart.css';
import { DarkModeContext } from '../DarkModeContext';

const Cart = () => {

    const [name, setName] = useState('iPhone 13 Pro Max');
    const [price, setPrice] = useState(6200);
    const [image, setImage] = useState('https://cdn11.bigcommerce.com/s-p8i5esyy64/images/stencil/2560w/products/1930/8223/iphone-13-pro-max-graphite-select__87547.1635471241.png?c=2');
    const [quantity, setQuantity] = useState(1);
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [payment, setPayment] = useState('card');

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    };


    return (
        <>
        <div className="cart">
            <div className="cart-products">
                <h1>Coșul de cumpărături</h1>
                <div className={`product-cart ${isDarkMode ? 'dark-mode-cart-product' : ''}`}>
                    <img src={image} />
                    <div className="details-for-cart-product">
                        <h4>{name}</h4>
                        <h4>Preț:    <span className="cart-details-price">{price} Lei</span></h4>
                        <div className="quantity">
                            <button onClick={handleDecrement}>-</button>
                            <input type="text" value={quantity} onChange={handleChange} />
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-details">
                <h1>Detalii comandă</h1>
                <div className={`cart-container ${isDarkMode ? 'dark-mode-cart-product' : ''}`}>
                    <div className="order-details">
                        <p id="cart-order-product">{quantity}X    {name}</p>
                        <p id="price-cart">{price} Lei</p>
                    </div>
                    <h3 id="total">Total: <span className="cart-details-price">{price * quantity} Lei</span></h3>
                </div>
                <button id="finish-order" className="btn-primary">Finalizează comanda</button>
            </div>
        </div>
            <div className="payment-container">
                <h3>Metoda de plată</h3>
                <div className="payment-method">
                    <div id="cash">
                        <label htmlFor="cash">Cash</label>
                        <input type="radio" id="cash" name="payment" value="Cash" onClick={() => { setPayment('card'); console.log(payment); }} />
                    </div>
                    <div id="card">
                        <label htmlFor="card">Card</label>
                        <input type="radio" id="card" name="payment" value="Card" defaultChecked onClick={() => { setPayment('cash'); console.log(payment); }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;