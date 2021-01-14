'use strict'

const taskStatus = {
  activeTask: 'active',
  completedTask: 'completed'
}

class Todos {
  constructor(domNode, list) {
    this.input = document.querySelector('.todo-body__input');
    this.checkAll = document.querySelector('#checkAll');
    this.checkAllLabel = document.querySelector('.checkAllLabel');
    this.footer = document.querySelector('.todo-footer');
    this.counter = document.querySelector('.todo-footer__counter');
    this.filterLinks = Array.from(document.querySelectorAll('.todo-filter__link'));
    this.clearCompletedBtn = document.querySelector('.todo-clear-completed');
    this.ul = domNode;
    this.hash = null;
    this.selectAll = false;
    this.todoList  = [...list];

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

    this.checkAllLabel.addEventListener('click', (e) => this.toggleAllCheckboxes(e));

    this.filterLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        this.filterLinks.forEach((link) => link.classList.remove('todo-filter__link--active'));
        link.classList.add('todo-filter__link--active');
        this.hash = e.target.hash.slice(1);
        this.defineMode();
      });
    });

    this.clearCompletedBtn.addEventListener('click', (e) => {
      this.todoList  = this.todoList .filter((todoObj) => {
        return todoObj.active;       
      });
      this.defineMode();
    });
  }

  addTodo(task) {
    this.todoObj = {
      task: task,
      active: true,
      id: this.generateId()
    }
    this.todoList .push(this.todoObj);
  }

  toggleAllCheckboxes(e) {
    e.preventDefault();
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.todoList .forEach((item) => {
        this.checkAll.checked = true;
        item.active = false;
      });
    } else {
      this.todoList .forEach((item) => {
        this.checkAll.checked = false;
        item.active = true;
      });
    }
    this.defineMode();
  }

  defineMode() {
    switch (this.hash) {
      case taskStatus.activeTask:
        const activeTodos = this.todoList .filter((item) => item.active);
        this.render(activeTodos);
        break;
      case taskStatus.completedTask:
        const completedTodos = this.todoList .filter((item) => !item.active);
        this.render(completedTodos);
        break;
      default:
        this.render(this.todoList );
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
        labelForCheckbox = document.createElement('label'),
        taskLabel = document.createElement('label'),
        closeIcon = document.createElement('button');

      li.classList.add('todo-item');
      li.setAttribute('data-id', taskId);

      taskCheckbox.classList.add('todo-checkbox');
      taskCheckbox.setAttribute('id', taskId);
      taskCheckbox.setAttribute('type', 'checkbox');
      taskCheckbox.setAttribute('data-id', taskId);
      taskCheckbox.checked = !isActiveTask;

      labelForCheckbox.setAttribute('for', taskId);

      const taskState = isActiveTask ? taskStatus.activeTask : taskStatus.completedTask;
      taskLabel.classList.add('todo-label', taskState);
      taskLabel.setAttribute('data-id', taskId);
      taskLabel.textContent = taskName;

      closeIcon.classList.add('remove');
      closeIcon.setAttribute('data-id', taskId);

      li.append(taskCheckbox, labelForCheckbox, taskLabel, closeIcon);
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
      this.selectAllListener();
    });
  }

  selectAllListener() {
    const isAllSelected = this.todoList .every((todoObj) => !todoObj.active);
    if (isAllSelected) {
      this.selectAll = true;
      this.checkAll.checked = true;
    } else {
      this.selectAll = false;
      this.checkAll.checked = false;
    }
  }

  removeTask(id) {
    this.todoList  = this.todoList .filter((todoObj) => todoObj.id !== parseInt(id));
    this.defineMode();
  }

  toggleCheckbox(id) {
    this.todoList  = this.todoList .map((todoObj) => {
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
    this.todoList  = this.todoList .map((item) => {
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
    this.countActiveTasks();
    this.showClearBtn();
    const itemCount = this.todoList .filter((item) => item).length;
    if (!itemCount) {
      this.footer.style.display = 'none';
      this.checkAllLabel.style.visibility = 'hidden';
      this.checkAll.checked = false;
    } else {
      this.footer.style.display = 'flex';
      this.checkAllLabel.style.visibility = 'visible';
    }
  }

  countActiveTasks() {
    const activeItemCount = this.todoList .filter((item) => item.active).length;
    this.counter.textContent = activeItemCount === 1 ? `${activeItemCount} item left` : `${activeItemCount} items left`;
  }

  showClearBtn() {
    const isCompletedTask = this.todoList .some((todoObj) => {
      return !todoObj.active;
    })
    isCompletedTask ? this.clearCompletedBtn.style.visibility = 'visible' : this.clearCompletedBtn.style.visibility = 'hidden';
  }

  render(todoArr) {
    this.renderBody(todoArr);
    this.renderFooter(todoArr);
  }
}

const todolist = new Todos(document.querySelector('.todo-list'), []);
