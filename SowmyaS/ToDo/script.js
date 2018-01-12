var todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    }
};

var handlers = {
    addTodo: function () {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        var space = "^\\s+$";
        if (addTodoTextInput.value == "" || addTodoTextInput.value == null || addTodoTextInput.value.match(space)) 
           {
            var doc = document.getElementById('addTodoTextInput');
            doc.classList.add("focus");
            alert("Empty field");
            doc.classList.remove("focus");
        }
        else {
            todoList.addTodo(addTodoTextInput.value);
            addTodoTextInput.value = '';
            view.displayTodos();
        }
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement('li');
            // var tododiv = document.createElement('div');
            todoLi.id = position;
            todoLi.textContent = todo.todoText;
            todoLi.appendChild(this.createDelButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDelButton: function () {
        var delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.className = 'deleteButton';
        return delButton;
    },
    setUpEventListeners: function () {
        var todoUl = document.querySelector('ul');
        todoUl.addEventListener("click", function (event) {
            console.log(event.target.parentNode);
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                elementChecked.classList.add("strike");
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};
view.setUpEventListeners();

