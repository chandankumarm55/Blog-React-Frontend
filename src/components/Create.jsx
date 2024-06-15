import React, { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { backEndUrl } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { UserContext } from '../context/userContext';
import Footer from './Footer';

const Create = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const validation = () => {
        if (title === '') {
            toast.error('Please Enter Title of the Blog');
            return false;
        }
        if (summary === '') {
            toast.error('Please Enter Summary of the Blog');
            return false;
        }
        if (!files || files.length === 0) {
            toast.error('Please Select a Cover Pic of the Blog');
            return false;
        }
        if (content === '') {
            toast.error('Please Enter Content of the Blog');
            return false;
        }
        return true;
    };

    const createNewPost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('userId', userInfo?.user?._id);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        try {
            if (validation()) {
                const res = await fetch(`${backEndUrl}/post`, {
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                });

                if (res.ok) {
                    toast.success('Post created successfully');
                    navigate('/');
                    console.log('Post created successfully');
                } else {
                    console.error('Failed to create post');
                }
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
    ];

    return (
        <main>
            <NavBar />
            <form onSubmit={ createNewPost }>
                <input
                    type='text'
                    placeholder='Title'
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <input
                    type='text'
                    placeholder='Summary'
                    value={ summary }
                    onChange={ (e) => setSummary(e.target.value) }
                />
                <input
                    type='file'
                    onChange={ (e) => setFiles(e.target.files) }
                />

                <ReactQuill
                    modules={ { toolbar: toolbarOptions } }
                    theme='snow'
                    value={ content }
                    onChange={ newValue => setContent(newValue) }
                />
                <button style={ { marginTop: '15px' } }>Post</button>
            </form>
            <Footer />
        </main>
    );
};

export default Create;
