import React from 'react'
import { UserIcon } from './UserIcon'
import { Link } from 'react-router-dom'
import { logout } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { fetchNotifications } from '@/features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user
  let navContent: React.ReactNode = null

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout())
    }

    const fetchNewNotifications = () => {
      dispatch(fetchNotifications())
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">All Posts</Link>
          <Link to="/posts/add-new-post">Add Post</Link>
          <Link to="/users">All users</Link>
          <Link to="/notifications">Notifications</Link>
          <button type="button" className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
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
        <h1>PurpleSky</h1>
        {navContent}
      </section>
    </nav>
  )
}
