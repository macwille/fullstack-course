import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/blogReducer'
import testReducer from './reducers/testReducer'

const reducer = combineReducers({
  user: userReducer,
  counter: testReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store