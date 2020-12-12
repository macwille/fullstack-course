export const setMessage = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            message,
        }
    }
}
export const setError = (message) => {
    return {
        type: 'SET_ERROR',
        data: {
            message,
        }
    }
}
export const clearMessage = () => {
    return {
        type: 'CLEAR',
    }

}

const notificationReducer = (action, state = null) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'SET_ERROR':
            return `ERROR: ${action.data.message}`
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export default notificationReducer