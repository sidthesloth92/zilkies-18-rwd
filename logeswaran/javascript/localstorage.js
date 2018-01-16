var i = 1;

document.getElementById('task-submit').addEventListener('click', addListItem);
document.getElementById('ul-container').addEventListener('click', alterListItem);

function TaskClass(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
}

function displayTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks != null) {
        for (j in tasks) {
            console.log("id = " + tasks[j].id);
            console.log("desc = " + tasks[j].description);
            addDocumentFragment(tasks[j].id, tasks[j].description);
            i = tasks[j].id + 1;
            if(tasks[j].status == "Checked") {
                var listItem = document.querySelector("li[data-id='" + tasks[j].id + "']");
                listItem.childNodes[0].classList.add('strike-through');
                listItem.childNodes[1].textContent = "Uncheck";
            }
        }
    }
}

function addDocumentFragment(id, description) {
    var li = document.createElement('li');
    var taskText = document.createElement('span');
    var checkButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    var fragment = document.createDocumentFragment();
    taskText.textContent = description;
    taskText.classList.add('task-content')
    li.appendChild(taskText);
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    fragment.appendChild(li);
    li.dataset.id = id;
    checkButton.innerHTML = "Check";
    deleteButton.innerHTML = "Delete";
    document.getElementsByTagName('ul')[0].appendChild(fragment);
    document.getElementById('task-text').value = '';
}

function addListItem(event) {
    var description = document.getElementById('task-text').value.trim();
    if (description == '') {
        alert("Please enter a valid task");
        return;
    }
    addDocumentFragment(i, description);
    var newTask = new TaskClass(i, description, "Unchecked");
    i++;
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks == null) {
        tasks = [];
    }
    console.log(newTask);
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function alterListItem(event) {
    var id = event.srcElement.parentNode.dataset.id;
    var listItem = document.querySelector("li[data-id='" + id + "']");
    if (event.srcElement.textContent == 'Check') {
        listItem.childNodes[0].classList.add('strike-through');
        event.srcElement.textContent = 'Uncheck';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (j in tasks) {
            console.log("tasks[j].id = " + tasks[j].id);
            console.log("event id = " + id);
            if (tasks[j].id == id) {
                tasks[j].status = "Checked";
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (event.srcElement.textContent == 'Uncheck') {
        listItem.childNodes[0].classList.remove('strike-through');
        event.srcElement.textContent = 'Check';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (j in tasks) {
            console.log("tasks[j].id = " + tasks[j].id);
            console.log("event id = " + id);
            if (tasks[j].id == id) {
                tasks[j].status = "Unchecked";
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (event.srcElement.textContent == 'Delete') {
        if (window.confirm("Do you want to delete this item?")) {
            document.getElementById('ul-container').removeChild(listItem);
            tasks = JSON.parse(localStorage.getItem('tasks'));
            for (j in tasks) {
                if (tasks[j].id == id) {
                    tasks.splice(j, 1);
                }
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}