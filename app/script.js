// Configuração Supabase
const { createClient } = supabase; // pega a função do SDK

const SUPABASE_URL = "https://gubkxlyqoxiqunetallh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Ymt4bHlxb3hpcXVuZXRhbGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzkzNjYsImV4cCI6MjA4NzYxNTM2Nn0.MhdqRP-ZPbHCFS6TNUODowyOA7Ws9I29LmexBECdZaw";

// cria a instância do cliente
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// READ - carregar tarefas
async function loadTasks() {
  const { data, error } = await client
    .from("tasks")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
    return;
  }
  renderTasks(data);
}

// CREATE - adicionar tarefa
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    const { error } = await client.from("tasks").insert([{ text }]);
    if (error) console.error(error);
    taskInput.value = "";
    loadTasks();
  }
});

// UPDATE - editar tarefa
async function editTask(id, oldText) {
  const newText = prompt("Editar tarefa:", oldText);
  if (newText && newText.trim() !== "") {
    const { error } = await client
      .from("tasks")
      .update({ text: newText })
      .eq("id", id);
    if (error) console.error(error);
    loadTasks();
  }
}

// DELETE - excluir tarefa
async function deleteTask(id) {
  const { error } = await client.from("tasks").delete().eq("id", id);
  if (error) console.error(error);
  loadTasks();
}

// Renderizar lista
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button onclick="editTask(${task.id}, '${task.text}')">Editar</button>
        <button onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Inicializar
loadTasks();
