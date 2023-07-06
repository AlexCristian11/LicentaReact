import React, { useState } from 'react';
import './AddCategoryForm.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const AddCategoryForm = () => {

    const [nume, setNume] = useState('');

    const submit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7277/api/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume,
                }),
            });

            NotificationManager.removeAll();

            if (response.ok) {
                NotificationManager.success('Categorie adăugată cu success');
            } else {
                NotificationManager.error('Eroare adăugare categorie');
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div className="add-category-form">
            <form onSubmit={submit}>
                <h1>Adăugare categorie</h1>
                <input type="text" className="form-control" placeholder="Nume categorie" required onChange={e => setNume(e.target.value)} />
                <button id="button-add-category" className="w-50 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    )
}

export default AddCategoryForm;