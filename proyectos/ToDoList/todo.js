const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

// Cargar tareas desde localStorage al iniciar
window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
});

// Función para dar formato DD/MM/YYYY
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Crear tarea en DOM
function createTaskElement(task) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = task.text;

  const taskInfo = document.createElement("small");
  taskInfo.style.marginLeft = "10px";
  taskInfo.textContent = `📅 ${formatDate(task.date)}${task.time ? " ⏰ " + task.time : ""}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromStorage(task);
  });

  taskText.addEventListener("click", () => {
    li.classList.toggle("completed");
    task.completed = !task.completed;
    saveTasksToStorage();
  });

  if (task.completed) li.classList.add("completed");

  li.appendChild(taskText);
  li.appendChild(taskInfo);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Agregar nueva tarea
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "" || taskDate.value === "") return;

  const task = {
    text: taskInput.value,
    date: taskDate.value,
    time: taskTime.value,
    completed: false
  };

  createTaskElement(task);
  saveTaskToStorage(task);

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
});

// ===== LocalStorage =====
function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTasksToStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const info = li.querySelector("small").textContent;
    const completed = li.classList.contains("completed");

    const dateMatch = info.match(/📅 (\d{2}\/\d{2}\/\d{4})/);
    const timeMatch = info.match(/⏰ (\d{2}:\d{2})/);

    tasks.push({
      text,
      date: dateMatch ? formatDateReverse(dateMatch[1]) : "",
      time: timeMatch ? timeMatch[1] : "",
      completed
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => !(task.text === taskToRemove.text && task.date === taskToRemove.date && task.time === taskToRemove.time));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Convertir DD/MM/YYYY a YYYY-MM-DD para guardar
function formatDateReverse(dateStr) {
  const parts = dateStr.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
