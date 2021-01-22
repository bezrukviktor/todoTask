import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  REMOVE_COMPLETED_TODOS,
  TOGGLE_MODE
} from './actionTypes'

export const addTodo = (task, id) => {
  return {
    type: ADD_TODO,
    payload: {
      task,
      id
    }
  }
}
export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: {
      id
    }
  }
}
export const editTodo = (id, task) => {
  return {
    type: EDIT_TODO,
    payload: {
      task,
      id
    }
  }
}
export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  }
}
export const toggleAllTodos = (areAllChecked) => {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: {
      areAllChecked
    }
  }
}
export const removeCompletedTodos = () => {
  return {
    type: REMOVE_COMPLETED_TODOS,
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