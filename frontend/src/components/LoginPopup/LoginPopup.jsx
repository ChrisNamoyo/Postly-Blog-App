import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { storeContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function LoginPopup() {
    const {setShowLogin} = useContext(storeContext)
    const [currentState, setCurrentState] = useState("Sign Up")
    const [isLoading, setIsLoading] = useState(false)
    // have an error state only when condionally rendering error UX/UI
    const { base_url, setToken, setCurrentUser } = useContext(storeContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const url = currentState === "Sign Up" ?
            `${base_url}/api/user/register` : `${base_url}/api/user/login`

        const payLoad = currentState === "Sign Up"
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            }
            : {
                email: formData.email,
                password: formData.password
            }

        try {
            const response = await axios.post(url, payLoad)
            const data = response.data
            console.log(data)

            if (!data.success) {
                toast(data.message || `${currentState === "Sign Up" ? "Registration" : "Login"} failed`)
            } else {
                setToken(data.token)
                setCurrentUser(data.user)
                localStorage.setItem("currentUser", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
                setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                setShowLogin(false)
            }
        } catch (err) {
            console.log(err)
            toast("Network or server error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className="login-popup-header">
                    <h2>{currentState === "Sign Up" ? "Sign Up" : "Login"}</h2>
                    <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder='Your name'
                            onChange={handleChange}
                            name='name'
                            value={formData.name}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder='Your email'
                        onChange={handleChange}
                        name='email'
                        value={formData.email}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={handleChange}
                        name='password'
                        value={formData.password}
                        required
                    />
                    {currentState === "Sign Up" && (
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            required
                        />
                    )}
                </div>
                <button type='submit' disabled={isLoading} >
                    {isLoading ? "Loading..." : currentState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Sign Up" ?
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                    :
                    <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Me</span></p>
                }
            </form>

        </div>
    )
}

export default LoginPopup