
export const setReduxUser = (user) => {
  return async dispatch => {
    return dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('SET_USER')
      return action.data
    default:
      return state
  }
}

export default userReducer