import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import toast from 'react-hot-toast';
import { backEndUrl } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user-info');
        if (user) {
            navigate('/'); // Redirect to home if the user is already logged in
        }
    }, [navigate]);

    const Validation = () => {
        if (!username || !password) {
            toast.error('All fileds are required')
            return false;
        }
        if (username.length < 4) {
            toast.error('Username must be at least 4 characters');
            return false;
        }
        if (password.length < 6) { // Optional: Add password length validation
            toast.error('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const register = async (e) => {
        e.preventDefault();

        if (Validation()) {
            try {
                const res = await fetch(`${backEndUrl}/register`, {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success('Registration successful');
                    navigate('/login'); // Redirect to login page after successful registration
                } else {
                    const errorMessage = data.message || 'Registration failed';
                    toast.error(errorMessage);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                toast.error('Registration failed');
            }
        }
    };

    return (
        <main>
            <NavBar />
            <form className='register' onSubmit={ register }>
                <h1>Register</h1>
                <input
                    type='text'
                    placeholder='Username'
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <button type='submit'>Sign Up</button>
            </form>
            <Footer />
        </main>
    );
};

export default Signup;
