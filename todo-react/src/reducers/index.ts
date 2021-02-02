import { CombinedState, combineReducers, Reducer } from 'redux'
import { IAction } from '../interfaces/actionInterfaces'
import { IInitialState } from '../interfaces/todoReducerInterfaces'
import todoReducer from './todoReducer'


const rootReducer: Reducer<CombinedState<{
  todoState: IInitialState;
}>, IAction> = combineReducers({
  todoState: todoReducer
})

export default rootReducer
