import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { MdOutlineLogout } from "react-icons/md"
import { FaRegUser } from "react-icons/fa"
import { IoCreateOutline } from "react-icons/io5";
import { storeContext } from '../../context/StoreContext'

function Navbar() {
  const {setShowLogin} = useContext(storeContext)
  const {currentUser, token, setToken, setCurrentUser} = useContext(storeContext)
  const [isActive, setIsActive] = useState("home")
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    setToken('')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <nav>
      <div className='navbar'>
          <img className='logo' src={assets.app_logo} alt="" onClick={()=> navigate('/')}/>
          <ul className='navbar-menu'>
              <Link to='/' onClick={()=>setIsActive("home")} className={isActive =="home" ? "active" : ""}>home</Link>
              <a href="#about" onClick={()=>setIsActive("about")} className={isActive =="about" ? "active" : ""}>about</a>
              <a href="#categories" onClick={()=>setIsActive("categories")} className={isActive =="categories" ? "active" : ""}>categories</a>
              <a href="#contact" onClick={()=>setIsActive("contact")} className={isActive =="contact" ? "active" : ""}>contact</a>
          </ul>
          <div className="navbar-right">
            <Link to="/authors">Authors</Link>
            {!token ? 
              <button onClick={setShowLogin}>Sign In</button>
              :
            <div className='nav-profile'>
              <img src={assets.profile_icon}/>
              <ul className="nav-profile-dropdown">
                <li className='option' onClick={()=>navigate(`/profile/${currentUser?._id}`)}>
                  <FaRegUser />
                  <small>Profile</small>
                </li>
                <hr />
                <li className='option' onClick={()=>navigate('/create')}>
                  <IoCreateOutline />
                  <small>Create_Post</small>
                </li>
                <hr />
                <li className='option' onClick={logout}>
                  <MdOutlineLogout />
                  <small>Logout</small>
                </li>
              </ul>
            </div>
            }
          </div>
      </div>
    </nav>
  )
}

export default Navbar