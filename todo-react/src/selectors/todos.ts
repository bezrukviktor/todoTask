import { IRootState, ITodoItem } from '../interfaces/stateTypes'

export const getTodolist = (state: IRootState):Array<ITodoItem> => state.todoState.todoList
export const getTodoMode = (state: IRootState):string => state.todoState.mode
export const getTodoError = (state: IRootState):boolean => state.todoState.error
export const getTodoLoader = (state: IRootState):boolean => state.todoState.loading
export const getUsername = (state: IRootState):string => state.authState.username
export const getErrorMessage = (state: IRootState):string => state.authState.errorMessage
export const getAccessToken = (state: IRootState):string => state.authState.accessToken
export const getRefreshToken = (state: IRootState):string => state.authState.refreshToken