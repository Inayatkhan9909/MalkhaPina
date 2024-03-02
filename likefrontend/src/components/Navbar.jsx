import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
         <div className="title">
           <h1> MakhaPina</h1>
            </div>
         <div className="items">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Register">Register</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link to="/Post">Post</Link></li>
            </ul>
         </div>

    </div>
  )
}

export default Navbar