import "../../web/src/style.css";
// const baseURL = 'http://localhost:4000/api';

// async function getTodos() {
// 	const res = await fetch(`${baseURL}/todos`);
// 	const data = await res.json();

// 	return data;
// }

// async function init() {
// 	const todos = await getTodos();
// 	console.log('todos = ', todos);
// }

// window.addEventListener('load', init);

document.addEventListener("DOMContentLoaded", function () {
  const todosContainer = document.getElementById("todos") as HTMLDivElement;
  const addTodoForm = document.getElementById(
    "add-todo-form"
  ) as HTMLFormElement;
  const todoInput = document.getElementById("todo-input") as HTMLInputElement;

  function createTodoItem(todo: any) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
			<input type="checkbox" ${todo.completed ? "checked" : ""}>
			<span>${todo.title}</span>
			<button class="delete-btn">Delete</button>
		`;

    todoItem
      .querySelector('input[type="checkbox"]')!
      .addEventListener("change", function () {
        todo.completed = this.checked;
        todoItem.classList.toggle("completed");
      });

    todoItem
      .querySelector(".delete-btn")!
      .addEventListener("click", function () {
        deleteTodoItem(todo.id);
      });

    return todoItem;
  }

  // hamma funsiyalarni render qilish
  function renderTodos(todos: any[]) {
    todosContainer.innerHTML = "";

    todos.forEach(function (todo) {
      const todoItem = createTodoItem(todo);
      todosContainer.appendChild(todoItem);
    });
  }

  // yangi todo qoshish funcsiyasi
  function addTodoItem(todo: any) {
    const todoItem = createTodoItem(todo);
    todosContainer.appendChild(todoItem);
  }

  // delete todo
  function deleteTodoItem(todoId: string) {
    const todoItem = document.querySelector(
      `.todo-item[data-id="${todoId}"]`
    ) as HTMLDivElement;

    if (todoItem) {
      todoItem.remove();
    }
  }

  // hamma todolani fetch qilish
  fetch("http://localhost:4000/api/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderTodos(data);
    });

  // yangi todo qoshishga event listener
  
  addTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todoTitle = todoInput.value.trim();

    if (todoTitle !== "") {
      const newTodo = {
        title: todoTitle,
        completed: false,
      };

      fetch("http://localhost:4000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          addTodoItem(data);
          todoInput.value = "";
        });
    }
  });
});
