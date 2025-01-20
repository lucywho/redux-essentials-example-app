import React, { useState, useTransition } from 'react'
import { addNewPost } from './postsSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'

export const AddPostForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)!
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')
  const [isSubmitting, startTransition] = useTransition()

  const addPost = async (formData: FormData) => {
    setAddRequestStatus('pending')
    startTransition(() => {
      const title = formData.get('postTitle') as string
      const content = formData.get('postContent') as string

      if (title && content) {
        try {
          dispatch(addNewPost({ title, content, user: userId })).unwrap()
          navigate(`/posts`)
        } catch (error) {
          console.error(error)
        } finally {
          setAddRequestStatus('idle')
        }
      }
    })
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form action={addPost as unknown as string}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button type="submit" disabled={isSubmitting}>
          Save Post
        </button>
      </form>
    </section>
  )
}
