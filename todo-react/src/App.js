import { Component } from 'react';
import './App.css';
import MainInput from './components/mainInput';
import TodoBody from './components/todoBody';
import TodoFooter from './components/todoFooter';

class App extends Component {
  state = {
    todoList: [],
  }

  handleSubmit = (todoData) => {
    this.setState({ todoList: [...this.state.todoList, todoData] });
  }

  countAllItems = () => {
    return this.state.todoList.length > 0 ? 'flex' : 'none';
  }

  removeItem = (id) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter((item) => {
        return item.id !== parseInt(id);
      })
    });
  }

  removeCompletedItems = () => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter((item) => item.isActive)
    })
  }

  toggleCheckbox = (e) => {
    const id = e.target.dataset.id;
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map((item) => {
        if (item.id === parseInt(id)) {
          item.isActive = !item.isActive
        }
        return item;
      })
    })
  }

  toggleAllCheckboxes = (e) => {
    const { todoList } = this.state;
    const isChecked = e.target.checked;
    this.setState({
      todoList: todoList.map((item) => {
        isChecked ? item.isActive = false : item.isActive = true;
        return item;
      })
    })
  }

  getCompletedItems = () => {
    const { todoList } = this.state;
    return todoList.every((item) => item.isActive === false);
  }

  editTask = (e) => {
    const label = e.target;
    label.contentEditable = true;
    label.focus();
  }

  checkKey = (e) => {
    if (e.key === 'Enter') {
      this.editTaskSubmit(e);
    }
  }

  editTaskSubmit = (e) => {
    const label = e.target,
      newLabelContent = label.textContent.trim(),
      labelId = parseInt(e.target.dataset.id),
      { todoList } = this.state;

    this.setState({
      todoList: todoList.map((item) => {
        if (item.id === labelId) {
          item.task = newLabelContent;
        }
        return item;
      }).filter((item) => {
        return item.task !== '';
      })
    });
    label.contentEditable = false;
  }

  render() {
    const { todoList } = this.state;
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">todos</h1>
        </header>
        <main className="main">
          <section className="todo-container">
            <MainInput
              handleSubmit={this.handleSubmit}
              countAllItems={this.countAllItems}
              toggleAllCheckboxes={this.toggleAllCheckboxes}
              getCompletedItems={this.getCompletedItems} />
            <TodoBody
              todoData={todoList}
              removeItem={this.removeItem}
              toggleCheckbox={this.toggleCheckbox}
              editTask={this.editTask}
              editTaskSubmit={this.editTaskSubmit}
              checkKey={this.checkKey} />
            <TodoFooter
              todoData={todoList}
              countAllItems={this.countAllItems}
              removeCompletedItems={this.removeCompletedItems} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
