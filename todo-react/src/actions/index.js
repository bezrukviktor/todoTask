import {
  GET_LIST,
  ADD_ITEM,
  SELECT_ALL,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REMOVE_ITEMS,
  SET_TODOS,
  TOGGLE_MODE
} from './actionTypes'

export const getListRequest = () => {
  return {
    type: GET_LIST.REQUEST,
  }
}

export const fetchAddItem = (task) => {
  return {
    type: ADD_ITEM,
    payload: {
      task
    }
  }
}

export const fetchIsActive = (isActive) => {
  return {
    type: SELECT_ALL,
    payload: {
      isActive
    }
  }
}

export const fetchToggleItem = (id) => {
  return {
    type: TOGGLE_ITEM,
    payload: {
      id
    }
  }
}

export const fetchRemoveItem = (id) => {
  return {
    type: REMOVE_ITEM,
    payload: {
      id
    }
  }
}

export const fetchEditItem = (data) => {
  return {
    type: EDIT_ITEM,
    payload: {
      ...data
    }
  }
}

export const fetchRemoveItems = () => {
  return {
    type: REMOVE_ITEMS
  }
}

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