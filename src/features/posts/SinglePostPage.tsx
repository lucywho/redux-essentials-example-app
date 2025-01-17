import { PostAuthor } from './PostAuthor'
import { useAppSelector } from '@/app/hooks'
import { selectPostById } from './postsSlice'
import { TimeAgo } from '@/components/TimeAgo'
import { Link, useParams } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUsername } from '@/features/auth/authSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = postId ? useAppSelector((state) => selectPostById(state, postId)) : undefined

  const currentUsername = useAppSelector(selectCurrentUsername)

  const canEdit = currentUsername === post?.user

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        {post.user && <PostAuthor userId={post.user} />}
        <p className="post-content">{post.content}</p>
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}
