
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      console.log('SET', action.data)
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setLoginUser = (user) => {
  console.log('setLoginUser:',user)
  return {
    type: 'SET',
    data: user,
  }
}

export const clearLoginUser = () => {
  console.log('clearLoginUser')
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR',
    })
  }
}

export default userReducer