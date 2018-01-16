document.getElementById('task-submit').addEventListener('click', addTask);
document.getElementById('ul-container').addEventListener('click', alterTask);
document.getElementById('task-fetch').addEventListener('click', displayTasks);

var i = 0;
var taskStorage = [] ;

function TaskClass(id, title) {
    this.id = id;
    this.title = title;
}

function displayTasks() {
    var fragment = document.createDocumentFragment();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tasks = JSON.parse(this.responseText);
            for (var count = 0; count < 10; count++ , i++) {
                addToDocumentFragment(tasks[i].id, tasks[i].title, fragment);
            }
            document.getElementsByTagName('ul')[0].appendChild(fragment);
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhttp.send();
}

function addToDocumentFragment(id, title, fragment) {
    var listItem = document.createElement('li');
    var taskText = document.createElement('span');
    var checkButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    taskText.textContent = title;
    taskText.classList.add('task-content')
    listItem.appendChild(taskText);
    listItem.appendChild(checkButton);
    listItem.appendChild(deleteButton);
    fragment.appendChild(listItem);
    listItem.dataset.id = id;
    checkButton.innerHTML = "Check";
    deleteButton.innerHTML = "Delete";
    document.getElementById('task-text').value = '';
    var newTask = new TaskClass(id, title);
    taskStorage.push(newTask);
    console.log(taskStorage);
}

function addTask(event) {
    var fragment = document.createDocumentFragment();
    var title = document.getElementById('task-text').value.trim();
    if (title == '') {
        alert("Please enter a valid task");
        return;
    }
    i++;
    addToDocumentFragment(i, title, fragment);
    document.getElementsByTagName('ul')[0].appendChild(fragment);
    
}

function alterTask(event) {
    var id = event.srcElement.parentNode.dataset.id;
    var listItem = document.querySelector("li[data-id='" + id + "']");
    if (event.srcElement.textContent == 'Check') {
        listItem.childNodes[0].classList.add('strike-through');
        event.srcElement.textContent = 'Uncheck';
    } else if (event.srcElement.textContent == 'Uncheck') {
        listItem.childNodes[0].classList.remove('strike-through');
        event.srcElement.textContent = 'Check';
    }
    if (event.srcElement.textContent == 'Delete') {
        if (window.confirm("Do you want to delete this item?")) {
            document.getElementById('ul-container').removeChild(listItem);
            taskStorage.splice(id,1);
        }
    }
}