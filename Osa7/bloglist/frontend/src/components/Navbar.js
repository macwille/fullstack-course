import React from 'react'
import { Link, useHistory } from "react-router-dom"

const Navbar = ({ user, setUser, setErrorMessage }) => {

  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear()
    setUser(null)
    history.push('/')
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <nav>
      {user !== null ?
        <div>
          <Link to="/"><button>Home</button></Link>
          <Link to="/blogs"><button>Blogs</button></Link>
          <Link to="/create"><button>Create</button></Link>
          <Link to="/users"><button>Users</button></Link>
          <button style={{ float: "center" }} onClick={handleLogout}>Logout</button>
        </div>
        :
        <div>
          <Link to="/"><button>Home</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      }
    </nav >
  )
}

export default Navbar