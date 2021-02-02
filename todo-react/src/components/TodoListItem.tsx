import { useCallback, useMemo } from 'react'
import { todoStates } from '../constants/constants'
import { toggleItemRequest, removeItemRequest, editItemRequest } from '../actions/index'
import { useDispatch } from 'react-redux'
import { ITodoItem } from '../interfaces/todoReducerInterfaces'

const TodoListItem = ({ item, inputId }: { item: ITodoItem; inputId: string }) => {
  const dispatch = useDispatch()

  const isActiveItem = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase();
  }, [item.isActive])

  const labelClassName = `todo-label ${isActiveItem}`

  const onToggleItem = useCallback(():void => {
    const id = { id: item._id }
    dispatch(toggleItemRequest(id))
  }, [dispatch, item._id])

  const onRemoveItem = useCallback(():void => {
    const id = { id: item._id }
    dispatch(removeItemRequest(id))
  }, [dispatch, item._id])

  const onEditTask = useCallback((e):void => {
    const label = e.target
    label.contentEditable = true
    label.focus()
  }, [])

  const submitEditableTodo = useCallback((e) => {
    const label = e.target;
    const id = item._id;
    const task = e.target.textContent;
    const editableData = {
      id,
      task
    };
    dispatch(editItemRequest(editableData))
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
        id={inputId}
        checked={!item.isActive}
        onChange={onToggleItem}
      />
      <label htmlFor={inputId} />
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