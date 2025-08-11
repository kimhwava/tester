const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// โหลดรายการจาก localStorage
let todos = JSON.parse(localStorage.getItem('todolist') || '[]');
renderTodos();

todoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    localStorage.setItem('todolist', JSON.stringify(todos));
    todoInput.value = '';
    renderTodos();
  }
});

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');
    li.onclick = () => {
      todos[idx].completed = !todos[idx].completed;
      localStorage.setItem('todolist', JSON.stringify(todos));
      renderTodos();
    };
    const delBtn = document.createElement('button');
    delBtn.textContent = 'ลบ';
    delBtn.className = 'delete-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      todos.splice(idx, 1);
      localStorage.setItem('todolist', JSON.stringify(todos));
      renderTodos();
    };
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}
