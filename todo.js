// Seleccionamos los elementos del DOM
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Cargar tareas desde localStorage al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.date, task.time, task.completed));
});

// Función para agregar una tarea al DOM
function addTaskToDOM(text, date, time, completed = false) {
  const li = document.createElement("li");
  li.className = completed ? "completed" : "";

  li.innerHTML = `
    <span>${text} ${date ? "- " + date : ""} ${time ? "- " + time : ""}</span>
    <div>
      <button class="completeBtn">✔</button>
      <button class="deleteBtn">✖</button>
    </div>
  `;

  // Marcar como completada
  li.querySelector(".completeBtn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Eliminar tarea
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Guardar tareas en localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    const span = li.querySelector("span");
    const parts = span.textContent.split(" - ");
    tasks.push({
      text: parts[0],
      date: parts[1] || "",
      time: parts[2] || "",
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Evento al hacer clic en "Agregar"
addBtn.addEventListener("click", () => {
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
});

// También permitir agregar con Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});
