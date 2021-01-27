import React, { useMemo } from 'react'
import { todoStates } from '../constants/constants'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'
import { getTodolist, getTodoMode } from '../selectors/todos'

const TodoBody = () => {
  const todoList = useSelector(getTodolist)
  const mode = useSelector(getTodoMode)

  const activeTodos = todoList.filter((todoObj) => todoObj.isActive);
  const completedTodos = todoList.filter((todoObj) => !todoObj.isActive);

  const todosArr = useMemo(() => {
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
      {todosArr.map((item) =>
        <TodoListItem
          key={item.id}
          item={item} />
      )}
    </ul>
  )
}

export default TodoBody
