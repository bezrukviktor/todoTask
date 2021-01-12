'use strict'

const activeTask = 'active',
  completedTask = 'completed';

class Todos {
  constructor(domNode, list) {
    this.input = document.querySelector('.todo-header__input');
    this.counter = document.querySelector('.counter');
    this.footer = document.querySelector('.footer');
    this.checkAll = document.querySelector('.checkAll');
    this.filterList = document.querySelector('.filter-list');
    this.filterLinks = Array.from(this.filterList.querySelectorAll('a'));
    this.ul = domNode;
    this.hash = null;
    this.selectAll = false;
    this.todo = [...list];
    this.id = 0;

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        this.addTodo(e.target.value);
        this.input.value = '';
        this.defineMode();
      }
    });

    this.checkAll.addEventListener('change', () => this.toggleAllCheckbox());

    this.filterLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        this.filterLinks.forEach((link) => link.classList.remove('filter-link--active'));
        link.classList.add('filter-link--active');
        this.hash = e.target.hash.slice(1);
        this.defineMode();
      });
    });
  }

  addTodo(task) {
    this.todoObj = {
      task: task,
      active: true,
      id: this.generateId()
    }
    this.todo.push(this.todoObj);
  }

  toggleAllCheckbox() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.todo.forEach((item) => {
        item.active = false;
      });
    } else {
      this.todo.forEach((item) => {
        item.active = true;
      });
    }
    this.defineMode();
  }

  defineMode() {
    switch (this.hash) {
      case activeTask:
        const activeTodos = this.todo.filter((item) => item.active);
        this.render(activeTodos);
        break;
      case completedTask:
        const completedTodos = this.todo.filter((item) => !item.active);
        this.render(completedTodos);
        break;
      default:
        this.render(this.todo);
        break;
    }
  }

  generateId() {
    return new Date().valueOf();
  }

  renderBody(todoArr) {
    this.ul.innerHTML = '';
    todoArr.forEach((todoObj) => {
      const taskName = todoObj.task,
        taskId = todoObj.id,
        isActiveTask = todoObj.active,
        li = document.createElement('li'),
        taskCheckbox = document.createElement('input'),
        taskLabel = document.createElement('label'),
        closeIcon = document.createElement('i');

      li.classList.add('todo-item');
      li.setAttribute('data-id', taskId);

      taskCheckbox.classList.add('todo-checkbox');
      taskCheckbox.setAttribute('type', 'checkbox');
      taskCheckbox.setAttribute('data-id', taskId);
      taskCheckbox.checked = !isActiveTask;

      const taskState = isActiveTask ? activeTask : completedTask;
      taskLabel.classList.add(taskState);
      taskLabel.setAttribute('data-id', taskId);
      taskLabel.textContent = taskName;

      closeIcon.classList.add('fa', 'fa-times');
      closeIcon.setAttribute('aria-hidden', 'true');
      closeIcon.setAttribute('data-id', taskId);

      li.append(taskCheckbox, taskLabel, closeIcon);
      this.ul.append(li);

      closeIcon.addEventListener('click', (e) => this.removeTask(e.target.dataset.id));
      taskCheckbox.addEventListener('click', (e) => this.toggleCheckbox(e.target.dataset.id));
      taskLabel.addEventListener('dblclick', (e) => this.makeLabelEditable(e));
      taskLabel.addEventListener('blur', (e) => this.makeLabelUneditable(taskLabel));
      taskLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.makeLabelUneditable(taskLabel);
        }
      });
    });
  }

  removeTask(id) {
    this.todo = this.todo.filter((todoObj) => todoObj.id !== parseInt(id));
    this.defineMode();
  }

  toggleCheckbox(id) {
    this.todo = this.todo.map((todoObj) => {
      if (todoObj.id === parseInt(id)) {
        todoObj.active = !todoObj.active;
      }
      return todoObj;
    });
    this.defineMode();
  }

  makeLabelEditable(e) {
    const label = e.target;
    label.contentEditable = true;
    label.focus();
  }

  makeLabelUneditable(label) {
    const newLabelContent = label.textContent.trim();
    const labelId = parseInt(label.dataset.id);
    this.todo = this.todo.map((item) => {
      if (labelId === item.id) {
        item.task = newLabelContent;
      }
      return item;
    }).filter((todoObj) => {
      return todoObj.task !== '';
    });
    label.contentEditable = false;
    this.defineMode();
  }

  renderFooter() {
    this.countItems();
    const itemCount = this.todo.filter((item) => item).length;
    if (!itemCount) {
      this.footer.style.display = 'none';
      this.checkAll.style.display = 'none';
    } else {
      this.footer.style.display = 'flex';
      this.checkAll.style.display = 'block';
    }
  }

  countItems() {
    const activeItemCount = this.todo.filter((item) => item.active).length;
    this.counter.textContent = activeItemCount === 1 ? `${activeItemCount} item left` : `${activeItemCount} items left`;
  }

  render(todoArr) {
    this.renderBody(todoArr);
    this.renderFooter(todoArr);
  }
}

const todolist = new Todos(document.querySelector('.todo-list'), []);
