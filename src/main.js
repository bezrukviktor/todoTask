'use strict'

class Todos {
  constructor() {
    this.input = document.querySelector('.todo-header__input');
    this.ul = document.querySelector('.todo-list');
    this.counter = document.querySelector('.counter');
    this.footer = document.querySelector('.footer');
    this.checkAll = document.querySelector('.checkAll');
    this.select = false;
    this.todo = [];
    this.id = 0;

    this.setup();
    this.hideFooter();
    this.checkAll.addEventListener('change', () => this.selectAll());
  }

  setup() {
    this.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && e.target.value !== '' && e.target.value.trim() !== '') {
        this.addTodo(e.target.value);
        this.input.value = '';
        this.render();
      }
    });
  }

  addTodo(task) {
    this.todoObj = {
      task: task,
      active: true,
      id: this.generateId()
    }
    this.todo.push(this.todoObj);
    console.log(this.todo);
  }

  generateId() {
    return this.id++;
  }

  render() {
    this.ul.innerHTML = '';
    this.todo.forEach((item) => {
      const task = item.task,
        isChecked = item.active ? '' : 'checked',
        isActive = item.active ? 'active' : 'completed',
        id = item.id,
        todoItem = `
        <li class="todo-item">
          <input class="todo-checkbox" type="checkbox" ${isChecked} data-id=${id}>
          <label class=${isActive}>${task}</label>
          <i class="fa fa-times" aria-hidden="true" data-id=${id}></i>
        </li>`;
        this.ul.insertAdjacentHTML('beforeend', todoItem);
    });

    this.closeBtns = Array.from(document.querySelectorAll('.fa-times'));
    this.closeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.todo = this.todo.filter((item) => item.id !== +id);
        this.render();
      })
    });

    this.checkboxes = Array.from(document.querySelectorAll('.todo-checkbox'));
    this.checkboxes.forEach((item) => {
      item.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        this.todo = this.todo.map((item) => {
          if (item.id === +id) {
            item.active = !item.active;
          }
          return item;
        });
        this.render();
      });
    });

    this.countItems();
    this.hideFooter();
  }

  countItems() {
    const activeItemCount = this.todo.filter((item) => item.active).length;
    this.counter.textContent = activeItemCount === 1 ? `${activeItemCount} item left` : `${activeItemCount} items left`;
  }

  hideFooter() {
    const itemCount = this.todo.filter((item) => item).length;
    if (!itemCount) {
      this.footer.style.display = 'none';
      this.checkAll.style.display = 'none';
    } else {
      this.footer.style.display = 'flex';
      this.checkAll.style.display = 'block';
    }
  }

  selectAll() {
    this.select = !this.select;
    if (this.select) {
      this.todo.forEach((item) => {
        item.active = false;
      });
    } else {
      this.todo.forEach((item) => {
        item.active = true;
      });
    }
    this.render();
  }

}

(() => new Todos())();