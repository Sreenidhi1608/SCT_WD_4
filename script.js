document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function addTask() {
  const titleInput = document.getElementById("taskTitle");
  const dateTimeInput = document.getElementById("taskDateTime");
  const categoryInput = document.getElementById("taskCategory");

  const title = titleInput.value.trim();
  const dateTime = dateTimeInput.value;
  const category = categoryInput.value;

  if (!title || !dateTime || !category) {
    alert("Please fill all fields");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="task-content">
      <div>
        <h3>${title}</h3>
        <p><strong>${category}</strong> • ${new Date(dateTime).toLocaleString()}</p>
      </div>
      <div class="task-actions">
        <button class="done-btn">✅</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    </div>
  `;

  taskList.appendChild(li);

  titleInput.value = '';
  dateTimeInput.value = '';
  categoryInput.selectedIndex = 0;

  li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

  li.querySelector(".done-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  li.querySelector(".edit-btn").addEventListener("click", () => {
    titleInput.value = title;
    dateTimeInput.value = dateTime;
    categoryInput.value = category;
    li.remove();
  });
}

function filterByDate() {
  const filterDate = document.getElementById("filterDate").value;
  const taskItems = document.querySelectorAll("#taskList li");

  taskItems.forEach((item) => {
    const dateText = item.querySelector("p").innerText.split("•")[1].trim();
    const taskDate = new Date(dateText);
    const selectedDate = new Date(filterDate);

    const sameDay =
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate();

    item.style.display = sameDay ? "flex" : "none";
  });
}

function clearFilter() {
  document.getElementById("filterDate").value = "";
  document.getElementById("filterCategory").value = "";
  filterTasks(); // reuse filtering logic
}

document.getElementById("filterCategory").addEventListener("change", filterTasks);
document.getElementById("filterDate").addEventListener("change", filterTasks);

function filterTasks() {
  const selectedDate = document.getElementById("filterDate").value;
  const selectedCategory = document.getElementById("filterCategory").value;
  const taskItems = document.querySelectorAll("#taskList li");

  taskItems.forEach((item) => {
    const dateText = item.querySelector("p").innerText.split("•")[1].trim();
    const categoryText = item.querySelector("p").innerText.split("•")[0].trim();

    const taskDate = new Date(dateText);
    const filterDate = new Date(selectedDate);
    const matchDate = !selectedDate || (
      taskDate.getFullYear() === filterDate.getFullYear() &&
      taskDate.getMonth() === filterDate.getMonth() &&
      taskDate.getDate() === filterDate.getDate()
    );

    const matchCategory = !selectedCategory || categoryText === selectedCategory;

    item.style.display = (matchDate && matchCategory) ? "flex" : "none";
  });
}
