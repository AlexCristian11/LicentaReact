import React, { Component, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './RemoveProductForm.css';

const RemoveProductForm = () => {

    const [productId, setProductId] = useState('');

    const handleRemoveProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7277/api/remove-product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                NotificationManager.success('Produsul șters cu success');
                setProductId('');
            } else {
                NotificationManager.error('Eroare ștergere produs');
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error('An error occurred while removing the user');
        }
    };

    return (
        <div className="remove-product">
            <h1>Ștergere produs</h1>
            <form onSubmit={handleRemoveProduct}>
                <input type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="ID" />
                <button type="submit">Șterge produsul</button>
            </form>
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    )
}

export default RemoveProductForm;