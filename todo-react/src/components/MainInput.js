import React, { useMemo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleAllTodos } from '../actions'
import { getTodolist } from '../selectors/todos';

const MainInput = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)
  const inputRef = useRef();

  const handleSubmit = useCallback((e) => {
    const value = inputRef.current.value;
    const id = new Date().valueOf();
    if (e.key === 'Enter' && value.length) {
      dispatch(addTodo(value, id));
      inputRef.current.value = '';
    }
  }, [dispatch])

  const isAllCompleted = useCallback(() => todoList.every((item) => !item.isActive), [todoList])

  const isChecked = useMemo(() => {
    return isAllCompleted()
  }, [isAllCompleted])

  const onSelect = useCallback((e) => {
    dispatch(toggleAllTodos(!e.target.checked));
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