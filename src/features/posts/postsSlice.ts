import { sub } from 'date-fns' //to mock different timestamps on initial state
import { RootState } from '@/app/store'
import { userLoggedOut } from '../auth/authSlice'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Reactions {
  thumbsUp: number
  rocket: number
  hooray: number
  heart: number
  eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
  id: string
  date: string
  user: string
  title: string
  content: string
  reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content' | 'user'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  rocket: 0,
  hooray: 0,
  heart: 0,
  eyes: 0,
}

const initialState: Post[] = [
  {
    id: '1',
    user: '1',
    title: 'First Post!',
    content: "Hello, is it me you're looking for!",
    reactions: initialReactions,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    user: '2',
    title: 'Second Post!',
    content: 'Great new content!',
    reactions: initialReactions,
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
            reactions: initialReactions,
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content, user } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.user = user
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => {
      return []
    })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)

export default postsSlice.reducer
