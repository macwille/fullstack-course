export const setReduxUser = (user) => {
  return ({
    type: 'SET_USER',
    data: user
  })
}

export const clearReduxUser = () => {
  return ({
    type: 'CLEAR_USER'
  })
}

const userReducer = (state = null, action) => {
  console.log('userReducer called', action.type, action.data)
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export default userReducer