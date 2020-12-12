export const setFilter = (filter) => {
    return {
        type: 'SET',
        filter,
    }
}

const filterReducer = (action, state = '') => {
    if (action.type === 'SET') {
        return action.filter

    }
    return state

}

export default filterReducer