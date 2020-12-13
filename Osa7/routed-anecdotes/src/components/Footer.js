import React from 'react'

const Footer = () => {

  const padding = {
    paddingTop: 50
  }

  return (
    <div style={padding}>
      <p>Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Fullstack-MOOC</a>.</p>
      <p>See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>Here</a> for the source code.</p>
    </div>
  )
}

export default Footer