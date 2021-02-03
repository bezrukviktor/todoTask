import React, { useMemo } from 'react'
import { todoStates } from '../constants/constants'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'
import { getTodolist, getTodoMode } from '../selectors/todos'
import { ITodoItem } from '../interfaces/stateTypes'

const TodoBody = () => {
  const todoList = useSelector(getTodolist)
  const mode = useSelector(getTodoMode)

  const activeTodos = todoList.filter((todoObj) => todoObj.isActive)
  const completedTodos = todoList.filter((todoObj) => !todoObj.isActive)

  const todosArr: Array<ITodoItem> = useMemo(() => {
    switch (mode) {
      case todoStates.active:
        return activeTodos
      case todoStates.completed:
        return completedTodos
      default:
        return todoList
    }
  }, [activeTodos, completedTodos, todoList, mode])

  return (
    <ul className="todo-list">
      {todosArr.map((item, idx) =>
        <TodoListItem
          key={item._id}
          inputId={`input-${idx}`}
          item={item} />
      )}
    </ul>
  )
}

export default TodoBody
