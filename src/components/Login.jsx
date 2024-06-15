import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import toast from 'react-hot-toast';
import { backEndUrl } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
        if (username === '' || password === '') {
            toast.error('Please fill in both username and password fields');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (Validation()) {
            const res = await fetch(`${backEndUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user-info', JSON.stringify(data));
                toast.success(data.message);
                navigate('/'); // Redirect after successful login
            } else {
                toast.error(data.message);
            }
        }
    };

    return (
        <main>
            <NavBar />
            <form className='login' onSubmit={ handleLogin }>
                <h1>Login</h1>
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
                <button type='submit'>Login</button>
            </form>
        </main>
    );
};

export default Login;
