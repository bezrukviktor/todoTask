import { IRootState, ITodoItem } from '../interfaces/stateTypes'

export const getTodolist = (state: IRootState):Array<ITodoItem> => state.todoState.todoList
export const getTodoMode = (state: IRootState):string => state.todoState.mode
export const getTodoError = (state: IRootState):boolean => state.todoState.error
export const getTodoLoader = (state: IRootState):boolean => state.todoState.loading
export const getRegStatus = (state: any):boolean => state.authState.isSignUp
export const getUserExist = (state: any):boolean => state.authState.isUserExist
export const getLoginError = (state: any):boolean => state.authState.loginErr