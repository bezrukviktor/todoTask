import { todoStates } from '../../constants/constants'
import {
  TOGGLE_MODE,
  GET_LIST,
  ADD_ITEM,
  SELECT_ALL,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REMOVE_ITEMS
} from '../actions/actionTypes'
import { IInitialState } from '../../interfaces/stateTypes'
import { IAction } from '../../interfaces/actionTypes'

const initialState: IInitialState = {
  todoList: [],
  mode: todoStates.all,
  error: false,
  loading: false
}

const todoReducer = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case REMOVE_ITEM.REQUEST:
    case ADD_ITEM.REQUEST:
    case GET_LIST.REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_ITEMS.SUCCESS:
    case EDIT_ITEM.SUCCESS:
    case REMOVE_ITEM.SUCCESS:
    case TOGGLE_ITEM.SUCCESS:
    case SELECT_ALL.SUCCESS:
    case ADD_ITEM.SUCCESS:
    case GET_LIST.SUCCESS:
      return {
        ...state,
        todoList: [
          ...action.payload!.list
        ],
        loading: false,
        error: false
      }
    case REMOVE_ITEMS.FAILED:
    case EDIT_ITEM.FAILED:
    case REMOVE_ITEM.FAILED:
    case TOGGLE_ITEM.FAILED:
    case SELECT_ALL.FAILED:
    case ADD_ITEM.FAILED:
    case GET_LIST.FAILED:
      return {
        ...state,
        error: true,
        loading: false
      }
    case TOGGLE_MODE:
      return {
        ...state,
        mode: action.payload?.mode
      }
    default:
      return state
  }
}

export default todoReducer