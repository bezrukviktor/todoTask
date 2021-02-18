import { useCallback, useMemo } from 'react'
import { todoStates } from '../../constants/constants'
import { toggleItemRequest, removeItemRequest, editItemRequest } from '../../redux/actions/todoActions'
import { useDispatch } from 'react-redux'
import { ITodoItem } from '../../interfaces/stateTypes'

interface Props {
  item: ITodoItem
  inputId: string
}

const TodoListItem = ({ item, inputId }: Props) => {
  const dispatch = useDispatch()

  const itemStatus: string = useMemo(() => {
    return item.isActive ? todoStates.active.toLowerCase() : todoStates.completed.toLowerCase()
  }, [item.isActive])

  const onToggleItem = useCallback(() => {
    const id = item._id
    dispatch(toggleItemRequest(id))
  }, [dispatch, item._id])

  const onRemoveItem = useCallback(() => {
    const id = item._id
    dispatch(removeItemRequest(id))
  }, [dispatch, item._id])

  const onEditTask = useCallback((e) => {
    const label = e.target
    label.contentEditable = true
    label.focus()
  }, [])

  const submitEditableTodo = useCallback((e) => {
    const label = e.target;
    const id = item._id;
    const task = e.target.textContent;
    dispatch(editItemRequest(id, task))
    label.contentEditable = false;
  }, [dispatch, item._id])

  const onPressEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur()
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
        className={`todo-label ${itemStatus}`}
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