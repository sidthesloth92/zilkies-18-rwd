var todos = new Array();
var count = 100;

//Constructor to add each item
function addTodo(todoText){
    this.todoText = todoText;
    this.delete =  false;
    this.id= ++count;
}

var todoList = {
    deleteTodo: function (position) {
       //console.log(position);
        for(var i=0;i<todos.length;i++){
            if(todos[i].id == position)
                todos.splice(i, 1);
        }
    }
};


var handlers = {
    addTodo: function () {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        var space = '^\\s+$';
        if (addTodoTextInput.value == '' || addTodoTextInput.value == null || addTodoTextInput.value.match(space)) 
        {
            var doc = document.getElementById('addTodoTextInput');
            doc.classList.add('focus');
            alert('Empty field');
            doc.classList.remove('focus');
        }
        else {
            todos.push(new addTodo(addTodoTextInput.value));
            addTodoTextInput.value = '';
            addTodosToPage();
        }
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        addTodosToPage();
    }
};

var view = {
    createDelButton: function () {
        var delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.className = 'deleteButton';
        return delButton;
    },
    createStrikeButton: function () {
        var strikeButton = document.createElement('button');
        strikeButton.textContent = 'Strike';
        strikeButton.className = 'strikeButton';
        return strikeButton;
    },
    setUpEventListeners: function () {
        var todoUl = document.querySelector('ul');
        todoUl.addEventListener('click', function (event) {
            event.target.parentNode.classList.add('strikethrough');
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                var contentToDel = elementClicked.parentNode.firstChild.textContent;
                var confirmDel = confirm('Delete item '+contentToDel+'?');
                if(confirmDel == true){
                    var parent = event.target.parentNode;
                    console.log(event.target.parentNode);
                    var parId= parent.getAttribute('data-id');
                    console.log(parId);
                    handlers.deleteTodo(parId);
                }
            }
            if(elementClicked.className === 'strikeButton'){
                var del = event.target.parentNode.firstChild;
                del.classList.toggle('strikethrough');
                event.target.parentNode.classList.remove('strikethrough');
            }
        });
    }
};
view.setUpEventListeners();


//Using AJAX REQUEST to get from the JSON 

function getToDoData(){
    var request = new XMLHttpRequest();
    request.open('GET','https://jsonplaceholder.typicode.com/posts');
    request.onreadystatechange = function(){
        if(this.readyState == this.DONE && this.status ==200){
            if(this.responseText){
                parseTodoItems(this.responseText); //calling function
                addTodosToPage();
            }
            else{
                console.log('NO DATA');
            }
        }
    };
    request.send();
}

function parseTodoItems(todoJSON){
    if(todoJSON == null || todoJSON.trim() == '')
        return;

    var todoArray = JSON.parse(todoJSON);
    if(todoArray.length == 0){
        console.log('Empty');
        return;
    }
    for(var i = 0;i<todoArray.length;i++){
        var todoItem = todoArray[i];
        todos.push(todoItem);
    }
    // console.log("To Do:");
    // console.log( JSON.stringify(todos) );
}

function addTodosToPage(){
    var todosUl = document.getElementById('ul');
    var fragment = document.createDocumentFragment();
    ul.innerHTML = ' ';
    for(var i=0 ;i<todos.length;i++){
        var todoItem = todos[i];
        createUiElement(todoItem,fragment,todosUl);       
    } 
    console.log(todos);
}

function createUiElement(todoItem,fragment,todosUl){
    var li = document.createElement('li');
    var todoDiv = document.createElement('div');
    var id = todoItem.id;
    todoDiv.setAttribute('data-id',''+id+'');
    fragment.appendChild(todoDiv);
    todoDiv.appendChild(li);
    todoDiv.appendChild(view.createDelButton());
    todoDiv.appendChild(view.createStrikeButton());
    li.innerHTML = todoItem.title || todoItem.todoText;    
    todosUl.appendChild(fragment);
}

