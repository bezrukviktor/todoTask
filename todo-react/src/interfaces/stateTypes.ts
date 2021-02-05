export interface IInitialState {
  todoList: Array<ITodoItem>
  mode: string
  error: boolean
  loading: boolean
}

export interface IAuthInitjialState {
  isSighUp: boolean
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
  authState: IAuthInitjialState
}