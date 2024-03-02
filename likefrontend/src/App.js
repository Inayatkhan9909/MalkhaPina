
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Post from './components/Post'
import Comment from './components/Comment'
import Profile from './components/Profile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       <Routes>
       <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Post' element={<Post/>}/>
        <Route path='/Comment' element={<Comment/>} />
        <Route path='/Profile' element={<Profile/>} />
       </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
