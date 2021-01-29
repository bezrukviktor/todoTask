import React, { useCallback, useMemo } from 'react'
import { todoStates } from '../constants/constants'
import { fetchToggleItem, fetchRemoveItem, fetchEditItem } from '../actions'
import { useDispatch } from 'react-redux'

const TodoListItem = ({ item }) => {
  const dispatch = useDispatch()

  const isActiveItem = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase();
  }, [item.isActive])

  const labelClassName = `todo-label ${isActiveItem}`

  const onToggleItem = useCallback(() => {
    const id = { id: item._id };
    dispatch(fetchToggleItem(id))
  }, [dispatch, item._id])

  const onRemoveItem = useCallback(() => {
    const id = { id: item._id };
    dispatch(fetchRemoveItem(id))
  }, [dispatch, item._id])

  const onEditTask = useCallback((e) => {
    const label = e.target;
    label.contentEditable = true;
    label.focus();
  }, [])

  const submitEditableTodo = useCallback((e) => {
    const label = e.target;
    const id = item._id;
    const task = e.target.textContent;
    const editableData = {
      id,
      task
    };
    dispatch(fetchEditItem(editableData))
    label.contentEditable = false;
  }, [dispatch, item._id])

  const onPressEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }, [])

  return (
    <li className="todo-item" key={item._id}>
      <input
        type="checkbox"
        className="todo-checkbox"
        id={item._id}
        checked={!item.isActive}
        onChange={onToggleItem}
      />
      <label htmlFor={item._id} />
      <label
        className={labelClassName}
        onDoubleClick={onEditTask}
        onKeyPress={onPressEnter}
        onBlur={submitEditableTodo}
      >{item.task}</label>
      <button
        className="remove"
        onClick={onRemoveItem}
      />
    </li>
  )
}

export default TodoListItem