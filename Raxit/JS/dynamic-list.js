var taskList = document.getElementsByClassName("list");
var taskListObject = {};
var id;

//For getting uniqueID for each task.
var uniqueID = (function() {
    var id = 0;
    return function() {
        return ++id;
    };
})();

//Constructor for initializing the object.
function TaskManager(taskName, taskID, taskDescription) {
    this.taskName = taskName;
    this.taskID = taskID;
    this.taskDescription = taskDescription;
}

//onClick() listener for adding elements in the unordered list.
function myFunction() {
    var taskName = document.getElementById("task");
    var description = document.getElementById("description");
    var errorMessage = document.getElementsByClassName("error-message");
    //Validation for the input tesxt boxes.
    var taskNameValue = taskName.value.trim();
    var descriptionValue = description.value.trim();
    if(taskNameValue.length == 0 || descriptionValue.length == 0) {
        errorMessage[0].innerHTML = "Please enter all the fields.";
        taskName.value = "";
        description.value = "";
    }
    else {
        errorMessage[0].innerHTML = "";
        //Adding object to the global object.
        id = uniqueID();
        var taskObject = new TaskManager(taskName.value, id, description.value);
        taskListObject["Task-" + id] = taskObject;
        //Making the unordered flex list
        var division = document.createElement("div");
        var listItem = document.createElement("li");
        var removeButton = document.createElement("button");
        var uncheckButton = document.createElement("button");
        var fragments = document.createDocumentFragment();
        listItem.appendChild(document.createTextNode(taskObject.taskName));
        removeButton.appendChild(document.createTextNode("X"));
        removeButton.classList.add('remove-buttons-style');
        removeButton.setAttribute('id',"remove-" + id);
        uncheckButton.appendChild(document.createTextNode("C"));
        uncheckButton.classList.add('uncheck-buttons-style');
        uncheckButton.setAttribute('id', 'uncheck-' + id);
        division.appendChild(removeButton);
        division.appendChild(uncheckButton);
        division.appendChild(listItem);
        division.classList.add('div-styling');
        fragments.appendChild(division);
        taskList[0].appendChild(fragments);
        //Emptying the input text boxes after the completion of operation.
        taskName.value = "";
        description.value = "";
    }
}

//onClick() listener for deleting and striking list items
//This function also deletes the object in the object array.
function list(event) {
    var getId = (event.target.id.split("-"));
    var listItem = document.getElementById(event.target.id);
    var taskObject = {};
    taskObject = taskListObject["Task-" + getId[1]];
    if(getId[0] == "uncheck") {
        if(listItem.parentNode.lastChild.classList.contains('uncheck')){
            listItem.parentNode.lastChild.classList.remove('uncheck');
        } else {
            listItem.parentNode.lastChild.classList.add('uncheck');
        }
    } else if(getId[0] == "remove") {
        if(confirm("Do you want to delete " + taskObject.taskName + "?") == true) {
            listItem.parentNode.parentNode.removeChild(listItem.parentNode);
            delete taskListObject["Task-" + getId[1]];
        }
    }
}
