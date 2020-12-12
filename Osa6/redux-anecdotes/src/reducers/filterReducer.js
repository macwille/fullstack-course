export const setFilter = (filter) => {
  return {
    type: 'SET',
    filter,
  }
}

const filterReducer = (state = '', action) => {
  if (action.type === 'SET') {
    return action.filter

  }
  return state

}

export default filterReducer