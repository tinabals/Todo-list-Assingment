const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

let items = JSON.parse(localStorage.getItem('todo-list')) || [];

function renderTodoList() {
  todoList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => removeItem(index));
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      removeItem(index);
    });
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function addItem() {
  const newItem = todoInput.value.trim();
  if (newItem === '') return;
  items.unshift(newItem);
  localStorage.setItem('todo-list', JSON.stringify(items));
  todoInput.value = '';
  renderTodoList();
}

function removeItem(index) {
  items.splice(index, 1);
  localStorage.setItem('todo-list', JSON.stringify(items));
  renderTodoList();
}

addButton.addEventListener('click', addItem);

todoInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) addItem();
});

renderTodoList();
