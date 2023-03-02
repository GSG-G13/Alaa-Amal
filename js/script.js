const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');
function additems() {
    let div = document.createElement("div");
    div.className = "task";
    let p = document.createElement("p");
    p.innerHTML = `${taskInput.value}`;
    let iconEdet = document.createElement("button")
    iconEdet.id= "edit-task"
    iconEdet.innerHTML = `<i class="ri-edit-2-fill"></i>`
    let iconDele = document.createElement("button")
    iconDele.id = "delete-task"
    iconDele.innerHTML = `<span><i class="ri-delete-bin-6-fill"></i><span>`
    div.appendChild(p);
    div.appendChild(iconDele);
    div.appendChild(iconEdet)
    taskList.appendChild(div)
}

function addTask() {
  const taskValue = taskInput.value.trim();

  if (!taskValue) {
    return;
  }

  const task = {
    id: new Date().getTime(),
    title: taskValue,
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

  
  additems();
  taskInput.value = '';
}


addBtn.addEventListener('click', addTask);
