import React, { useMemo, useCallback, useRef } from 'react'

const MainInput = ({ toggleAllCheckboxes, handleListSubmit, todoData }) => {

  const inputRef = useRef();

  const handleSubmit = useCallback((e) => {
    const value = inputRef.current.value;
    const newTask = {
      task: value,
      isActive: true,
      id: new Date().valueOf()
    }
    if (e.key === 'Enter' && value.length) {
      handleListSubmit(newTask);
      inputRef.current.value = '';
    }
  }, [handleListSubmit])

  const isAllCompleted = useCallback(() => todoData.every((item) => !item.isActive), [todoData])

  const isChecked = useMemo(() => {
    return isAllCompleted()
  }, [isAllCompleted])

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
        onChange={toggleAllCheckboxes} />
      {!!todoData.length ?
        <label
          className="checkAllLabel"
          htmlFor="checkAll"
        ></label> : null
      }
    </div>
  )
}

export default MainInput;