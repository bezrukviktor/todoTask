interface ITodoStates {
  all: string
  active: string
  completed: string
}

export const todoStates: ITodoStates = {
  all: 'All',
  active: 'Active',
  completed: 'Completed'
}

export const errors = {
  wrongPass: 'wrong password',
  userNotExist: "user does't exist"
}