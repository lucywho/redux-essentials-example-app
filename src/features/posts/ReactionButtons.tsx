import { useAppDispatch } from '@/app/hooks'
import { reactionAdded } from './postsSlice'
import type { Post, ReactionName } from './postsSlice'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  rocket: '🚀',
  hooray: '🎉',
  heart: '❤️',
  eyes: '👀',
}

interface ReactionButtonsProps {
  post: Post
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    const reaction = stringName as ReactionName
    return (
      <button
        key={reaction}
        type="button"
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
