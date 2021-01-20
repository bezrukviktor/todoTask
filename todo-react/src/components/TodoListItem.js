import React, { useCallback, useMemo } from 'react'
import todoStates from '../constants/constants'

const TodoListItem = ({ item, removeItem, toggleCheckbox, editTask, checkKey, editTaskSubmit }) => {

  const onToggleCheckbox = useCallback(() => toggleCheckbox(item.id), [toggleCheckbox, item.id])
  const onEditTask = useCallback((e) => editTask(e.target), [editTask])
  const onSubmitEditTask = useCallback((e) => editTaskSubmit(e, item.id), [editTaskSubmit, item.id])
  const onPressEnter = useCallback((e) => checkKey(e, item.id), [checkKey, item.id])
  const onRemoveItem = useCallback(() => removeItem(item.id), [removeItem, item.id])
  const isActiveItem = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase();
  }, [item.isActive])
  const labelClassName = `todo-label ${isActiveItem}`

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        id={item.id}
        checked={!item.isActive}
        onChange={onToggleCheckbox} />
      <label htmlFor={item.id} />
      <label
        className={labelClassName}
        onDoubleClick={onEditTask}
        onKeyPress={onPressEnter}
        onBlur={onSubmitEditTask}>{item.task}</label>
      <button
        className="remove"
        onClick={onRemoveItem} />
    </li>
  )
}

export default TodoListItem