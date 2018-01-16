var window = window;
var XMLHTTP = window.XMLHTTP;
var XMLHttpRequest = window.XMLHttpRequest;
var alert = window.alert;
var confirm = window.confirm; 
var ActiveXObject = window.ActiveXObject;
var document = window.document;
window.onload = function() {
    if(confirm('do you want to load tasks from web')){
        insertTask(multiple=true);
    }
};
getId = function () {
    if ( typeof Task.id == 'undefined' ) {
    // It has not... perform the initialization
        Task.id = 0;
    }
    Task.id += 1;
    return Task.id;
};
var TaskArray = [];
var fragment;
function Task (taskName) {
    Task.id = getId();
    var _taskName = taskName;
    //html element creation - task
    var element = window.document.createElement('div');
    var close = window.document.createElement('button');
    var check = window.document.createElement('button');
    //dom element creation
    element.textContent = taskName;
    element.classList.add('task');
    
    element.setAttribute('id','task-'+Task.id);
    check.classList.add('task-finish');
    close.classList.add('task-close');
    check.classList.add('glyphicon');
    check.classList.add('glyphicon-ok');
    close.classList.add('glyphicon');
    close.classList.add('glyphicon-remove');
    element.appendChild(close);
    element.appendChild(check);
    fragment.appendChild(element);

    getContent = function () {
        return this._taskName;
    };

    setContent = function (taskName ) {
        this._taskName = taskName;
    };
}

function validateTask(task){
    if(task.length <= 0 || task.trim().length <= 0){
        window.document.getElementsByClassName('my-task')[0].classList.add('validation-alert');
        //delay for chrome browser
        alert('please insert a valid task');
    
        return false;
    } 
    return true;
}

function insertTask(multiplicity) {
    if(!multiplicity) {
        var task = document.getElementsByClassName('my-task')[0].value;
        if(validateTask(task)){
            fragment = document.createDocumentFragment();
            var newTask = new Task(task);
            TaskArray.push(newTask);
            window.document.getElementsByClassName('tasks')[0].appendChild(fragment);
        }
    }
    else {
        loadJSON();
    }
}

function performTask(event) {
  
    var element = event.srcElement;
    console.log(element);
    if(element.classList.contains('task-close')){
        if(confirm('Sure you want to delete this task?')){
            element.parentNode.parentNode.removeChild(element.parentNode);
            var id = element.parentNode.getId;
            for(var index = 0 ;index < TaskArray.length ; index ++ ) {
                if(TaskArray.getId == id){
                    TaskArray.splice(index,1);
                }
            }
        }
    }
    else if(element.classList.contains('task-finish')){
        if(!element.parentNode.classList.contains('strike')){
            element.parentNode.classList.add('strike');
        }else {
            console.log(element.parentNode);
            element.parentNode.classList.remove('strike');
        }
    }
}

function loadJSON(){
    var data_file = 'https://jsonplaceholder.typicode.com/posts';
    fragment = document.createDocumentFragment();
    var http_request = new XMLHttpRequest();
    try{
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            http_request = new ActiveXObject('Msxml2.XMLHTTP');
        
        }catch (e) {
      
            try{
                http_request = new ActiveXObject('Microsoft.XMLHTTP');
            }catch (e){
                // Something went wrong
                alert('Your browser broke!');
                return false;
            }
        
        }
    }
    
    http_request.onreadystatechange = function(){
    
        if (http_request.readyState == 4  ){
            // Javascript function JSON.parse to parse JSON data
            var postContainer = document.getElementsByClassName('tasks')[0];
            var postArray = JSON.parse(http_request.responseText);
            for(var i=0;i<postArray.length;i++){
                var post = postArray[i];
                var newTask = new Task(post.title);
                TaskArray.push(newTask);
            }
            postContainer.appendChild(fragment);
            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
               
        }
    };
    
    http_request.open('GET', data_file, true);
    http_request.send();
}

function removeValidation() {
    var inputTask = document.getElementsByClassName('my-task')[0];
    if(inputTask.classList.contains('validation-alert')){
        inputTask.classList.remove('validation-alert');
    }
}