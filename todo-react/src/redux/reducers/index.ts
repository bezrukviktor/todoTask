import { combineReducers } from 'redux'
import { IRootState } from '../../interfaces/stateTypes'
import todoReducer from './todoReducer'

const rootReducer = combineReducers<IRootState>({
  todoState: todoReducer
})

export default rootReducer
