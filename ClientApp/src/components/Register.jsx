import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [email, setEmail] = useState('');
    const [adresa, setAdresa] = useState('');
    const [parola, setParola] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

         await fetch('https://localhost:7277/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nume,
                prenume,
                email,
                adresa,
                parola
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

        return (
            <div className="form-signin">
                <form onSubmit={ submit }>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>
                    <input type="text" className="form-control" placeholder="Nume" required onChange={e => setNume(e.target.value) } />
                    <input type="text" className="form-control" placeholder="Prenume" required onChange={e => setPrenume(e.target.value)} />
                    <input type="email" id="inputEmail" className="form-control" placeholder="Adresa de email" required onChange={e => setEmail(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Adresa" required onChange={e => setAdresa(e.target.value)} />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Parola" required onChange={e => setParola(e.target.value)} />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </div>
        );
};

export default Register;