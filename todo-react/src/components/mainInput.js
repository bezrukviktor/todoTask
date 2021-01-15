import React, { Component } from 'react';

export default class MainInput extends Component {

  initialState = {
    task: '',
    isActive: true,
    id: ''
  }

  state = this.initialState;

  handleChange = (e) => {
    const value = e.target.value,
    name = e.target.name;

    if (value.length > 0 && value.trim().length > 0) {
      this.setState({
        [name]: value
      })
    }
  }

  handleSubmit = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value.length > 0) {
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
          autoComplete="off"
          className="todo-body__input"
          value={task}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit} />
        <input
          type="checkbox"
          id="checkAll"
          checked={this.props.getCompletedItems()}
          className="checkAll"
          onChange={(e) => this.props.toggleAllCheckboxes(e)} />
        <label 
          className="checkAllLabel" 
          htmlFor="checkAll" 
          style={{display: this.props.countAllItems()}}
        ></label>
      </div>
    )
  }
}