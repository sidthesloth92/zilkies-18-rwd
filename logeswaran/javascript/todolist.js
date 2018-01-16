document.getElementById('task-submit').addEventListener('click', addTask);
document.getElementById('ul-container').addEventListener('click', alterTask);
document.getElementById('task-fetch').addEventListener('click', displayTaskFromAjax);
document.getElementById('ul-container').addEventListener('load',onLoadDisplayTasks);

var window = window;
var document = document;
var XMLHttpRequest = XMLHttpRequest;
var alert = alert;
var localStorage = localStorage;
var event = event;
var tasks = tasks;
var i = 0;
var taskStorage;

function TaskClass(id, title, status) {
    this.id = id;
    this.title = title;
    this.status = status;
}

function onLoadDisplayTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var fragment = document.createDocumentFragment();
    if (tasks != null) {
        for (var j = 0; j < tasks.length; j++) {
            addToDocumentFragment(tasks[j].id, tasks[j].title, fragment);
            i = tasks[j].id + 1;
        }
        document.getElementsByTagName('ul')[0].appendChild(fragment);
    }
}

function displayTaskFromAjax() {
    var fragment = document.createDocumentFragment();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tasks = JSON.parse(this.responseText);
            for (var count = 0; count < 10; count++ , i++) {
                addToDocumentFragment(tasks[i].id, tasks[i].title, fragment);
                addToLocalStorage(tasks[i].id, tasks[i].title);
            }
            document.getElementsByTagName('ul')[0].appendChild(fragment);
        }
    };
    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    xhttp.send();
}

function addToDocumentFragment(id, title, fragment) {
    var listItem = document.createElement('li');
    var taskText = document.createElement('span');
    var checkButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    taskText.textContent = title;
    taskText.classList.add('task-content');
    listItem.appendChild(taskText);
    listItem.appendChild(checkButton);
    listItem.appendChild(deleteButton);
    fragment.appendChild(listItem);
    listItem.dataset.id = id;
    checkButton.innerHTML = 'Check';
    deleteButton.innerHTML = 'Delete';
    document.getElementById('task-text').value = '';
}

function addToLocalStorage(id, title) {
    taskStorage = JSON.parse(localStorage.getItem('tasks'));
    if (taskStorage == null) {
        taskStorage = [];
    }
    var newTask = new TaskClass(id, title, 'Unchecked');
    taskStorage.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskStorage));
}

function addTask() {
    var fragment = document.createDocumentFragment();
    var title = document.getElementById('task-text').value.trim();
    if (title == '') {
        alert('Please enter a valid task');
        return;
    }
    i++;
    addToDocumentFragment(i, title, fragment);
    addToLocalStorage(i, title);
    document.getElementsByTagName('ul')[0].appendChild(fragment);
}

function alterTask(event) {
    var id = event.srcElement.parentNode.dataset.id;
    var listItem = document.querySelector('li[data-id="' + id + '"]');
    if (event.srcElement.textContent == 'Check') {
        listItem.childNodes[0].classList.add('strike-through');
        event.srcElement.textContent = 'Uncheck';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].id == id) {
                tasks[j].status = 'Checked';
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (event.srcElement.textContent == 'Uncheck') {
        listItem.childNodes[0].classList.remove('strike-through');
        event.srcElement.textContent = 'Check';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for (j = 0; j < tasks.length; j++) {
            if (tasks[j].id == id) {
                tasks[j].status = 'Unchecked';
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (event.srcElement.textContent == 'Delete') {
        if (window.confirm('Do you want to delete this item?')) {
            document.getElementById('ul-container').removeChild(listItem);
            tasks = JSON.parse(localStorage.getItem('tasks'));
            for (j = 0; j < tasks.length; j++) {
                if (tasks[j].id == id) {
                    tasks.splice(j, 1);
                }
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}