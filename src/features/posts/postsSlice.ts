import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { userLoggedOut } from '../auth/authSlice'
import { createAppAsyncThunk } from '@/app/withTypes'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

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

interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content' | 'user'>
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    },
  },
)

export const addNewPost = createAppAsyncThunk('posts/addNewPost', async (initialPost: NewPost) => {
  const response = await client.post<Post>('/fakeApi/posts', initialPost)
  return response.data
})

// const initialReactions: Reactions = {
//   thumbsUp: 0,
//   rocket: 0,
//   hooray: 0,
//   heart: 0,
//   eyes: 0,
// }

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, (state) => {
        return initialState
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find((post) => post.id === postId)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
