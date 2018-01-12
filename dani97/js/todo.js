function insertTask() {
   var task = document.getElementsByClassName("my-task")[0].value;
  if(task.length<=0){
    alert("pls insert a valid task");
    return;
  }
  var fragment = document.createDocumentFragment();
  var element = document.createElement("div");
  var close = document.createElement("div");
  var check = document.createElement("div");
 
  element.textContent = task;
  element.classList.add("task");
  //element.setAttribute("onclick","deleteTask(event)");
  check.classList.add("task-finish");
  check.textContent = 'C';
  //check.setAttribute("onclick","completeTask(event)");
  close.textContent = 'X';
  close.classList.add("task-close");
  //close.setAttribute("onclick","deleteTask(event)");
  element.appendChild(close);
  element.appendChild(check);
  var list = document.getElementsByClassName("tasks")[0];
  console.log(list);
  fragment.appendChild(element);
  list.appendChild(fragment);
}

function deleteTask(event) {
  
   element = event.srcElement;
   console.log(element);
  if(element.classList.contains("task-close")){
   if(confirm("deleting element")){       element.parentNode.parentNode.removeChild(element.parentNode);
                                  }
  }
  else if(element.classList.contains("task-finish")){
    element.parentNode.classList.add("strike");
  }
  else{
    
  }
  //
}

function completeTask(event) {
  element = event.srcElement;
  
}