import { Link } from 'react-router-dom'
import { UserIcon } from './UserIcon'
import { userLoggedOut } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React from 'react'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user
  let navContent: React.ReactNode = null

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(userLoggedOut())
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">All Posts</Link>
          <Link to="/posts/add-new-post">Add Post</Link>
        </div>
        <div className="userDetails">
          <UserIcon size="32px" />
          <span>{user?.name}</span>
          <button className="button small" onClick={onLogoutClicked}>
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  )
}
