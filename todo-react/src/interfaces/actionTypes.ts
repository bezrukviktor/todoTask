export interface IAction {
  type: string
  payload?: any
}

export interface IActionTypes {
  REQUEST: string
  SUCCESS: string
  FAILED: string
}

export interface ITokens {
  access_token: string
  refresh_token: string
}