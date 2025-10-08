import { createContext, useState } from "react"

export const storeContext = createContext(null)

const StoreContextProvider = (props) => {
    const base_url = "http://localhost:4500"
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null)
    const [showLogin, setShowLogin] = useState(false)
    
    const contextValue = {
        showLogin,
        setShowLogin,
        base_url,
        token,
        setToken,
        currentUser,
        setCurrentUser
    }

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider