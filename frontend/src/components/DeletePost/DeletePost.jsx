import React, { useContext, useState } from 'react'
import './DeletePost.css'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function DeletePost({postId, onDeleteSuccess}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const {base_url, token} = useContext(storeContext)

    const deletePost = async () => {
        setIsDeleting(true)
        try {
            const {data} = await axios.delete(`${base_url}/api/post/${postId}`, {headers: {token}})
            toast(data.message)
            onDeleteSuccess?.()
        } catch (err) {
            console.log(err)
            toast("Failed to delete post")
        } finally {
            setIsDeleting(false)
        }
    }
  return (
    <button onClick={deletePost} disabled={isDeleting} className='delete btn'>
        {isDeleting ? "Deleting..." : "Delete"}
    </button>
  )
}

export default DeletePost