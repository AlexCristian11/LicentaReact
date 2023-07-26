import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Cart.css';
import { DarkModeContext } from '../DarkModeContext';
import { BsFillTrashFill } from 'react-icons/bs';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Cart = () => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [payment, setPayment] = useState('card');
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetchCart();
    }, [cartId]);

    const fetchCart = () => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            console.log('User is not logged in.');
            return;
        }

        fetch(`https://localhost:7277/api/cart/${userId}`) 
            .then((response) => response.json())
            .then((data) => {
                setCartId(data.id);
                fetchCartItems(data.id);
                console.log(cartId);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCartItems = (cartId) => {
        fetch(`https://localhost:7277/api/cart-items-products/${cartId}`) 
            .then((response) => response.json())
            .then((data) => {
                setCartItems(data);
                console.log(cartItems);
                console.log(cartItems.product);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        cartItems.forEach((item) => {
            if (item.product && item.product.pret) {
                totalPrice += item.product.pret * item.quantity;
            }
        });

        return totalPrice;
    }

    const handleIncrement = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.cartItemId === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleDecrement = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.cartItemId === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    }; 

    const handleChange = (itemId, event) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.cartItemId === itemId) {
                return { ...item, quantity: parseInt(event.target.value) };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemoveFromCart = (cartItemId) => {
        fetch(`https://localhost:7277/api/remove-cart-product/${cartItemId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                NotificationManager.removeAll();
                if (response.ok) {
                    console.log('Product removed from cart successfully.');
                    NotificationManager.success("Produs șters cu succes");
                    fetchCart();
                } else {
                    console.log('Error removing product from cart:', response.status);
                    NotificationManager.error("Eroare ștergere produs");
                }
            })
            .catch((error) => {
                console.error('Error removing product from cart:', error);
            });
    }

    const handleCreateReceipt = (cartId) => {
        const userId = localStorage.getItem('userId');

        fetch(`https://localhost:7277/api/create-receipt?cartId=${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error creating receipt');
                }
            })
            .then((data) => {
                NotificationManager.success('Comandă plasată cu succes');
                setTimeout(() => {
                    setRedirect(true);
                }, 2000);
            })
            .catch((error) => {
                NotificationManager.error('Erroare plasare comandă');
                console.error('Error creating receipt:', error);
            });
    }

    if (redirect) {
        return <Navigate to="/api/account" />;
    }


    return (
        <div className="top-container">
        
            <div className="cart">
                {cartItems.length === 0 ? (
                    <h1 style={{ fontSize: 1.75 + 'rem' }} >Coșul de cumpărături este gol</h1>
                ) : (
                        <>
                        <div className="cart-products">
                                <h1>Coșul de cumpărături</h1>
                                    {cartItems.map((item) => (
                                        <div key={item.cartItemId} className={`product-cart ${isDarkMode ? 'dark-mode-cart-product' : ''}`}>
                                            {item.product && (
                                                <>
                                                    <div className="top-right">
                                                        <button className={`icon-button ${isDarkMode ? 'darkmode-icon-cart' : ''}`} onClick={() => handleRemoveFromCart(item.cartItemId)}><BsFillTrashFill id="icon-cart" /></button>
                                                    </div>
                                                    <img src={item.product.imagine} />
                                                    <div className="details-for-cart-product">
                                                        <h4>{item.product.nume}</h4>
                                                        <h4>Preț: <span className="cart-details-price">{item.product.pret} Lei</span></h4>
                                                        <div className="quantity">
                                                            <button onClick={() => handleDecrement(item.cartItemId)}>-</button>
                                                            <input type="text" value={item.quantity} onChange={(event) => handleChange(item.cartItemId, event)} />
                                                            <button onClick={() => handleIncrement(item.cartItemId)}>+</button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                            </div>
                
                <div className="cart-details">
                    <h1>Detalii comandă</h1>
                    <div className={`cart-container ${isDarkMode ? 'dark-mode-cart-product' : ''}`}>
                            <div className="order-details">
                                    {cartItems.map((item) => (
                                        <div key={item.cartItemId} className="order">
                                            <p>{item.quantity}X {item.product?.nume}</p> 
                                            <p id="price-cart">{item.product?.pret * item.quantity} Lei</p> 
                                        </div>
                                    ))}
                                    </div>
                                    <h3 id="total">Total: <span id="total-price" className="cart-details-price">{calculateTotalPrice(cartItems).toFixed(2)} Lei</span></h3>
                                </div>
                                <button id="finish-order" className="btn-primary" onClick={() => handleCreateReceipt(cartId)}>Finalizează comanda</button>
                            </div>
                    </>
                )}
            </div>
            <div className="bg">
                <p>s</p>
            </div>
                <NotificationContainer className="custom-notification-container"
                    notificationClassName="custom-notification" />
        </div>
    )
}

export default Cart;