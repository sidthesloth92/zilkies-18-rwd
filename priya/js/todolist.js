var count = 0;
var window = window;
var document = window.document;
var todoCollection = new Array();
var unorderedList;
var localStorage = localStorage;
var todoItemsList = {
    deleteItem: function (positionToDelete) {
        for (var i = 0; i < todoCollection.length; i++) {
            if (todoCollection[i].id == positionToDelete)
                todoCollection.splice(i, 1);
        }

    }
};

function addItem(listText) {
    this.title = listText;
    this.done = false;
    this.id = ++count;
}

var handler = {
    addItem: function () {
        var text_input = window.document.getElementById('text-input');
        var pattern = '^\\s+$';
        if (text_input.value == '' || text_input.value == null || text_input.value.match(pattern)) {
            window.alert('Enter some text');
        }
        else {
            var item = new addItem(text_input.value);
            todoCollection.push(item);
            addList(-1, item);
            text_input.value = '';
        }
    },
    deleteItem: function (positionToDelete) {
        todoItemsList.deleteItem(positionToDelete);
        var deleteElement = document.querySelector('div[data-id="' + positionToDelete + '"]');
        deleteElement.remove();

        //addList(todoCollection.length,todoCollection);
    }
};

var view = {
    callEventListener: function () {

        var unordered_list = document.querySelector('ul');
        unordered_list.addEventListener('click', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                var confirmDel = window.confirm('Are you sure you want to Delete item ?');
                if (confirmDel == true) {
                    var parent = event.target;
                    var parentId = parent.getAttribute('data-delete-id');
                    handler.deleteItem(parentId);
                    localStorage.setItem('tasks', JSON.stringify(todoCollection));
                }
            }
            else {
                var strike_event = event.target.parentNode.firstChild;
                strike_event.classList.toggle('strike-through');
                event.target.parentNode.classList.remove('strike-through');
                localStorage.setItem('tasks', JSON.stringify(todoCollection));
            }
        });
    }
};

view.callEventListener();

document.getElementById('retrieve-json').addEventListener('click', function () {
    var request = new window.XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    request.onreadystatechange = function () {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
                var n = todoCollection.length;
                addToList(this.responseText);
                addList(n, todoCollection);
            }
        }
    };
    request.send();

});


function addToList(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == '')
        return;

    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = new addItem(todoArray[i].title);
        todoCollection.push(todoItem);
    }
}

function createDeleteButton() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
}
unorderedList = document.getElementById('ul');
var fragment = document.createDocumentFragment();

function addList(option, todoArray) {
    if (option >= 0) {
        for (var i = option; i < todoArray.length; i++) {
            var todoItem = todoArray[i];
            createElement(todoItem);
            unorderedList.appendChild(fragment);

        }
    }
    else {
        createElement(todoArray);
        unorderedList.appendChild(fragment);
    }
    localStorage.setItem('tasks', JSON.stringify(todoArray));
}
function createElement(todoItem) {
    var li = document.createElement('li');
    li.className = 'item__list';
    var id = todoItem.id;
    var todoDiv = document.createElement('div');
    var deleteButton = createDeleteButton();
    todoDiv.className = 'item__description';
    todoDiv.setAttribute('data-id', '' + id + '');
    deleteButton.setAttribute('data-delete-id', '' + id + '');
    todoDiv.appendChild(li);
    todoDiv.appendChild(deleteButton);
    fragment.appendChild(todoDiv);
    li.innerHTML = todoItem.title;
}
