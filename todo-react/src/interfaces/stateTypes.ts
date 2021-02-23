export interface IInitialState {
  todoList: Array<ITodoItem>
  mode: string
  error: boolean
  loading: boolean
}

export interface IAuthInitialState {
  accessToken: string
  refreshToken: string
  username: string
  errorMessage: string
}

export interface ITodoItem {
 _id: string
 task: string
 isActive: boolean
}

export interface IResponse {
  list: Array<ITodoItem>
}

export interface IRootState {
  todoState: IInitialState
  authState: IAuthInitialState
}

export interface IRefreshToken {
  refresh_token: string
}

export interface IAuth {
  username: string
  pass: string
}
