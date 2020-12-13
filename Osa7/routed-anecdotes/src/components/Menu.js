import React from 'react'
import {
  Link
} from "react-router-dom"

const Menu = () => {

  return (
    <div>
      <nav>
        <Link to='/'><button>Anecdotes</button></Link>
        <Link to='/create'><button>Create</button></Link>
        <Link to='/about'><button>About</button></Link>
      </nav>
    </div>
  )
}

export default Menu