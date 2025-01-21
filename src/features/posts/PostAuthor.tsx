import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '@/features/users/usersSlice'

interface PostAuthorProps {
  userId: string
  showPrefix?: boolean
}

export const PostAuthor = ({ userId, showPrefix = true }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <p>
      {showPrefix ? 'By ' : null} {author ? author.name : 'anonymous'}
    </p>
  )
}
