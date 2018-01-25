var count = 0;
var window = window;
var document = window.document;
var todoCollection = new Array();
var unorderedList;
var icon;
var fragment = document.createDocumentFragment();
var todoItemsList = {
    deleteItem: function deleteItem(positionToDelete) {
        //delete item from array
        for (var i = 0; i < todoCollection.length; i++) {
            if (todoCollection[i].id == positionToDelete)
                todoCollection.splice(i, 1);
        }

    },
    addItem: function addItem(listText) {
        //add item to list
        this.title = listText;
        this.done = false;
        this.id = ++count;
    }
};

//handling addition and deletion of item
var handler = {
    addItem: function addItem() {
        var text_input = window.document.getElementById('text-input');
        var pattern = '^\\s+$';
        //alert if no input
        if (text_input.value == '' || text_input.value == null || text_input.value.match(pattern)) {
            window.alert('Enter some text');
        }
        else {
            var item = new todoItemsList.addItem(text_input.value);
            todoCollection.push(item);
            addList(-1, item);
            text_input.value = '';
        }
    },
    deleteItem: function deleteItem(positionToDelete) {
        //delete from array and page
        todoItemsList.deleteItem(positionToDelete);
        var deleteElement = document.querySelector('div[data-id="' + positionToDelete + '"]');
        deleteElement.remove();
    }
};

function registerEventListener() {
    var unordered_list = document.querySelector('ul');
    unordered_list.addEventListener('click', function deleteListItem(event) {
        var elementClicked = event.target;
        if (elementClicked.className === 'deleteButton') {
            //confirm deletion
            var confirmDel = window.confirm('Are you sure you want to Delete item ?');
            if (confirmDel == true) {
                var element = event.target;
                var elementId = element.getAttribute('data-delete-id');
                handler.deleteItem(elementId);
            }
        }
    });
    unordered_list.addEventListener('click', function strikeItem(event) {
        var elementClicked = event.target;
        if (elementClicked.classList.contains('item__list')) {
            var strike_event = event.target;
            strike_event.classList.toggle('strike-through');
            if (strike_event.classList.contains('strike-through')) {
                icon = document.createElement('i');
                icon.setAttribute('class', 'fa fa-check-square');
                strike_event.appendChild(icon);
            }
            else {
                strike_event.removeChild(icon);
            }
        }
    });
}

registerEventListener();

document.getElementById('retrieve-json').addEventListener('click', function retrieve() {
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
    if (todoJSON == null)
        return;

    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = new todoItemsList.addItem(todoArray[i].title);
        todoCollection.push(todoItem);
    }
}

unorderedList = document.getElementById('ul');

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
}

function createDeleteButton() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
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

