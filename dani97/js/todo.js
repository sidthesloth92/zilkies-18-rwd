var TaskArray = [];
var fragment;
function Tasks (taskName) {
  Tasks.id += 1;
  var _taskName = taskName;
  //html element creation 
  var element = document.createElement("div");
  var close = document.createElement("div");
  var check = document.createElement("div");
 
  element.textContent = taskName;
  element.classList.add("task");
  check.classList.add("task-finish");
  check.textContent = 'C';
  close.textContent = 'X';
  close.classList.add("task-close");
  element.appendChild(close);
  element.appendChild(check);
  fragment.appendChild(element);
  getId = function () {
      return Posts.id;
  }
  

  getContent = function () {
      return this._taskName;
  }

  setContent = function (taskName) {
      this._taskName = taskName;
  }
}

function insertTask() {
  var task = document.getElementsByClassName("my-task")[0].value;
  if(task.length<=0||task.trim().length<=0){
    document.getElementsByClassName("my-task")[0].classList.add("validation-alert");
    //delay for chrome browser
    setTimeout(function () {alert("pls insert a valid task")},200);
    setTimeout(function () {document.getElementsByClassName("my-task")[0].classList.remove("validation-alert")},500);
    return;
  } 
  fragment = document.createDocumentFragment();
  var newTask = new Tasks(task);
  TaskArray.push(newTask);
  if(confirm("do you want to add more tasks")){
    insertTask();
  }else{
    document.getElementsByClassName("tasks")[0].appendChild(fragment);
  }

}

function performTask(event) {
  
  element = event.srcElement;
  console.log(element);
  if(element.classList.contains("task-close")){
    if(confirm("deleting element")){
      element.parentNode.parentNode.removeChild(element.parentNode);
    }
  }
  else if(element.classList.contains("task-finish")){
    if(!element.parentNode.classList.contains("strike")){
    element.parentNode.classList.add("strike");
    }else {
      element.parentNode.classList.remove("strike");
    }
  }
  else{
    
  }

}
