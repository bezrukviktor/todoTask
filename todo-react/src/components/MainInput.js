import React, { useMemo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAddItem, fetchIsActive } from '../actions'
import { getTodolist } from '../selectors/todos'

const MainInput = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)
  const inputRef = useRef()

  const handleSubmit = useCallback((e) => {
    const newTask = { task: inputRef.current.value }
    if (e.key === 'Enter' && newTask.task.trim().length) {
      dispatch(fetchAddItem(newTask))
      // dispatch(addItemRequest(newTask))
      inputRef.current.value = '';
    }
  }, [dispatch])

  const isChecked = useMemo(() => todoList.every((item) => !item.isActive), [todoList])

  const onSelect = useCallback((e) => {
    const isActive = { isActive: !e.target.checked };
    dispatch(fetchIsActive(isActive))
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
        checked={isChecked}
        onChange={onSelect}
      />
      {!!todoList.length ?
        <label
          className="checkAllLabel"
          htmlFor="checkAll"
        /> : null
      }
    </div>
  )
}

export default MainInput;