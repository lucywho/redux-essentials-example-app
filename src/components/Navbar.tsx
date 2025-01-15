import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">All Posts</Link>
            <Link to="/posts/add-new-post">Add Post</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
