import { todoStates } from '../constants/constants'
import {
  SET_TODOS,
  TOGGLE_MODE
} from '../actions/actionTypes'

const initialState = {
  todoList: [],
  mode: todoStates.all
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todoList: [
          ...action.payload.todoList
        ]
      }
    case TOGGLE_MODE:
      return {
        ...state,
        mode: action.payload.mode
      }
    default:
      return initialState
  }
}

export default todoReducer