var jsonDataList = document.getElementsByClassName("jsonDataList");
var fragments = document.createDocumentFragment();
var listObject = {};

var uniqueID = (function() {
    var id = 0;
    return function() {
        return ++id;
    };
})();

function Manager(name, id) {
    this.name = name;
    this.id = id;
}

window.onload = function() {
    if(confirm("Do you want to fetch the JSON data from external URL?") == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(xhttp.responseText);
                insertReply(json);
            }
        };
        xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        xhttp.send();
    }
}

function insertReply(content) {
    for(var i = 0;i < content.length; i++) {
        var taskObject = new Manager(content[i].name, uniqueID());
        insertFragment(taskObject);
    }
    jsonDataList[0].appendChild(fragments);
}

function insertFragment(taskObject) {
    listObject[taskObject.id] = taskObject;
    var nameText = document.createElement("p");
    var userListItem = document.createElement("li");
    var removeButton = document.createElement("button");
    var uncheckButton = document.createElement("button");
    nameText.appendChild(document.createTextNode("Name : " + taskObject.name));
    removeButton.classList.add('remove-buttons-style');
    uncheckButton.classList.add('uncheck-buttons-style');
    removeButton.appendChild(document.createTextNode("X"));
    removeButton.setAttribute('id',"remove-" + taskObject.id);
    uncheckButton.appendChild(document.createTextNode("C"));
    uncheckButton.setAttribute('id', 'uncheck-' + taskObject.id);
    userListItem.appendChild(removeButton);
    userListItem.appendChild(uncheckButton);
    userListItem.appendChild(nameText);
    userListItem.classList.add('div-styling');
    fragments.appendChild(userListItem);
}

//onClick() listener for adding elements in the unordered list.
function myFunction() {
    var taskName = document.getElementById("task");
    var errorMessage = document.getElementsByClassName("error-message");
    //Validation for the input text boxes.
    var taskNameValue = taskName.value.trim();
    if(taskNameValue.length == 0) {
        errorMessage[0].innerHTML = "Please enter all the fields.";
        taskName.value = "";
    }
    else {
        errorMessage[0].innerHTML = "";
        var taskObject = new Manager(taskName.value, uniqueID());
        insertFragment(taskObject);
        taskName.value = "";
    }
    jsonDataList[0].appendChild(fragments);
}

//onClick() listener for deleting and striking user list items
//This function also deletes the object in the User List object array.
function list(event) {
    var getId = (event.target.id.split("-"));
    var listItem = document.getElementById(event.target.id);
    var object = {};
    object = listObject[getId[1]];
    if(getId[0] == "uncheck") {
        if(listItem.parentNode.classList.contains('uncheck')){
            listItem.parentNode.classList.remove('uncheck');
        } else {
            listItem.parentNode.classList.add('uncheck');
        }
    } else if(getId[0] == "remove") {
        if(confirm("Do you want to delete " + object.name + "?") == true) {
            listItem.parentNode.parentNode.removeChild(listItem.parentNode);
            delete listObject[getId[1]];
        }
    }
}
