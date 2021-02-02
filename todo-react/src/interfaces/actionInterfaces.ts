import { ITodoItem } from './todoReducerInterfaces'

export interface IAction {
  type: string
  payload?: any
}

export interface ITask {
  task: string
}

export interface IIsActive {
  isActive: boolean
}

export interface IId {
  id: string
}

export interface IData {
  id: string
  task: string
}

export interface IActionTypes {
  REQUEST: string
  SUCCESS: string
  FAILED: string
}