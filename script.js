let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("completed");

    li.onclick = () => toggleTask(index);

    const btn = document.createElement("button");
    btn.textContent = "🗑️";
    btn.onclick = (e) => {
      e.stopPropagation();
      removeTask(index);
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

window.onload = renderTasks;
