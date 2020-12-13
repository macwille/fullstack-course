
export const setMessage = (message, timeout) => {
  return (dispatch) => {

    const ID = setTimeout(
      () => dispatch({ type: 'SET_MESSAGE', message: '', ID: null }),
      timeout * 1000
    )

    dispatch({
      type: 'SET_MESSAGE',
      message,
      ID,
    })
  }
}

const notificationReducer = (state = {}, action) => {

  if (action.type === 'SET_MESSAGE') {
    clearTimeout(state.ID)
    return { message: action.message, timeoutID: action.ID }
  }

  return state
}

export default notificationReducer