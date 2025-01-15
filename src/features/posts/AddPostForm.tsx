import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'

import { type Post, postAdded } from './postsSlice'

export const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addPost = (formData: FormData) => {
    const title = formData.get('postTitle') as string
    const content = formData.get('postContent') as string
    if (title && content) {
      dispatch(postAdded(title, content))
    }
    navigate(`/`)
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form action={addPost as unknown as string}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
