import React, { Component } from 'react';

const TodoItems = (props) => {
  const li = props.todoData.map((item) => {
    return (
      <li key={item.id}>{item.task}</li>
    )
  });
  return <ul className="todo-list">{li}</ul>
}

export default class TodoBody extends Component {
  render() {
    const {todoData} = this.props
    return (
      <TodoItems todoData={todoData} />
    )
  }
}