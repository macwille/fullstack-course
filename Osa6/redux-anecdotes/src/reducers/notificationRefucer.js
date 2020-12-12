
export const setMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null,
      })
    }, time * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export default notificationReducer