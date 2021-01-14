import React, { Component } from 'react';

export default class MainInput extends Component {

  initialState = {
    task: '',
    isActive: true,
    id: ''
  }

  state = this.initialState;

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        id: this.generateId()
      })

      setTimeout(() => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
      }, 0);
    }
  }

  generateId = () => new Date().valueOf();

  render() {
    const { task } = this.state;
    return (
      <div className="todo-body">
        <input
          type="text"
          name="task"
          placeholder="What needs to be done?"
          className="todo-body__input"
          value={task}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit} />
        <input
          type="checkbox"
          id="checkAll"
          className="checkAll" />
        <label className="checkAllLabel" htmlFor="checkAll"></label>
      </div>
    )
  }
}