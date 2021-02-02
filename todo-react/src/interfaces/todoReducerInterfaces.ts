export interface IInitialState {
  todoList: Array<ITodoItem>
  mode: string
  error: boolean
  loading: boolean
}

export interface ITodoItem {
 _id: string
 task: string
 isActive: boolean
}

export interface IRootState {
  todoState: IInitialState
}