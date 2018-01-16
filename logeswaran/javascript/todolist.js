var i = 0;

document.getElementById('task-submit').addEventListener('click', addListItem);
document.getElementById('ul-container').addEventListener('click', alterListItem);
document.getElementById('task-fetch').addEventListener('click', displayTasks);

var fragment = document.createDocumentFragment();
function TaskClass(id, title, status) {
    this.id = id;
    this.title = title;
    this.status = status;
}

function displayTasks() {
    var tasks;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tasks = JSON.parse(this.responseText);
            for (j in tasks) {
                addDocumentFragment(tasks[i].id, tasks[i].title);
                i++;
                if (tasks[j].id % 10 == 0) {
                    document.getElementsByTagName('ul')[0].appendChild(fragment);
                    break;
                }
            }
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhttp.send();

    // if(tasks[j].status == "Checked") {
    //     var listItem = document.querySelector("li[data-id='" + tasks[j].id + "']");
    //     listItem.childNodes[0].classList.add('strike-through');
    //     listItem.childNodes[1].textContent = "Uncheck";
    // }
}

function addDocumentFragment(id, title) {
    var li = document.createElement('li');
    var taskText = document.createElement('span');
    var checkButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    taskText.textContent = title;
    taskText.classList.add('task-content')
    li.appendChild(taskText);
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    fragment.appendChild(li);
    li.dataset.id = id;
    checkButton.innerHTML = "Check";
    deleteButton.innerHTML = "Delete";
    document.getElementById('task-text').value = '';
}

function addListItem(event) {
    var title = document.getElementById('task-text').value.trim();
    if (title == '') {
        alert("Please enter a valid task");
        return;
    }
    i++;
    addDocumentFragment(i, title);
    document.getElementsByTagName('ul')[0].appendChild(fragment);
    var newTask = new TaskClass(i, title, "Unchecked");
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
            for (j in tasks) {
                if (tasks[j].id == id) {
                    tasks.splice(j, 1);
                }
            }
        }
    }
}