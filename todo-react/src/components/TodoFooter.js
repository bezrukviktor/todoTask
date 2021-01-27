import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todoStates } from '../constants/constants'
import { setTodos, toggleMode } from '../actions'
import { getTodolist, getTodoMode } from '../selectors/todos'
import { removeCompletedItems } from '../service/todoService'

const TodoFooter = () => {
  const dispatch = useDispatch()
  const mode = useSelector(getTodoMode)
  const todoList = useSelector(getTodolist)

  const itemsCount = useMemo(() => {
    const activeItemCount = todoList.filter((item) => item.isActive).length;
    const itemWord = activeItemCount === 1 ? 'item' : 'items';
    return `${activeItemCount} ${itemWord} left`;
  }, [todoList]);

  const changeMode = useCallback((e) => {
    const currentMode = e.target.textContent;
    dispatch(toggleMode(currentMode))
  }, [dispatch]);

  const filterItems = useMemo(() => {
    return Object.values(todoStates).map((status) => {
      return <li
        key={status}
        className={`todo-filter__mode 
          ${mode === status ? 'todo-filter__mode--active' : ''}`}
        onClick={changeMode}>
        {status}
      </li>
    })
  }, [changeMode, mode]);

  const onRemoveCompletedItems = useCallback(() => {
    (async () => {
      try {
        const data = await removeCompletedItems();
        dispatch(setTodos(data.list))
      } catch(err) {
        console.log(err);
      }
    })()
  }, [dispatch])

  const showClearBtn = useMemo(() => todoList.some((item) => !item.isActive), [todoList]);
  const classNames = `todo-clear-completed ${showClearBtn ? 'todo-clear-completed--show' : ''}`;

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
        onClick={onRemoveCompletedItems}>
        Clear completed</span>
    </div>
  )
}

export default TodoFooter
