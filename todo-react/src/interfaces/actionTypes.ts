export interface IAction {
  type: string
  payload?: any
}

export interface IActionTypes {
  REQUEST: string
  SUCCESS: string
  FAILED: string
}