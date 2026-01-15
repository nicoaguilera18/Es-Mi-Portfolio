// ==========================
// ELEMENTOS DEL DOM
// ==========================
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// ==========================
// INICIO
// ==========================
document.addEventListener("DOMContentLoaded", loadTasks);

// ==========================
// FUNCIONES STORAGE
// ==========================
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// CARGAR TAREAS
// ==========================
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));
}

// ==========================
// RENDER TAREA
// ==========================
function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const textSpan = document.createElement("span");
  textSpan.textContent = formatTask(task);

  const buttonsDiv = document.createElement("div");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.className = "completeBtn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "deleteBtn";

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskCompleted(task.id);
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTask(task.id);
  });

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(deleteBtn);

  li.appendChild(textSpan);
  li.appendChild(buttonsDiv);

  taskList.appendChild(li);
}

// ==========================
// FORMATO DE TEXTO
// ==========================
function formatTask(task) {
  let text = task.text;
  if (task.date) text += ` - ${task.date}`;
  if (task.time) text += ` - ${task.time}`;
  return text;
}

// ==========================
// AGREGAR TAREA
// ==========================
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    date: taskDate.value,
    time: taskTime.value,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  renderTask(task);
  clearInputs();
}

// ==========================
// LIMPIAR INPUTS
// ==========================
function clearInputs() {
  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

// ==========================
// ACTUALIZAR / ELIMINAR
// ==========================
function toggleTaskCompleted(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks(tasks);
}

function removeTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}
