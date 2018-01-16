var id = 0;
var arrayOfItem = [];
var json, jsonParse;



var Item = function (itemId, itemDescription) {

    this.itemId = itemId;
    this.itemDescription = itemDescription;

}

function generateId() {

    return id + 1;
}

function addToArray() {

    var inputValue = document.getElementById("todo").value;
    id = generateId();

    //Creating Fragment
    var fragment = document.createDocumentFragment();
    var returnFragment = addToList(id, inputValue, fragment);
    addToFragment(returnFragment);

}

function addToList(itemId, itemDescription, fragment) {


    if (itemDescription.length == 0) {
        alert("Enter Valid Text");
        document.getElementById("todo").classList.add("todo-error");

    } else {
        document.getElementById("todo").classList.remove("todo-error");

        fragment = addItems(itemId, itemDescription, fragment);

        return fragment;

    }


}

function addToFragment(fragment) {
    //Appending fragment to unordered list
    document.getElementById("unordered-list").appendChild(fragment);

    document.getElementById("todo").value = '';
    document.getElementById("todo").placeholder = "Type here...";
}


function addItems(itemId, itemDescription, fragment) {

    fragment = insertIntoDOM(itemId, itemDescription, fragment);
    insertIntoArray(itemId, itemDescription);

    return fragment;

}

function insertIntoDOM(itemId, itemDescription, fragment) {


    //Creating List Tag
    var list = document.createElement("li");
    var text = document.createTextNode(itemDescription);




    // Creating I tag
    var i = document.createElement("i");
    i.classList.add("fa");
    i.classList.add("fa-times-circle");
    i.addEventListener('click', function () {
        deleteItems(event);
    });
    i.dataset.close = itemId;




    list.setAttribute("id", itemId);
    list.classList.add("item");

    list.appendChild(text);


    //Event Listener for input checkbox
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");



    //Creating div element
    var div = document.createElement("div");
    div.dataset.id = itemId;
    div.appendChild(input);
    div.appendChild(list);
    div.appendChild(i);
    div.classList.add("item-div");

    //Append div to fragment
    fragment.appendChild(div);


    return fragment;


}

function insertIntoArray(itemId, itemDescription) {

    var arrayItem = new Item(itemId, itemDescription);

    arrayOfItem.push(arrayItem);

}







function eventListener(event) {

    var tagName = (event.target.tagName);

    var closeId = event.target.dataset.close;

   

    if (tagName == "I") {
        var confirmDelete = confirm("Are you sure to delete Item? ");
        event.preventDefault();
        if (confirmDelete == true) {
            document.querySelector("div[data-id='" + closeId + "']").remove();

        }
    }
    if (tagName == "INPUT") {

        event.target.parentNode.childNodes[1].classList.toggle("strike");
    }

}


var addBulkItems = [];

function retrieveList() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            json = this.response;
            jsonParse = JSON.parse(json);



            //Creating Fragment
            var fragment = document.createDocumentFragment();


            for (var i = 0; i < jsonParse.length; i++) {
                var getItemId = jsonParse[i].id;
                var getItemTitle = jsonParse[i].title;

                var arrayItem = new Item(getItemId, getItemTitle);




                arrayOfItem.push(arrayItem);

                fragment = addToList(getItemId, getItemTitle, fragment);


            }

            addToFragment(fragment);



        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhttp.send();
}