
import './App.css';
import BlogCard from './components/BlogCard';
import Login from './components/Login'
import NavBar from './components/NavBar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './components/Signup'
import Home from './components/Home';
import { Toaster } from 'react-hot-toast'
import Create from './components/Create';
import Post from './components/Post';
import Edit from './components/Edit';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/create' element={ <Create /> } />
        <Route path='/post/:id' element={ <Post /> } />
        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
      <Toaster />
    </BrowserRouter>


  );
}

export default App;
