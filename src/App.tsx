import { Navbar } from './components/Navbar'
import { useAppSelector } from './app/hooks'
import { UserPage } from './features/users/UserPage'
import { LoginPage } from './features/auth/LoginPage'
import { UsersList } from './features/users/UsersList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { selectCurrentUsername } from './features/auth/authSlice'
import { NotificationsList } from './features/notifications/NotificationsList'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = useAppSelector(selectCurrentUsername)

  if (!userLoggedIn) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />}></Route>
                  <Route path="/posts/add-new-post" element={<AddPostForm />}></Route>
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationsList />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
