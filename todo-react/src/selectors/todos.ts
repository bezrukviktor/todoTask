import { IRootState, ITodoItem } from '../interfaces/todoReducerInterfaces'

export const getTodolist = (state: IRootState):Array<ITodoItem> => state.todoState.todoList
export const getTodoMode = (state: IRootState):string => state.todoState.mode
export const getTodoError = (state: IRootState):boolean => state.todoState.error
export const getTodoLoader = (state: IRootState):boolean => state.todoState.loading