import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todoStates } from '../constants/constants'
import { toggleMode, removeItemsRequest } from '../actions/index'
import { getTodolist, getTodoMode } from '../selectors/todos'

const TodoFooter = () => {
  const dispatch = useDispatch()
  const mode = useSelector(getTodoMode)
  const todoList = useSelector(getTodolist)

  const itemsCount: string = useMemo(() => {
    const activeItemCount = todoList.filter((item) => item.isActive).length;
    const itemWord = activeItemCount === 1 ? 'item' : 'items';
    return `${activeItemCount} ${itemWord} left`;
  }, [todoList]);

  const changeMode = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const currentMode: string | null = (e.target as HTMLElement).textContent;
    dispatch(toggleMode(currentMode))
  }, [dispatch]);

  const filterItems = useMemo(() => {
    return Object.values(todoStates).map((status: string) => {
      return <li
        key={status}
        className={`todo-filter__mode 
          ${mode === status ? 'todo-filter__mode--active' : ''}`}
        onClick={changeMode}>
        {status}
      </li>
    })
  }, [changeMode, mode]);

  const onRemoveCompletedItems = useCallback((): void => {
    dispatch(removeItemsRequest())
  }, [dispatch])

  const showClearBtn: boolean = useMemo(() => todoList.some((item) => !item.isActive), [todoList]);
  const classNames: string = `todo-clear-completed ${showClearBtn ? 'todo-clear-completed--show' : ''}`;

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
