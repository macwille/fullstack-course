import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Container, Jumbotron, Button } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setReduxblogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Loading from './Loading'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [blog, setBlog] = useState(null)
  const id = useParams().id

  useEffect(() => {
    blogService
      .getById(id)
      .then((r) => setBlog(r))
  }, [id])

  const addLike = () => {
    dispatch(setMessage(`You liked "${blog.title}".`))
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        dispatch(setReduxblogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog)))
      })
  }

  if (!blog) {

    return (
      <Loading />
    )
  } else {

    return (
      <Container>
        <Helmet>
          <title>Blogs - {blog.title.trim()}</title>
        </Helmet>
        <Jumbotron>
          <h1>{blog.title}</h1>
          <p><em>{blog.author.trim()}</em></p>
        </Jumbotron>
        <Container>
          <h4>Info</h4>
          <p>Website: <a href={blog.url}>{blog.url}</a></p>
          <p>Likes: {blog.likes}</p><Button onClick={() => addLike()}>Like</Button>
        </Container>
        <br />
        <Container>
          <h4>Comments</h4>
        </Container>
      </Container>
    )
  }
}

export default SingleBlog