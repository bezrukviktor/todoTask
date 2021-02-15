export interface ITodoItem {
  _id: string
  task: string
  isActive: boolean
}

export interface INewItem {
  task: string,
  userId: string
  isActive: boolean
}

export interface IAccessToken {
  name: string
  exp: number
  _id: string
  username: string
}

export interface IUserData {
  username: string,
  pass: string
}