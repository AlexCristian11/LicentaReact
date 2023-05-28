﻿import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        await fetch('https://localhost:7277/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                parola
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/" />;
    }


        return (
            <div>
                <main className="form-signin">
                    <form onSubmit={ submit }>
                        <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Adresa de email" required onChange={e => setEmail(e.target.value) } />
                        <input type="password" id="inputPassword" className="form-control" placeholder="Parola" required onChange={e => setParola(e.target.value) } />
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </form>
                </main>
            </div>
        )
}

export default Login;