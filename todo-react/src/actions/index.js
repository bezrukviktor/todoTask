import {
  SET_TODOS,
  TOGGLE_MODE
} from './actionTypes'


export const setTodos = (todoList) => {
  return {
    type: SET_TODOS,
    payload: {
      todoList
    }
  }
}

export const toggleMode = (mode) => {
  return {
    type: TOGGLE_MODE,
    payload: {
      mode
    }
  }
}