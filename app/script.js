const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

// CREATE
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = { id: Date.now(), text: taskText };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
});

// READ + RENDER
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    // UPDATE
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(task.id);

    // DELETE
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  const newText = prompt("Editar tarefa:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}
