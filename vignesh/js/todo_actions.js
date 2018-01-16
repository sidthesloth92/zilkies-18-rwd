var window = window;
var document = window.document;
var element = window.element;
var id, li, fragment;
var taskList = {};
// getting a unique ID for a new task
var uniqueId = (function() {
    var id = 0;
    return function() {
        return ++id;
    };
})();
// assigns task ID and a taskname for a task
function task(taskName, taskId) {
    this.taskName = taskName;
    this.taskId  = taskId;
}
// adds the task from text box to list
function addTask() {
    var fragment = document.createDocumentFragment();
    var textBox = document.getElementsByClassName('to-do-item');
    var list = document.getElementsByClassName('list')[0];
    var input = textBox[0].value.replace(/ /g, '');
    if(input.length == 0){
        window.alert('Enter proper values');
        textBox[0].classList.add('invalid');
        textBox[0].value = '';
    }
    else {
        id = uniqueId();
        var taskItem = new task(textBox[0].value, id);
        taskList[id] = taskItem;
        insertUIElement(id, taskItem);
        fragment.appendChild(li);
        list.insertBefore(fragment, list.childNodes[0]);
        textBox[0].value = '';
        textBox[0].classList.remove('invalid');
    }
}
// to remove a task from the list using the parent's event listener
function removeItem(event) {
    element = event.srcElement;
    var getId = element.id.split('-');
    if(element.classList.contains('remove-item')){
        if(window.confirm('Are you sure to delete this item?')){
            element.parentNode.parentNode.removeChild(element.parentNode);
            delete taskList[getId[1]];
        }
    }
    else if(element.classList.contains('check-item')){
        if(element.parentNode.firstChild.classList.contains('strike')){
            element.parentNode.firstChild.classList.toggle('strike');
            element.innerHTML = 'check';
        }
        else {
            element.parentNode.firstChild.classList.toggle('strike');
            element.innerHTML = 'uncheck';
        }
    }
}
// to load data from external website
function loadData() {
    id = 0;
    if(window.confirm('Do you want to insert tasks from the external website?')){
        var request = new window.XMLHttpRequest();
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                var json = JSON.parse(request.responseText);
                insertData(json);   
            }
        };
        request.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
        request.send();
    }
}
// inserts data from external website
function insertData(content) {
    var list = document.getElementsByClassName('list')[0];
    fragment = document.createDocumentFragment();
    var totalLines = content.length;
    //Validation for the input tesxt boxes.
    for(var i = 0; i < totalLines; i++) {
        id = uniqueId();
        //Adding object to the global object.
        var taskItem = new task(content[i].name, id);
        taskList[id] = taskItem;
        //Making the unordered flex list
        insertUIElement(id, taskItem);
        fragment.appendChild(li);
    }
    list.appendChild(fragment);
}
// creates UI elements to be added in the list
function insertUIElement(id, taskItem) {
    li = document.createElement('li');
    var button = document.createElement('button');
    var buttonCheck = document.createElement('button');
    var span = document.createElement('span');
    button.textContent = 'Delete';
    buttonCheck.textContent = 'Check';
    span.innerHTML = taskItem.taskName;
    li.setAttribute('class', 'list-item');
    button.setAttribute('class', 'remove-item');
    button.setAttribute('id', 'remove'+ id);
    buttonCheck.setAttribute('class', 'check-item');
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(buttonCheck);
}

window.onload = loadData();

document.getElementById('add').addEventListener('click',addTask);

document.getElementById('list').addEventListener('click',function remove1Item(event) {
    removeItem(event);
});

document.getElementById('load').addEventListener('click',function loadExternalData(){
    document.getElementById('load').disabled = true;
    loadData();
});
