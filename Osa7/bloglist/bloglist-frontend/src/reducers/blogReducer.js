import blogService from '../services/blogs'

export const vote = (blog) => {
  return async dispatch => {
    const toChange = { ...blog, votes: blog.votes + 1 }
    const updated = await blogService.update(blog.id, toChange)
    const id = updated.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_NEW',
      data: newBlog,
    })
  }
}

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changed)
        .sort(function (x, y) {
          return y.votes - x.votes
        })

    case 'CREATE_NEW':
      const updatedState = [...state, action.data]
      return [...updatedState]
    default:
      return state
  }
}

export default reducer