const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = [];

function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const tip = document.createElement("li");
    tip.className = "empty-tip";
    tip.textContent = "暂无待办，开始添加第一条吧。";
    list.appendChild(tip);
    return;
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "标记完成");
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.type = "button";
    delBtn.textContent = "删除";
    delBtn.addEventListener("click", () => removeTodo(todo.id));

    item.append(checkbox, text, delBtn);
    list.appendChild(item);
  });
}

function addTodo(text) {
  todos.unshift({
    id: Date.now() + Math.random(),
    text,
    completed: false,
  });
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
  input.focus();
});

render();
