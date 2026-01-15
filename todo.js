// ===============================
// Selección de elementos del DOM
// ===============================
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// ===============================
// Cargar tareas desde localStorage
// ===============================
window.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task =>
    addTaskToDOM(task.text, task.date, task.time, task.completed)
  );
}

// ===============================
// Agregar tarea al DOM
// ===============================
function addTaskToDOM(text, date, time, completed = false) {
  const li = document.createElement("li");

  if (completed) li.classList.add("completed");

  const taskInfo = document.createElement("span");
  taskInfo.textContent = formatTaskText(text, date, time);

  const buttonsDiv = document.createElement("div");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("completeBtn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("deleteBtn");

  // Marcar como completada
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Eliminar tarea
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(buttonsDiv);

  taskList.appendChild(li);
}

// ===============================
// Formatear texto de la tarea
// ===============================
function formatTaskText(text, date, time) {
  let result = text;
  if (date) result += ` - ${date}`;
  if (time) result += ` - ${time}`;
  return result;
}

// ===============================
// Guardar tareas en localStorage
// ===============================
function saveTasks() {
  const tasks = [];

  taskList.querySelectorAll("li").forEach(li => {
    const spanText = li.querySelector("span").textContent;
    const parts = spanText.split(" - ");

    tasks.push({
      text: parts[0],
      date: parts[1] || "",
      time: parts[2] || "",
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// Evento botón Agregar
// ===============================
addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (text === "") return;

  addTaskToDOM(text, date, time);
  saveTasks();

  // Limpiar inputs
  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

// ===============================
// Agregar con Enter
// ===============================
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
