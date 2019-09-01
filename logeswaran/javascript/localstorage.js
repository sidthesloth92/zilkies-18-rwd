document.getElementById('task-submit').addEventListener('click', addTask);
document.getElementById('ul-container').addEventListener('click', alterTask);
document.getElementById('task-fetch').addEventListener('click', displayTaskFromAjax);
document.getElementById('ul-container').addEventListener('load', onLoadDisplayTasks);

var i = 0;
var window = window;
var document = document;
var XMLHttpRequest = XMLHttpRequest;
var alert = alert;
var localStorage = localStorage;
var event = event;
var tasks = tasks;
var taskStorage;

function TaskClass(id, title, status) {
    this.id = id;
    this.title = title;
    this.status = status;
}

function onLoadDisplayTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks != null) {
        for (var j = 0; j < tasks.length; j++) {
            addToDocumentFragment(tasks[j].id, tasks[j].title);
            i = tasks[j].id + 1;
            if (tasks[j].status == "Checked") {
                var listItem = document.querySelector("li[data-id='" + tasks[j].id + "']");
                listItem.childNodes[0].classList.add('strike-through');
                listItem.childNodes[1].textContent = "Uncheck";
            }
        }
    }
}

function displayTaskFromAjax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ajaxData = JSON.parse(this.responseText);
            for (var count = 0; count < 5; count++ , i++) {
                addToDocumentFragment(ajaxData[i].id, ajaxData[i].title);
                addToLocalStorage(ajaxData[i].id, ajaxData[i].title);
            }
        }
    };
    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    xhttp.send();
}

function addToDocumentFragment(id, title) {
    var li = document.createElement('li');
    var taskText = document.createElement('span');
    var checkButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    var fragment = document.createDocumentFragment();
    taskText.textContent = title;
    taskText.classList.add('task-content')
    li.appendChild(taskText);
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    fragment.appendChild(li);
    li.dataset.id = id;
    checkButton.dataset.id = id;
    deleteButton.dataset.id = id;
    checkButton.innerHTML = "Check";
    deleteButton.innerHTML = "Delete";
    document.getElementsByTagName('ul')[0].appendChild(fragment);
    document.getElementById('task-text').value = '';
}

function addToLocalStorage(id, title) {
    var newTask = new TaskClass(id, title, "Unchecked");
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks == null) {
        tasks = [];
    }
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
    var title = document.getElementById('task-text').value.trim();
    if (title == '') {
        alert("Please enter a valid task");
        return;
    }
    i++;
    addToDocumentFragment(i, title);
    addToLocalStorage(i, title);
}

function alterTask(event) {
    var id = event.srcElement.dataset.id;
    var listItem = document.querySelector("li[data-id='" + id + "']");
    if (event.srcElement.textContent == 'Check') {
        listItem.childNodes[0].classList.add('strike-through');
        event.srcElement.textContent = 'Uncheck';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].id == id) {
                tasks[j].status = "Checked";
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (event.srcElement.textContent == 'Uncheck') {
        listItem.childNodes[0].classList.remove('strike-through');
        event.srcElement.textContent = 'Check';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (var j = 0; j < tasks.length; j++) {
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
            for (var j = 0; j < tasks.length; j++) {
                if (tasks[j].id == id) {
                    tasks.splice(j, 1);
                }
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}
