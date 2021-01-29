import './App.css'
import MainInput from './components/MainInput'
import TodoBody from './components/TodoBody'
import TodoFooter from './components/TodoFooter'
import { getTodolist } from './selectors/todos'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getListRequest } from './actions'

const App = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodolist)

  useEffect(() => {
    dispatch(getListRequest())
  }, [dispatch])

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">todos</h1>
      </header>
      <main className="main">
        <section className="todo-container">
          <MainInput />
          <TodoBody />
          {!!todoList.length ?
            <TodoFooter /> : null
          }
        </section>
      </main>
    </div>
  );
}

export default App;
