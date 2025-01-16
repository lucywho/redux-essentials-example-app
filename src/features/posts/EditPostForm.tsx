import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { postUpdated, selectPostById } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const post = postId ? useAppSelector((state) => selectPostById(state, postId)) : undefined

  const users = useAppSelector(selectAllUsers)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const savePostChanges = (formData: FormData) => {
    const title = formData.get('postTitle') as string
    const content = formData.get('postContent') as string
    const userId = formData.get('userId') as string

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content, user: userId }))
      navigate(`/posts/${postId}`)
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Edit Post</h2>
      <form action={savePostChanges as unknown as string}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />
        <label htmlFor="userId">User:</label>
        <select title="User" id="postAuthor" name="userId" defaultValue={post.user} required>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
