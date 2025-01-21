import { login } from './authSlice'
import { useNavigate } from 'react-router-dom'
import { selectAllUsers } from '@/features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const loginUser = async (formData: FormData) => {
    const username = formData.get('username') as string
    dispatch(login(username)).then(() => navigate('/posts'))
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Welcome to PurpleSky!</h2>
      <h3>Please log in:</h3>
      <form action={loginUser as unknown as string}>
        <label htmlFor="username">User:</label>
        <select id="username" name="username" required>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="submit">Log In</button>
      </form>
    </section>
  )
}
