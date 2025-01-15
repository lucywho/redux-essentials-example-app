import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { postUpdated } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => state.posts.find((post) => post.id === postId))

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

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form action={savePostChanges as unknown as string}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
