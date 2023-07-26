import React, { useEffect, useState, useContext } from 'react';
import './Account.css';
import { DarkModeContext } from '../DarkModeContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const Account = () => {

    const [userData, setUserData] = useState(null);
    const [receipts, setReceipts] = useState(null);
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        adresa: '',
        email: ''
    });

    useEffect(() => {

        const userId = localStorage.getItem('userId');
        console.log(userId);

        fetch(`https://localhost:7277/api/user/${userId}`) 
            .then((response) => response.json())
        .then((data) => {
            setUserData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

        fetch(`https://localhost:7277/api/receipts?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setReceipts(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const DateTransformer = (date) => {
        const rawDate = date;
        const newDate = new Date(rawDate);
        const formattedDate = newDate.toLocaleString();

        return formattedDate;
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        fetch(`https://localhost:7277/api/edit/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User data updated successfully:', data);
                NotificationManager.success("Date modificate cu succes");
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                NotificationManager.error("Eroare modificare date");
            });


    }


    return (
        <div className="account-component">
            {userData ? (
                <div className="account-details">
                    <h1>Datele mele</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="inputs">
                            <input className="input" placeholder={userData.nume} name="nume" value={formData.nume} onChange={handleInputChange} />
                            <input className="input" placeholder={userData.prenume} name="prenume" value={formData.prenume} onChange={handleInputChange} />
                            <input className="input" placeholder={userData.adresa} name="adresa" value={formData.adresa} onChange={handleInputChange} />
                            <input className="input" placeholder={userData.email} name="email" value={formData.email} onChange={handleInputChange} />
                            <button id="edit" className="btn-primary" type="submit">Editare</button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            {receipts && receipts.length > 0 ? (
                <div className="receipts-container">
                    <h2>Comenzi</h2>
                    {receipts.map((receipt) => (
                        <div key={receipt.id} className={`receipt ${isDarkMode ? 'receipt-dark' : ''}`}>
                            <p>Număr factură: {receipt.id}</p>
                            <p>Data: {DateTransformer(receipt.date)}</p>
                            <p>Total: {receipt.total} Lei</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nu există comenzi</p>
            )}
            <NotificationContainer className="custom-notification-container"
                notificationClassName="custom-notification" />
        </div>
    );
};

export default Account;