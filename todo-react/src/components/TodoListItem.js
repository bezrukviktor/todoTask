import React, { useCallback, useMemo } from 'react'
import { todoStates } from '../constants/constants'
import { setTodos } from '../actions'
import { useDispatch } from 'react-redux'
import { removeItem, toggleItem, editItem } from '../service/todoService'

const TodoListItem = ({ item }) => {
  const dispatch = useDispatch()

  const isActiveItem = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase();
  }, [item.isActive])

  const labelClassName = `todo-label ${isActiveItem}`

  const onToggleItem = useCallback(() => {
    const id = { id: item._id };
    (async () => {
      try {
        const data = await toggleItem(id);
        dispatch(setTodos(data.list));
      } catch (err) {
        console.log(err);
      }
    })()
  }, [dispatch, item._id])

  const onRemoveItem = useCallback(() => {
    const id = { id: item._id };
    (async () => {
      try {
        const data = await removeItem(id);
        dispatch(setTodos(data.list))
      } catch (err) {
        console.log(err);
      }
    })()
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
    (async () => {
      try {
        const data = await editItem(editableData);
        dispatch(setTodos(data.list))
      } catch(err) {
        console.log(err);
      }
    })()
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