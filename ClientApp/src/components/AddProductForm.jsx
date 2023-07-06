import React, { useState } from 'react';
import './AddProductForm.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const AddProductForm = () => {

    const [nume, setNume] = useState('');
    const [descriere, setDescriere] = useState('');
    const [pret, setPret] = useState('');
    const [stoc, setStoc] = useState('');
    const [imagine, setImagine] = useState('');
    const [categoryid, setCategoryid] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7277/api/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume,
                    descriere,
                    pret,
                    stoc,
                    imagine,
                    categoryid
                }),
            });

            if (response.ok) {
                NotificationManager.success('Produs adăugat cu success');
            } else {
                NotificationManager.error('Eroare adăugare produs');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-product">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Adăugare produs</h1>
                <input type="text" className="form-control" placeholder="Nume" required onChange={e => setNume(e.target.value)} />
                <textarea type="text" className="form-control" placeholder="Descriere" required onChange={e => setDescriere(e.target.value)} />
                <input type="text" className="form-control" placeholder="Preț" required onChange={e => setPret(e.target.value)} />
                <input type="text" className="form-control" placeholder="Stoc" required onChange={e => setStoc(e.target.value)} />
                <input type="text" className="form-control" placeholder="Imagine" required onChange={e => setImagine(e.target.value)} />
                <input type="text" className="form-control" placeholder="ID Categorie" required onChange={e => setCategoryid(e.target.value)} />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
                <NotificationContainer className="custom-notification-container"
                    notificationClassName="custom-notification" />
        </div>
    )
}

export default AddProductForm;