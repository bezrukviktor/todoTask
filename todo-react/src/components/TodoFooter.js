import React, {useCallback, useMemo} from 'react'
import todoStates from '../constants/constants'

const TodoFooter = ({ removeCompletedItems, todoData, currentMode, handleSubmitMode}) => {

  const todoCounter = useCallback(() => {
    const activeItemCount = todoData.filter((item) => item.isActive).length;
    const itemWord = activeItemCount === 1 ? 'item' : 'items';
    return `${activeItemCount} ${itemWord} left`;
  }, [todoData]);

  const changeMode = useCallback((e) => handleSubmitMode(e.target.textContent), [handleSubmitMode]);
  const showClearBtn = useCallback(() => todoData.some((item) => !item.isActive), [todoData]);

  const createTodoModeItems = useCallback(() => {
    return Object.values(todoStates).map((mode) => {
      return <li
          key={mode}
          className={`todo-filter__mode 
          ${currentMode === mode ? 'todo-filter__mode--active' : ''}`}
          onClick={(e) => changeMode(e)}>{mode}
        </li>
    })
  }, [currentMode, changeMode]);

  const itemsCount = useMemo(() => todoCounter(), [todoCounter]);
  const filterItems = useMemo(() => createTodoModeItems(), [createTodoModeItems]);
  const clearCompleted = useMemo(() => showClearBtn(), [showClearBtn]);
  const classNames = `todo-clear-completed ${clearCompleted ? 'todo-clear-completed--show' : ''}`;
  
  return (
    <div className="todo-footer">
      <span className="todo-footer__counter">{itemsCount}</span>
      <div className="todo-filter">
        <ul className="todo-filter-list">
          {filterItems}
        </ul>
      </div>
      <span
        className={classNames}
        onClick={removeCompletedItems}>Clear completed
      </span>
    </div>
  )
}

export default TodoFooter
