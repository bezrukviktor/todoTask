import {
  GET_LIST,
  ADD_ITEM,
  SELECT_ALL,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REMOVE_ITEMS,
  TOGGLE_MODE
} from './actionTypes'
import {IAction, ITask, IIsActive, IId, IData} from '../interfaces/actionInterfaces'
import { ITodoItem } from '../interfaces/todoReducerInterfaces'

//==========Get List===========

export const getListRequest = ():IAction => {
  return {
    type: GET_LIST.REQUEST,
  }
}
export const getListSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: GET_LIST.SUCCESS,
    payload: {
      list
    }
  }
}
export const getListFailed = ():IAction => {
  return {
    type: GET_LIST.FAILED,
  }
}

//==========Add Item===========

export const addItemRequest = (task:ITask):IAction => {
  return { 
    type: ADD_ITEM.REQUEST,
    payload:{
      task
    }
  }
}
export const addItemSuccess = (list:Array<ITodoItem>):IAction => {
  return { 
    type: ADD_ITEM.SUCCESS,
    payload:{
      list
    }
  }
}
export const addItemFailed = ():IAction => {
  return {
    type: ADD_ITEM.FAILED,
  }
}

// ==========Select All===========

export const selectAllRequest = (isActive:IIsActive):IAction => {
  return {
    type: SELECT_ALL.REQUEST,
    payload: {
      isActive
    }
  }
}
export const selectAllSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: SELECT_ALL.SUCCESS,
    payload: {
      list
    }
  }
}
export const selectAllFailed = ():IAction => {
  return {
    type: SELECT_ALL.FAILED,
  }
}

//==========Toggle Item===========

export const toggleItemRequest = (id:IId):IAction => {
  return {
    type: TOGGLE_ITEM.REQUEST,
    payload: {
      id
    }
  }
}
export const toggleItemSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: TOGGLE_ITEM.SUCCESS,
    payload: {
      list
    }
  }
}
export const toggleItemFailed = ():IAction => {
  return {
    type: TOGGLE_ITEM.FAILED,
  }
}

//===========Remove Item=============

export const removeItemRequest = (id:IId):IAction => {
  return {
    type: REMOVE_ITEM.REQUEST,
    payload: {
      id
    }
  }
}
export const removeItemSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: REMOVE_ITEM.SUCCESS,
    payload: {
      list
    }
  }
}
export const removeItemFailed = ():IAction => {
  return {
    type: REMOVE_ITEM.FAILED
  }
}

//=========Edit Item==========

export const editItemRequest = (data:IData):IAction => {
  return {
    type: EDIT_ITEM.REQUEST,
    payload: {
      ...data
    }
  }
}
export const editItemSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: EDIT_ITEM.SUCCESS,
    payload: {
      list
    }
  }
}
export const editItemFailed = ():IAction => {
  return {
    type: EDIT_ITEM.FAILED
  }
}

//=========Remove Items==========

export const removeItemsRequest = ():IAction => {
  return {
    type: REMOVE_ITEMS.REQUEST
  }
}
export const removeItemsSuccess = (list:Array<ITodoItem>):IAction => {
  return {
    type: REMOVE_ITEMS.SUCCESS,
    payload: {
      list
    }
  }
}
export const removeItemsFailed = ():IAction => {
  return {
    type: REMOVE_ITEMS.FAILED
  }
}

export const toggleMode = (mode: string | null):IAction => {
  return {
    type: TOGGLE_MODE,
    payload: {
      mode
    }
  }
}