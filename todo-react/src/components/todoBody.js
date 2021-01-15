import React, { Component } from 'react';

const TodoItems = (props) => {
  const li = props.todoData.map((item) => {
    return (
      <li className="todo-item" key={item.id}>
        <input
          type="checkbox"
          className="todo-checkbox"
          id={item.id}
          data-id={item.id}
          checked={!item.isActive}
          onChange={(e) => props.toggleCheckbox(e)} />
        <label htmlFor={item.id}></label>
        <label
          className={`todo-label ${item.isActive ? 'active' : 'completed'}`}
          data-id={item.id}
          onDoubleClick={(e) => props.editTask(e)}
          onKeyPress={(e) => props.checkKey(e)}
          onBlur={(e) => props.editTaskSubmit(e)}>{item.task}</label>
        <button
          className="remove"
          data-id={item.id}
          onClick={(e) => props.removeItem(e.target.dataset.id)}></button>
      </li>
    )
  });
  return <ul className="todo-list">{li}</ul>
}

export default class TodoBody extends Component {
  render() {
    const { todoData, removeItem, toggleCheckbox, editTask, checkKey, editTaskSubmit } = this.props
    return (
      <TodoItems
        todoData={todoData}
        removeItem={removeItem}
        toggleCheckbox={toggleCheckbox}
        editTask={editTask}
        checkKey={checkKey}
        editTaskSubmit={editTaskSubmit} />
    )
  }
}