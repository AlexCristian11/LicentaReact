import React, { Component, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './AddUserForm.css';

const AddUserForm = () => {

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [email, setEmail] = useState('');
    const [adresa, setAdresa] = useState('');
    const [parola, setParola] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7277/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume,
                    prenume,
                    email,
                    adresa,
                    parola,
                }),
            })
            if (response.ok) {
                console.log(response);
                NotificationManager.success('Utilizator adăugat cu success');
            } else {
                NotificationManager.error('Eroare adăugare utilizator');
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error('An error occurred while removing the user');
        }
    }

    return (
        <div className="form-signin-admin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Adăugare utilizator</h1>
                <input type="text" className="form-control" placeholder="Nume" required onChange={e => setNume(e.target.value)} />
                <input type="text" className="form-control" placeholder="Prenume" required onChange={e => setPrenume(e.target.value)} />
                <input type="email" id="inputEmail" className="form-control" placeholder="Adresa de email" required onChange={e => setEmail(e.target.value)} />
                <input type="text" className="form-control" placeholder="Adresa" required onChange={e => setAdresa(e.target.value)} />
                <input type="password" id="inputPassword" className="form-control" placeholder="Parola" required onChange={e => setParola(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    );
};

export default AddUserForm;