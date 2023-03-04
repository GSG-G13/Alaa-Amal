const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const mainContainer = document.querySelector('.container');
const tasksContainer = document.querySelector('#task-list');
let clearBtn = document.querySelector('#clear-btn');
let tasksArr = [];

// console.log(localStorage.clear());
if (localStorage.getItem("tasks")) {
    tasksArr = JSON.parse(localStorage.getItem("tasks"));
}

getTasks();


addBtn.onclick = () => {
    if (!taskInput.value) {
        return;
    }
    // add to taskArr
    addTask(taskInput.value);
    // empty the field
    taskInput.value = '';

}

function addTask(textContent) {
    // create task obj
    let task = {
        id:Date.now(),
        content: textContent,
    }

    // push new task to array
    tasksArr.push(task);

    // add tasks to page
    createTaskElements(tasksArr); 

    // add tasks to local storage
    saveLocal(tasksArr);
};
 

function createTaskElements(taskArray) {
    tasksContainer.innerHTML = '';
    taskArray.forEach(task => {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // create parent elements
        let taskContent = document.createElement('p');
        taskContent.classList.add('task-content');
        taskContent.style.padding = '7px';
        taskContent.style.fontFamily = 'Arial';
        taskContent.style.fontSize = '14px';
        taskContent.innerHTML = task.content;
        taskDiv.appendChild(taskContent);

        let btnsDiv = document.createElement('div');
        btnsDiv.style.display = 'flex';
        btnsDiv.style.gap = '10px';
        let editBtn = document.createElement('button');
        editBtn.id = 'edit-task';
        let editIcon = document.createElement('i');
        editIcon.classList.add('ri-edit-2-fill');
        editBtn.appendChild(editIcon);
        btnsDiv.appendChild(editBtn);
        // add event listener to edit button
        editBtn.addEventListener('click', () => {
            let newContent = prompt('Enter new task content:', task.content);
            if (newContent !== null && newContent !== '') {
                // update task object in tasksArr array
                task.content = newContent;

                // update task element on page
                taskContent.innerHTML = task.content;

                // update task in local storage
                saveLocal(tasksArr);
            }
        });
        let deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete-task';
        deleteBtn.classList.add('delete-task');
        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('ri-delete-bin-6-fill');
        deleteBtn.appendChild(deleteIcon);
        btnsDiv.appendChild(deleteBtn);

        taskDiv.appendChild(btnsDiv);
        
        
        // delete button event listener
        deleteBtn.addEventListener('click', () => {
            // remove task element from page
            taskDiv.remove();

            // remove task object from tasksArr
            tasksArr = tasksArr.filter(obj => obj.id !== task.id);

            // update local storage
            saveLocal(tasksArr);
        });

        tasksContainer.appendChild(taskDiv);
        
    });
}

function saveLocal(tasksArray){
    window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function getTasks() {
    let info = window.localStorage.getItem('tasks');
    if (info) {
        let tasks = JSON.parse(info);
        createTaskElements(tasks);
    }
    
}

clearBtn.addEventListener("click",()=>{
    tasksArr = [];
    saveLocal(tasksArr);
    createTaskElements(tasksArr);
})






