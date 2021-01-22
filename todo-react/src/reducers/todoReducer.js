import { todoStates } from '../constants/constants'
import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  REMOVE_COMPLETED_TODOS,
  TOGGLE_MODE
} from '../actions/actionTypes'

const initialState = {
  todoList: [],
  mode: todoStates.all
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            task: action.payload.task,
            isActive: true,
            id: action.payload.id
          }
        ]
      }
    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.payload.id)
      }
    case EDIT_TODO:
      return {
        ...state,
        todoList: state.todoList.map(item => item.id === action.payload.id ? { ...item, task: action.payload.task } : item)
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(item => {
          return item.id === action.payload.id ? { ...item, isActive: !item.isActive } : item;
        })
      }
    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todoList: state.todoList.map(item => {
          return {
            ...item,
            isActive: action.payload.areAllChecked
          }
        })
      }
    case REMOVE_COMPLETED_TODOS:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.isActive)
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