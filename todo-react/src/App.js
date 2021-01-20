import { useCallback, useState } from 'react'
import './App.css'
import MainInput from './components/MainInput'
import TodoBody from './components/TodoBody'
import TodoFooter from './components/TodoFooter'
import todoStates from './constants/constants'

const App = () => {
  const [todoList, setTodoList] = useState([])
  const [mode, setMode] = useState(todoStates.all);

  const handleListSubmit = useCallback((newTask) => {
    setTodoList([...todoList, newTask]);
  }, [todoList]);

  const handleSubmitMode = useCallback((mode) => {
    setMode(mode);
  }, []);

  const toggleAllCheckboxes = useCallback((e) => {
    setTodoList(todoList => todoList.map(item => {
      return {
        ...item,
        isActive: !e.target.checked
      }
    }))
  }, []);

  const toggleCheckbox = useCallback((id) => {
    setTodoList(todoList => todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isActive: !item.isActive,
        }
      }
      return item;
    }))
  }, []);

  const removeItem = useCallback((id) => {
    setTodoList(todoList => todoList.filter((item) => item.id !== id));
  }, []) 

  const editTask = useCallback((label) => {
    label.contentEditable = true;
    label.focus();
  }, []);

  const editTaskSubmit = useCallback((e, labelId) => {
    const label = e.target;
    const newLabelContent = label.textContent.trim();

    setTodoList(todoList => todoList.map((item) => {
      if (item.id === labelId) {
        return {
          ...item,
          task: newLabelContent
        }
      }
      return item;
    }).filter((item) => item.task !== ''));
    label.contentEditable = false;
  }, []);

  const checkKey = useCallback((e, labelId) => {
    if (e.key === 'Enter') {
      editTaskSubmit(e, labelId);
    }
  }, [editTaskSubmit]);

  const removeCompletedItems = useCallback(() => {
    setTodoList(todoList => todoList.filter((item) => item.isActive));
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">todos</h1>
      </header>
      <main className="main">
        <section className="todo-container">
          <MainInput
            todoData={todoList}
            handleListSubmit={handleListSubmit}
            toggleAllCheckboxes={toggleAllCheckboxes}
          />
          <TodoBody
            todoData={todoList}
            mode={mode}
            removeItem={removeItem}
            toggleCheckbox={toggleCheckbox}
            editTask={editTask}
            editTaskSubmit={editTaskSubmit}
            checkKey={checkKey} />
          {!!todoList.length ?
            <TodoFooter
              todoData={todoList}
              currentMode={mode}
              handleSubmitMode={handleSubmitMode}
              removeCompletedItems={removeCompletedItems} /> : null
          }
        </section>
      </main>
    </div>
  );
}

export default App;
