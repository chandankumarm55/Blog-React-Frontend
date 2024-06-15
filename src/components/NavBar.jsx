import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { backEndUrl } from '../utils/constant';
import toast from 'react-hot-toast';

const NavBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { userInfo, setUserInfo } = useContext(UserContext);

    const logout = async () => {
        try {
            await fetch(`${backEndUrl}/logout`, {
                credentials: 'include',
                method: 'POST',
            });
            toast.success('Logout successful');
            localStorage.removeItem('user-info')
            setUserInfo(null);

            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out');
            navigate('/login');
        }
    };

    const username = userInfo?.user?.username;

    return (
        <header>
            <Link to='/' className='Logo'>Blog</Link>
            <nav>
                { username && pathname !== '/create' && <Link to='/create'>Create new post</Link> }
                { username ? (
                    <Link to='#' onClick={ logout }>Logout</Link>
                ) : (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                ) }
            </nav>
        </header>
    );
};

export default NavBar;
