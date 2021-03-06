import { combineReducers } from 'redux'
import { IRootState } from '../../interfaces/stateTypes'
import authReducer from './authReducer'
import todoReducer from './todoReducer'

const rootReducer = combineReducers<IRootState>({
  todoState: todoReducer,
  authState: authReducer
})

export default rootReducer
