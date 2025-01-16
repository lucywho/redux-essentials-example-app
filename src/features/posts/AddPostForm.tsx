import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { postAdded } from './postsSlice'
import { selectAllUsers } from '@/features/users/usersSlice'

export const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const addPost = (formData: FormData) => {
    const title = formData.get('postTitle') as string
    const content = formData.get('postContent') as string
    const userId = formData.get('userId') as string
    if (title && content) {
      dispatch(postAdded(title, content, userId))
    }
    navigate(`/`)
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form action={addPost as unknown as string}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="userId">User:</label>
        <select title="User" id="postAuthor" name="userId" defaultValue="" required>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
