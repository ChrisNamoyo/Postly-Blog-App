import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import {Route, Routes} from 'react-router-dom'
import PostDetail from './pages/PostDetail/PostDetail'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Authors from './pages/Authors/Authors'
import AuthorPosts from './pages/AuthorPosts/AuthorPosts'
import UserProfile from './pages/UserProfile/UserProfile'
import Dashboard from './pages/Dashboard/Dashboard'
import EditPost from './pages/EditPost/EditPost'
import CreatePost from './pages/CreatePost/CreatePost'
import CategoryPost from './pages/CategoryPost/CategoryPost'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { storeContext } from 'context/StoreContext'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'

function App() {
  const {showLogin} = useContext(storeContext)
  
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      {showLogin && <LoginPopup/>}
      <div className='app'>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/post/:id' element={<PostDetail />}/>
          <Route path='/post/:id/edit' element={<PrivateRoute><EditPost /></PrivateRoute>}/>
          <Route path='/posts/categories/:category' element={<CategoryPost />}/>
          <Route path='/authors' element={<Authors />}/>
          <Route path='/create' element={<PrivateRoute><CreatePost /></PrivateRoute>}/>
          <Route path='/posts/users/:id' element={<AuthorPosts />}/>
          <Route path='/profile/:id' element={<PrivateRoute><UserProfile /></PrivateRoute>}/>
          <Route path='/user-posts/:id' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App