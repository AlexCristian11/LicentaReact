import React, { useState } from 'react';
import './RemoveCategoryForm.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const RemoveCategoryForm = () => {

    const [categoryId, setCategoryId] = useState('');

    const handleRemoveCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7277/api/remove-category/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                NotificationManager.success('Categoria a fost ștersă cu success');
                setCategoryId('');
            } else {
                NotificationManager.error('Eroare ștergere categorie');
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error('An error occurred while removing the user');
        }

    }

        return (
            <div className="remove-category">
                <form onSubmit={handleRemoveCategory}>
                    <h1>Ștergere categorie</h1>
                    <input type="text" placeholder="ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
                    <button>Șterge categorie</button>
                </form>
                <NotificationContainer className="custom-notification-container"
                    notificationClassName="custom-notification" />
            </div>
        )
}

export default RemoveCategoryForm;