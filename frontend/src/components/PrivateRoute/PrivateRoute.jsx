import { storeContext } from '../../context/StoreContext'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const {token, setShowLogin} = useContext(storeContext)
  useEffect(() => {
    if(!token) {
      setShowLogin(true)
    }
  }, [token])

  return token ? children : <Navigate to={'/'}/>
  
}

export default PrivateRoute 