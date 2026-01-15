const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

/* Cargar tareas */
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => addTask(t.text, t.date, t.time, t.completed));
});

/* Agregar tarea */
function addTask(text, date, time, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text} ${date ? " - " + date : ""} ${time ? " " + time : ""}</span>
    <button class="deleteBtn">✖</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector(".deleteBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

/* Guardar tareas */
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    tasks.push({
      text: text,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Evento agregar */
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  addTask(taskInput.value, taskDate.value, taskTime.value);
  saveTasks();

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
});

/* Enter */
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

