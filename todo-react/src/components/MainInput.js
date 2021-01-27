import React, { useMemo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTodos } from '../actions'
import { getTodolist } from '../selectors/todos'
import { addItem, toggleAllItems } from '../service/todoService'

const MainInput = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)
  const inputRef = useRef()

  const handleSubmit = useCallback((e) => {
    const newTask = { task: inputRef.current.value }
    if (e.key === 'Enter' && newTask.task.trim().length) {
      (async () => {
        try {
          const data = await addItem(newTask);
          dispatch(setTodos(data.list))
        } catch (err) {
          console.log(err);
        }
      })()
      inputRef.current.value = '';
    }
  }, [dispatch])

  const isAllCompleted = useCallback(() => todoList.every((item) => !item.isActive), [todoList])

  const isChecked = useMemo(() => {
    return isAllCompleted()
  }, [isAllCompleted])

  const onSelect = useCallback((e) => {
    const isActive = { isActive: !e.target.checked };
    (async () => {
      try {
        const data = await toggleAllItems(isActive);
        dispatch(setTodos(data.list))
      } catch(err) {
        console.log(err);
      }
    })()
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