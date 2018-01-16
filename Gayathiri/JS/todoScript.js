
var listArray = [];


function getLocalStorage()
{
  
  var localStorageTasks=localStorage.getItem('tasks');
  
  var parsedObject = JSON.parse(localStorageTasks);
  
 for(var i=0;i<parsedObject.length;i++)
        createTask(parsedObject[i].desc);
  
}

function getJSON() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    request.onreadystatechange = function () {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
                addTodoItems(this.responseText);
            }
            else {
                console.log('Error: page is empty');
            }
        }
    };
    request.send();
}

function addTodoItems(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == '') {
        return;
    }
    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log('Error: the to-do list array is empty!');
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {

        createTask(todoArray[i].title);

    }
    document.getElementById('retrieve').style.display = 'none';

}


function task(desc) {
    this.desc = desc;
    this.id = task.id++;
    this.flag = false;
}

task.id = 1;

var fragment = document.createDocumentFragment();

function createList() {
    var inputValue = document.getElementById('myInput').value;
    createTask(inputValue);
}


function createTask(inputValue) {

    var li = document.createElement('li');

    var space = '^\\s+$';
    if (inputValue === '' || inputValue.match(space)) {
        document.getElementById('myInput').style.borderColor = 'red';
        alert('Enter something!!!');
        document.getElementById('myInput').style.borderColor = 'blue';

    }
    else {
        li.innerHTML = inputValue;
        li.setAttribute('position', '' + task.id + '');
        fragment.appendChild(li);
        myUL.appendChild(fragment);
        listArray.push(new task(inputValue));
        localStorage.setItem('tasks',JSON.stringify(listArray));
   
    }
    document.getElementById('myInput').value = '';
    var btn = document.createElement('button');
    var txt = document.createTextNode('delete');
    btn.className = 'close';
    btn.appendChild(txt);
    li.appendChild(btn);
    var close = document.getElementsByClassName('close');
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            val = confirm('Do you want to delete?');

            if (val === true) {

                div.style.display = 'none';
                var position = div.getAttribute('position');

                for (var i = 0, len = listArray.length; i < len; i++) {

                    if (listArray[i].id == position) {

                        listArray.splice(i, 1);
                        localStorage.setItem('tasks',JSON.stringify(listArray));

                    }
                }
            }
        };
    }
}
var list = document.querySelector('ul');
list.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    
        var del = event.target.getAttribute('position');

        for (var i = 0, len = listArray.length; i < len; i++) {

            if (listArray[i].id == del) {

                if (listArray[i].flag == false)
                    listArray[i].flag = true;
                else
                    listArray[i].flag = false;

             
            }
            localStorage.setItem('tasks',JSON.stringify(listArray));
        }

    }
}, false);
