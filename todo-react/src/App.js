import './App.css'
import MainInput from './components/MainInput'
import TodoBody from './components/TodoBody'
import TodoFooter from './components/TodoFooter'
import ErrorPage from './components/ErrorPage'
import Spinner from './components/Spinner'
import { getTodolist, getTodoError, getTodoLoader } from './selectors/todos'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getListRequest } from './actions/index'

const App = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)
  const isError = useSelector(getTodoError)
  const isLoading = useSelector(getTodoLoader)

  useEffect(() => {
    dispatch(getListRequest())
  }, [dispatch])

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">todos</h1>
      </header>
      <main className="main">
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorPage /> : null}
        <section className="todo-container">
          <MainInput />
          <TodoBody />
          {todoList.length ? <TodoFooter /> : null}
        </section>
      </main>
    </div>
  );
}

export default App;
