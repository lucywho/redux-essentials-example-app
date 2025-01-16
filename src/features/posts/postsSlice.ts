import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns' //to mock different timestamps on initial state

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content' | 'user'>

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '1', date: sub(new Date(), { minutes: 10 }).toISOString() },
  {
    id: '2',
    title: 'Second Post!',
    content: 'Great new content!',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content, user } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
      }
    },
  },
  selectors: {
    selectAllPosts: (postsState) => postsState,
    selectPostById: (postsState, id: string) => postsState.find((post) => post.id === id),
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const { selectAllPosts, selectPostById } = postsSlice.selectors

// Leaving commented code below for reference: selectors can be stand alone, and accept RootState as an argument, or included in the createSlice (as above) where they only take the slice state as an argument

// export const selectAllPosts = (state: RootState) => state.posts

// export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)

export default postsSlice.reducer
