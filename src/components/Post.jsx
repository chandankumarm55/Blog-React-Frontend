import React, { useContext, useEffect, useState } from 'react'
import { backEndUrl } from '../utils/constant'
import { Link, useParams } from 'react-router-dom'
import NavBar from './NavBar';
import { format } from 'date-fns';
import { UserContext } from '../context/userContext';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { userInfo } = useContext(UserContext)
    const [postInfo, setPostInfo] = useState(null)
    console.log('USERinFO', userInfo)
    useEffect(() => {
        if (userInfo == null || userInfo == '') {
            navigate('/login')
        }
        fetch(`${backEndUrl}/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    }, [])
    console.log(postInfo)
    if (!postInfo) return '';
    return (
        <main>


            <div className='post-page'>
                <NavBar />
                <h1>{ postInfo.post.title }</h1>
                <time>{ format(new Date(postInfo.post.createdAt), 'MMM d, yyyy HH:mm') }</time>
                <div className='author'>by { postInfo.post.author.username }</div>
                {
                    userInfo?.user?._id === postInfo.post.author._id && (
                        <div className='edit-row'>
                            <Link to={ `/edit/${postInfo.post._id}` } className='edit-btn' > <FaRegEdit size={ 18 } />Edit this post</Link>
                        </div>

                    )
                }
                <div className='image'>
                    <img src={ `${backEndUrl}/${postInfo.post.cover}` } />
                </div>

                <div className='content' dangerouslySetInnerHTML={ { __html: postInfo.post.content } } />


            </div>
        </main>

    )
}

export default Post
