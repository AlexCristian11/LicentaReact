import React, { Component, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './RemoveUserForm.css';


const RemoveUserForm = () => {

    const [userId, setUserId] = useState('');

    const handleRemoveUser = async (e) => {
        e.preventDefault();

        // Make a DELETE request to remove the user
        try {
            const response = await fetch(`https://localhost:7277/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                NotificationManager.success('Utilizator șters cu success');
                // Clear the input field or reset the user ID state
                setUserId('');
                // Perform any additional actions, such as refreshing the user list
                // or updating the UI as needed
            } else {
                NotificationManager.error('Eroare ștergere utilizator');
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error('An error occurred while removing the user');
        }
    };

    return (
        <div className="remove-user">
            <h1>Ștergere utilizator</h1>
            <form onSubmit={handleRemoveUser}>
                <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="ID" />
                <button type="submit">Șterge utilizator</button>
            </form>
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    )
}

export default RemoveUserForm;