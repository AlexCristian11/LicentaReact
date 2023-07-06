import React, { useEffect, useState } from 'react';
import './Account.css';

const Account = () => {

    const [userData, setUserData] = useState(null);

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

}, []);

    return (
        <div className="account-component">
            {userData ? (
                <div className="account-details">
                    <h1>Datele mele</h1>
                    <div className="inputs">
                        <input className="input" placeholder={userData.nume}></input>
                        <input className="input" placeholder={userData.prenume}></input>
                        <input className="input" placeholder={userData.adresa}></input>
                        <input className="input" placeholder={userData.email}></input>
                        <button id="edit" className="btn-primary">Editare</button>
                    </div>
                 </div>
            ) : (
                    <p>Loading user data...</p>
            )}
        </div>
    )
}

export default Account;