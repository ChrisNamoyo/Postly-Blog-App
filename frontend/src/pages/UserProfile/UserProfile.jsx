import React, { useContext, useEffect, useState } from 'react'
import './UserProfile.css'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function UserProfile() {
  const {currentUser, base_url, token, setCurrentUser} = useContext(storeContext)
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: ""
  })

  // generate preview when a new file is chosen
  useEffect(() => {
    if(avatar && avatar instanceof Blob) {
      const objectUrl = URL.createObjectURL(avatar)
      setPreview(objectUrl)

      // cleanup url to prevent memory leaks
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreview('')
    }
  }, [avatar])

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  const updateAvatar = async (e) => {
    e.preventDefault()
    setIsAvatarTouched(false)
    try {
      const postData = new FormData()
      postData.set("avatar", avatar)
      const {data} = await axios.post(`${base_url}/api/user/change-avatar`, postData, {headers: {token}})
      if(data.success) {
        toast(data.message)
        setAvatar(null)
        setCurrentUser(data.updatedUser)
        localStorage.setItem("currentUser", JSON.stringify(data.updatedUser))
      }
    } catch (err) {
      console.log(err)
      toast("Network or server error")
    }
  }

  const editUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const {data} = await axios.patch(`${base_url}/api/user/${id}`, formData, {headers: {token}})
      if(!data.success) {
        setError(data.message)
      } else {
        setError('')
        toast(data.message)
        setCurrentUser(data.userData)
        localStorage.setItem("currentUser", JSON.stringify(data.userData))
      }
    } catch (err) {
      console.log(err)
      toast("Network or server error")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className='profile'>
        <Link to={`/user-posts/${currentUser._id}`} className='user-posts-link btn'>
          Go to my posts <span>&#8594;</span>
        </Link>
        <div className="user-profile-wrapper">
          <div className="user-profile">
            <img src={ preview || currentUser.avatarUrl}/>
          </div>
          <form className='user-avatar-form'>
            <input 
              type="file" 
              name='avatar' 
              id='avatar' 
              onChange={(e) => {
                setAvatar(e.target.files[0])
                setIsAvatarTouched(true)
              }}
            />
            <label htmlFor="avatar"><FaEdit /></label>
          </form>
          {isAvatarTouched && <button className='user-avatar-checked-btn' onClick={updateAvatar}><FaCheck /></button>}
        </div>

        <form className='user-credential-form' onSubmit={editUser}>
          <h3>{currentUser.name}</h3>
          <div className="user-profile-inputs">
            {error && <p className='error'>{error}</p>}
            <input type="text" placeholder='Your Name' name='name' value={formData.name} onChange={handleChange} autoComplete='name'/>
            <input type="email" placeholder='Your Email' name='email' value={formData.email} onChange={handleChange} autoComplete='email'/>
            <input type="password" placeholder='Current Password' name='currentPassword' value={formData.currentPassword} onChange={handleChange} autoComplete='current-password'/>
            <input type="password" placeholder='New Password' name='newPassword' value={formData.newPassword} onChange={handleChange} autoComplete='new-password'/>
            <input type="password" placeholder='Confirm New Password' name='newConfirmPassword' value={formData.newConfirmPassword} onChange={handleChange} autoComplete='new-password'/>
            <button type='submit' disabled={isLoading} className='btn'>
              {isLoading ? "Updating..." : "Update Details"}
            </button>
          </div>
        </form>
    </section>
  )
}

export default UserProfile