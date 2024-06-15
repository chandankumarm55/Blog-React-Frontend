import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { backEndUrl } from '../utils/constant';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import Footer from './Footer';
const Edit = () => {
    const { userInfo } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('');

    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('')
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        fetch(`${backEndUrl}/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.post.title)
                    setSummary(postInfo.post.summary)
                    setContent(postInfo.post.content)
                })
            })
    }, [])

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
            toast.error('Please Enter  Content of the Blog');
            return false;
        }
        return true;
    };


    const updatePost = async (e) => {
        e.preventDefault();
        if (validation()) {
            const data = new FormData();
            data.set('title', title);
            data.set('summary', summary);
            data.set('content', content);
            data.set('file', files?.[0]);
            data.set('id', id)
            data.set('userId', userInfo.user._id)

            const res = await fetch(`${backEndUrl}/post`, {
                method: 'PUT',
                body: data,
                credentials: 'include'
            })
            if (res.ok) {
                navigate(`/post/${id}`)
            }

        }

    }



    return (
        <main>
            <NavBar />
            <form onSubmit={ updatePost }>
                <input type='text' placeholder='Title'
                    value={ title } onChange={ (e) => setTitle(e.target.value) }
                />
                <input type='text' placeholder='Summary'
                    value={ summary } onChange={ (e) => setSummary(e.target.value) }
                />
                <input type='file' onChange={ e => setFiles(e.target.files) }
                />

                <ReactQuill
                    modules={ {
                        toolbar: toolbarOptions
                    } }
                    theme='snow'
                    value={ content }
                    onChange={ newValue => setContent(newValue) }
                />
                <button style={ { marginTop: '15px' } }>Update Post</button>
            </form>
            <Footer />
        </main>
    )
}

export default Edit
