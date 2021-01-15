import React, { Component } from 'react';

export default class TodoFooter extends Component {

  todoCounter = (todoData) => {
    const activeItemCount = todoData.filter((item) => item.isActive).length;
    const itemWord = activeItemCount === 1 ? 'item' : 'items';
    return `${activeItemCount} ${itemWord} left`;
  }

  showClearBtn = (todoData) => {
    const isCompletedTask = todoData.some((item) => !item.isActive)
    return isCompletedTask ? 'visible' : 'hidden';
  }

  render() {
    const { todoData, removeCompletedItems} = this.props;

    return (
      <div className="todo-footer" style={{ display: this.props.countAllItems() }}>
        <span className="todo-footer__counter">{this.todoCounter(todoData)}</span>
        <div className="todo-filter">
          <ul className="todo-filter-list">
            <li><a href="#" className="todo-filter__link todo-filter__link--active todo-filter__all">All</a></li>
            <li><a href="#active" className="todo-filter__link todo-filter__active">Active</a></li>
            <li><a href="#completed" className="todo-filter__link todo-filter__completed">Completed</a></li>
          </ul>
        </div>
        <span
          className="todo-clear-completed"
          style={{ visibility: this.showClearBtn(todoData) }}
          onClick={() => removeCompletedItems()}>Clear completed</span>
      </div>
    )
  }
}