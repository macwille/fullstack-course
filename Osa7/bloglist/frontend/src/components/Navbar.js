import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import { setMessage } from '../reducers/notificationReducer'

const Navbar = ({ user, setUser }) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear()
    setUser(null)
    history.push('/')
    dispatch(setMessage('Logged out.'))
  }

  return (
    <nav>
      {user !== null ?
        <div>
          <Link to="/"><button>Home</button></Link>
          <Link to="/blogs"><button>Blogs</button></Link>
          <Link to="/create"><button>Create</button></Link>
          <Link to="/users"><button>Users</button></Link>
          <button onClick={handleLogout}>Logout</button>
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