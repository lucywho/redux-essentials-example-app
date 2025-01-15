import { nanoid } from '@reduxjs/toolkit'

import { useAppDispatch } from '@/app/hooks'

import { type Post, postAdded } from './postsSlice'

export const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const addPost = (formData: FormData) => {
    const title = formData.get('postTitle') as string
    const content = formData.get('postContent') as string

    const newPost: Post = {
      id: nanoid(),
      title,
      content,
    }

    dispatch(postAdded(newPost))
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form action={addPost}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
