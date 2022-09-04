// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  console.log("called");

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Addd Todo to LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  // Check Mark Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to List
  todoList.appendChild(todoDiv);

  // Clear Todo Input Value
  todoInput.value = "";
}

function deletecheck(e) {
  const item = e.target;

  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // Animate
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  console.log("filterTodo");
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
          console.log("caled");
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK --- Hey Do I already have a thing in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
