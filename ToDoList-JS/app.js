// STEP 1: Get references to HTML elements
// We need to "grab" elements from the page so we can interact with them
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("btnAdd");
const displayList = document.getElementById("todoList");
const emptyList = document.getElementById("emptyList");

// STEP 2: Create an array to store our todos
// This is where we'll keep all our todo items in memory

let toDosLists = [];

// STEP 3: Function to add a new todo
// This function runs when someone clicks "Add" or presses Enter

function addToDo() {
  // Get the text from the input field and remove extra spaces
  const todoText = todoInput.value.trim();

  // Check if the input is empty - if so, stop here
  if (todoText === "") {
    alert("Please enter a task !");
    return;
  }

  // Create a new todo object with text and completion status
  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  // Add the new todo to the array
  toDosLists.push(newTodo);
  // clear the input field
  todoInput.value = "";
  // update the display to show the new task in the list
  showTodos();
}

// STEP 4: Function to delete a todo
// This removes a todo from our array based on its ID
function deleteTodo(id) {
  toDosLists = toDosLists.filter((toDosList) => toDosList.id !== id);
  showTodos();
}

// STEP 5: Function to toggle a todo's completion status
// This marks a todo as done or undone
function toggleTodo(id) {
  const toDosList = toDosLists.find((toDosList) => toDosList.id === id);

  if (toDosList) {
    toDosList.completed = !toDosList.completed;
  }

  showTodos();
}

// STEP 6: Function to render (display) all todos
// This is the main function that updates what you see on screen
function showTodos() {
  displayList.innerHTML = "";

  if (toDosLists.length === 0) {
    emptyList.style.display = "block";
  } else {
    emptyList.style.display = "none";

    toDosLists.forEach((toDosList) => {
      // Create a new list item element
      const li = document.createElement("li");
      li.className = "todo-item";

      // Add 'completed' class if the todo is done
      if (toDosList.completed) {
        li.classList.add("completed");
      }

      // Set the HTML content of the list item
      li.innerHTML = `
        <span class="todo-text">${toDosList.text}</span>
        <button class="delete-btn">Delete</button>`;

      // Add click event to the text to toggle completion
      const textSpan = li.querySelector(".todo-text");
      textSpan.addEventListener("click", () => {
          toggleTodo(toDosList.id);
        });

        // Add click event to the delete button
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
          deleteTodo(toDosList.id);
      });

      //add the list item to the todo list
      displayList.appendChild(li);
    });
  }
}

// STEP 7: Set up event listeners
// These "listen" for user actions and respond to them

// When the Add button is clicked, run addTodo
addBtn.addEventListener("click", addToDo);

// When Enter key is pressed in the input, run addTodo
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addToDo();
  }
});

// STEP 8: Initial render
// Show the empty state when the page first loads
showTodos();
