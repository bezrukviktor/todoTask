import React, { useCallback, useMemo } from 'react'
import { todoStates } from '../constants/constants'
import { toggleTodo, removeTodo, editTodo } from '../actions'
import { useDispatch } from 'react-redux';

const TodoListItem = ({ item }) => {
  const dispatch = useDispatch()

  const isActiveItem = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase();
  }, [item.isActive])
  
  const labelClassName = `todo-label ${isActiveItem}`
  const onToggleCheckbox = useCallback(() => dispatch(toggleTodo(item.id)), [dispatch, item.id])
  const onRemoveItem = useCallback(() => dispatch(removeTodo(item.id)), [dispatch, item.id])
  const onEditTask = useCallback((e) => {
    const label = e.target;
    label.contentEditable = true;
    label.focus();
  }, [])
  const submitEditableTodo = useCallback((e) => {
    const label = e.target;
    dispatch(editTodo(item.id, e.target.textContent))
    label.contentEditable = false;
  }, [dispatch, item.id])
  const onPressEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      submitEditableTodo(e);
    }
  }, [submitEditableTodo])
  
  return (
    <li className="todo-item" key={item.id}>
      <input
        type="checkbox"
        className="todo-checkbox"
        id={item.id}
        checked={!item.isActive}
        onChange={onToggleCheckbox}
      />
      <label htmlFor={item.id} />
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