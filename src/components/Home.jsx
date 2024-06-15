import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import BlogCard from './BlogCard';
import { backEndUrl } from '../utils/constant';
import { UserContext } from '../context/userContext';

const Home = () => {
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = localStorage.getItem('user-info');
                if (!user) {
                    navigate('/login');
                    return;
                }

                setUserInfo(JSON.parse(user));

                const response = await fetch(`${backEndUrl}/post`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const posts = await response.json();
                setPosts(posts);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchData();
    }, [navigate, setUserInfo]);

    if (error) {
        navigate('/login')
    }

    return (
        <main>
            <NavBar />
            { posts.length > 0 ? (
                posts.map(post => <BlogCard key={ post.id } { ...post } />)
            ) : (
                <div>No Blogs yet...!</div>
            ) }
        </main>
    );
};

export default Home;
