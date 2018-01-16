var todos = new Array();
var count = 100;
var window = window;
//Constructor to add each item
function addTodo(todoText){
    this.todoText = todoText;
    this.delete =  false;
    this.id= ++count;
}

var todoList = {
    deleteTodo: function (position) {
        for(var i=0;i<todos.length;i++){
            if(todos[i].id == position)
                todos.splice(i, 1);
        }
    }
};


var handlers = {
    addTodo: function () {
        var addTodoTextInput = window.document.getElementById('addTodoTextInput');
        var space = '^\\s+$';
        if (addTodoTextInput.value == '' || addTodoTextInput.value == null || addTodoTextInput.value.match(space)) 
        {
            var doc = window.document.getElementById('addTodoTextInput');
            doc.classList.add('focus');
            window.alert('Empty field');
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
        var delButton = window.document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.className = 'deleteButton';
        return delButton;
    },
    createStrikeButton: function () {
        var strikeButton = window.document.createElement('button');
        strikeButton.textContent = 'Strike';
        strikeButton.className = 'strikeButton';
        return strikeButton;
    },
    setUpEventListeners: function () {
        var todoUl = window.document.querySelector('ul');
        todoUl.addEventListener('click', function (event) {
            event.target.parentNode.classList.add('strikethrough');
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                var contentToDel = elementClicked.parentNode.firstChild.textContent;
                var confirmDel = window.confirm('Delete item '+contentToDel+'?');
                if(confirmDel == true){
                    var parent = event.target.parentNode;
                    var parId= parent.getAttribute('data-id');
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
var XMLHttpRequest = XMLHttpRequest;
window.document.getElementById('retrieveData').addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.open('GET','https://jsonplaceholder.typicode.com/posts');
    request.onreadystatechange = function(){
        if(this.readyState == this.DONE && this.status ==200){
            if(this.responseText){
                parseTodoItems(this.responseText); //calling function
                addTodosToPage();
            }
        }
    };
    request.send();
});

function parseTodoItems(todoJSON){
    if(todoJSON == null || todoJSON.trim() == '')
        return;

    var todoArray = JSON.parse(todoJSON);
    if(todoArray.length == 0){
        return;
    }
    for(var i = 0;i<todoArray.length;i++){
        var todoItem = todoArray[i];
        todos.push(todoItem);
    }
}

function addTodosToPage(){
    var todosUl = window.document.getElementById('ul');
    var fragment = window.document.createDocumentFragment();
    todosUl.innerHTML = ' ';
    for(var i=0 ;i<todos.length;i++){
        var todoItem = todos[i];
        createUiElement(todoItem,fragment,todosUl);       
    } 
}

function createUiElement(todoItem,fragment,todosUl){
    var li = window.document.createElement('li');
    var todoDiv = window.document.createElement('div');
    var id = todoItem.id;
    todoDiv.setAttribute('data-id',''+id+'');
    fragment.appendChild(todoDiv);
    todoDiv.appendChild(li);
    todoDiv.appendChild(view.createDelButton());
    todoDiv.appendChild(view.createStrikeButton());
    li.innerHTML = todoItem.title || todoItem.todoText || todoItem;
    todosUl.appendChild(fragment);
}

