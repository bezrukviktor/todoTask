import { Component } from 'react';
import './App.css';
import MainInput from './components/mainInput';
import TodoBody from './components/todoBody';

class App extends Component {
  state = {
    todoList: [],
  }

  handleSubmit = (todoData) => {
    this.setState({todoList: [...this.state.todoList, todoData]});
  }

  render () {
    const {todoList} = this.state;
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">todos</h1>
        </header>
        <main className="main">
          <section className="todo-container">
            <MainInput handleSubmit={this.handleSubmit} />
            <TodoBody todoData={todoList} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
