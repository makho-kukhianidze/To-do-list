
// Variable block - Start.
let body = document.querySelector('body');
let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');
let clearButton = document.querySelector('#btn-reset');
let randomColor = ['#D5D736', '#D78936', '#365FD7', '#C136D7'];
let btn = document.querySelector('.btn');
// Variable block - End.

// addEventListener block - Start.
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
btn.addEventListener('click', function () {
	let randomColorIndex = parseInt(Math.random() * randomColor.length);
	body.style.backgroundColor = randomColor[randomColorIndex];
})
document.addEventListener('DOMContentLoaded', getTodos);
// addEventListener block - End.

// Function block - Start
// Function Time - Start.
function time() {
	let clock = new Date();
	let hour = clock.getHours(); // Hour
	let minute = clock.getMinutes(); // Minute
	let second = clock.getSeconds(); // Second
	if (hour < 10) {
		hour = `0${hour}`;
	}
	if (minute < 10) {
		minute = `0${minute}`;
	}
	if (second < 10) {
		second = `0${second}`;
	}
	var getclockTable = `${hour}:${minute}:${second} AM`; // Hour:Minute:Second.
	document.getElementById('clockTable').innerHTML = getclockTable;
	setInterval(time, 1000);
}
time();
// Function Time - End.

// Function - Add to do list - Start.
function addToDo(g) {
	g.preventDefault();

	// we create todo div.
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	// we create li.
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	// we create li.

	// we create check mark button.
	const completedButton = document.createElement('button');
	completedButton.innerText = "checked";
	completedButton.classList.add('complete-btn');
	// we create check mark button.

	// we create trash button.
	const trashButton = document.createElement('button');
	trashButton.innerText = "trash";
	trashButton.classList.add('trash-btn');
	// we create check trash button.

	// AppendChild - block.
	todoDiv.appendChild(newTodo);
	todoDiv.appendChild(completedButton);
	todoDiv.appendChild(trashButton);
	todoList.appendChild(todoDiv);
	// AppendChild - block.
	
	saveLocalTodos(todoInput.value);
	todoInput.value = '';
}
// Function - Add to do list - End.

// Function - delete and chek button - Start.
function deleteCheck(e) {
	const item = e.target
	if (item.classList[0] === 'trash-btn') { // delete button.
		const todo = item.parentElement;
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		})
	}
	if (item.classList[0] === 'complete-btn') { // chek button.
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}
// Function - delete and cheked button - End.

// Function - filter to do list - Start.
function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all": // all list.
				todo.style.display = "flex";
				break;
			case "completed": // completed list.
				if (todo.classList.contains('completed')) {
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted": // uncompleted list.
				if (!todo.classList.contains('completed')) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
};
// Function - filter to do list - End.

// Function - localStorage - save our to do list - Start.
function saveLocalTodos(todo) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];

	} else {

		todos = JSON.parse(localStorage.getItem('todos'));

	}
	todos.forEach(function (todo) {

		// we create todo div.
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		// we create todo div.

		// we create li.
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		// we create li.

		// we create check mark button.
		const completedButton = document.createElement('button');
		completedButton.innerText = "checked";
		completedButton.classList.add('complete-btn');
		// we create check mark button.

		// we create trash button.
		const trashButton = document.createElement('button');
		trashButton.innerText = "trash";
		trashButton.classList.add('trash-btn');
		// we create check trash button.

		todoDiv.appendChild(newTodo);
		todoDiv.appendChild(completedButton);
		todoDiv.appendChild(trashButton);
		todoList.appendChild(todoDiv);
	});
};
// Function - localStorage - save our to do list - End.

// Function - remove localStorage data - Start.
function removeLocalTodos(todo) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];

	} else {

		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
};
clearButton.addEventListener('click', function () {
	todoList.remove();
	localStorage.clear();
	location.reload();
})
// Function - remove localStorage data - End.
// Function block - End.