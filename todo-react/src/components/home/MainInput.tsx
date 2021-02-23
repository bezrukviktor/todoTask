import React, { useMemo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItemRequest, selectAllRequest } from '../../redux/actions/todoActions'
import { getTodolist } from '../../selectors/todos'

const MainInput = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback((e: React.KeyboardEvent) => {
    const newTask: string = inputRef.current!.value
    if (e.key === 'Enter' && newTask.trim().length) {
      dispatch(addItemRequest(newTask))
      inputRef.current!.value = '';
    }
  }, [dispatch])

  const isAllChecked: boolean = useMemo(() => todoList.every((item) => !item.isActive), [todoList])

  const onSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive: boolean = !e.target.checked
    dispatch(selectAllRequest(isActive))
  }, [dispatch])

  return (
    <div className="todo-body">
      <input
        type="text"
        ref={inputRef}
        placeholder="What needs to be done?"
        autoComplete="off"
        className="todo-body__input"
        onKeyPress={handleSubmit} />
      <input
        type="checkbox"
        id="checkAll"
        className="checkAll"
        checked={isAllChecked}
        onChange={onSelect}
      />
      {todoList.length ?
        <label
          className="checkAllLabel"
          htmlFor="checkAll"
        /> : null
      }
    </div>
  )
}

export default MainInput;