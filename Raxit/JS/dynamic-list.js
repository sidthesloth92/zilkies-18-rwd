var window = window;
var document = window.document;
var taskList = document.getElementsByClassName('taskList');
var fragments = document.createDocumentFragment();
var listObject = {}, flag = 0;
var element = window.element;

var uniqueID = (function() {
    var id = 0;
    return function() {
        return ++id;
    };
})();

function TaskListItem(name, id) {
    this.name = name;
    this.id = id;
}

function loadJSONData() {
    if(flag == 1){
        window.alert('You have already loaded JSON data');
    }
    else{
        if(window.confirm('Do you want to fetch the JSON data from external URL?') == true) {
            flag = 1;
            var xhttp = new window.XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonData = JSON.parse(xhttp.responseText);
                    insertJSONData(jsonData);
                }
            };
            xhttp.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
            xhttp.send();
        }
    }
}

function insertJSONData(jsonData) {
    for(var i = 0;i < jsonData.length; i++) {
        var taskObject = new TaskListItem(jsonData[i].name, uniqueID());
        insertFragment(taskObject);
    }
    taskList[0].appendChild(fragments);
}

function insertFragment(taskObject) {
    listObject[taskObject.id] = taskObject;
    var nameText = document.createElement('p');
    var listItem = document.createElement('li');
    var removeButton = document.createElement('button');
    var uncheckButton = document.createElement('button');
    nameText.appendChild(document.createTextNode('Name : ' + taskObject.name));
    removeButton.classList.add('listitem-remove-buttons');
    uncheckButton.classList.add('listitem-uncheck-buttons');
    nameText.classList.add('listitem-name');
    removeButton.appendChild(document.createTextNode('Delete'));
    removeButton.setAttribute('id','remove-' + taskObject.id);
    uncheckButton.appendChild(document.createTextNode('Check'));
    listItem.appendChild(nameText);
    listItem.appendChild(uncheckButton);
    listItem.appendChild(removeButton);
    listItem.classList.add('listitem');
    fragments.appendChild(listItem);
}

function addListItem() {
    var taskName = document.getElementById('task');
    var errorMessage = document.getElementsByClassName('error-message');
    var taskNameValue = taskName.value.trim();
    if(taskNameValue.length == 0) {
        errorMessage[0].innerHTML = 'Please enter all the fields.';
        taskName.value = '';
    }
    else {
        errorMessage[0].innerHTML = '';
        var taskObject = new TaskListItem(taskName.value, uniqueID());
        insertFragment(taskObject);
        taskName.value = '';
    }
    taskList[0].insertBefore(fragments, taskList[0].childNodes[0]);
}

function deleteListItem(event) {
    element = event.srcElement;
    var getId = element.id.split('-');
    var object = {};
    object = listObject[getId[1]];
    if(getId[0] == 'remove') {
        if(window.confirm('Do you want to delete ' + object.name + '?') == true) {
            element.parentNode.parentNode.removeChild(element.parentNode);
            delete listObject[getId[1]];
        }
    } else if(element.classList.contains('listitem-uncheck-buttons')) {
        if(element.parentNode.firstChild.classList.contains('strikeText')){
            element.parentNode.firstChild.classList.remove('strikeText');
            element.innerHTML = 'Check';
        } else {
            element.parentNode.firstChild.classList.add('strikeText');
            element.innerHTML = 'Uncheck';
        }
    } 
}

window.onload = function() {
    loadData();
};

document.getElementById('enterDataButton').addEventListener('click', addListItem);
document.getElementById('loadDataButton').addEventListener('click', loadJSONData);
document.getElementsByClassName('taskList')[0].addEventListener('click', function deleteListItem1(event) {
    deleteListItem(event);
});
