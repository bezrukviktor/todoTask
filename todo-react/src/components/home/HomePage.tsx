import { useDispatch, useSelector } from "react-redux"
import { getTodoError, getTodolist, getTodoLoader } from "../../selectors/todos"
import Spinner from '../Spinner'
import ErrorPage from '../ErrorPage'
import MainInput from './MainInput'
import TodoBody from './TodoBody'
import TodoFooter from './TodoFooter'
import { useEffect } from "react"
import { getListRequest } from "../../redux/actions/todoActions"

const HomePage = () => {
  const todoList = useSelector(getTodolist)
  const isLoading = useSelector(getTodoLoader)
  const isError = useSelector(getTodoError)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListRequest())
  }, [dispatch])
  
  return (
    <>
      {isLoading ? <Spinner /> : null}
      {isError ? <ErrorPage /> : null}
      <section className="todo-container">
        <MainInput />
        <TodoBody />
        {todoList.length ? <TodoFooter /> : null}
      </section>
    </>
  )
}

export default HomePage