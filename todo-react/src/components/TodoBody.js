import React, { useMemo } from 'react'
import todoStates from '../constants/constants'
import TodoListItem from './TodoListItem'

const TodoBody = ({ todoData, removeItem, toggleCheckbox, editTask, checkKey, editTaskSubmit, mode }) => {

  const activeTodos = todoData.filter((todoObj) => todoObj.isActive);
  const completedTodos = todoData.filter((todoObj) => !todoObj.isActive);

  const todosArr = useMemo(() => () => {
    return mode === todoStates.all ? todoData : mode === todoStates.active ? activeTodos : completedTodos;
  }, [activeTodos, completedTodos, todoData, mode])

  return (
    <ul className="todo-list">
      {todosArr().map((item) =>
        <TodoListItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          toggleCheckbox={toggleCheckbox}
          editTask={editTask}
          checkKey={checkKey}
          editTaskSubmit={editTaskSubmit}
        />
      )}
    </ul>
  )
}

export default TodoBody
