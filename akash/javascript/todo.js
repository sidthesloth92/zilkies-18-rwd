var id = 0;
var arrayOfItem = [];
var json, jsonParse;



var Item = function (itemId, itemDescription) {

    this.itemId = itemId;
    this.itemDescription = itemDescription;

}

function addToArray() {

    var inputValue = document.getElementById("todo").value;
    id = id + 1;
    addToList(id, inputValue)
}

function addToList(itemId, itemDescription) {



    if (itemDescription == "") {
        alert("Enter Valid Text");
        document.getElementById("todo").classList.add("todo-error");

    } else {
        document.getElementById("todo").classList.remove("todo-error");

        //Creating Fragment
        var fragment = document.createDocumentFragment();

        //Creating List Tag
        var list = document.createElement("LI");
        var text = document.createTextNode(itemDescription);




        // Creating Anchor Tag
        var a = document.createElement("a");
        a.classList.add("button");
        a.setAttribute("href", "#");



        // Creating I tag
        var i = document.createElement("i");
        i.classList.add("fa");
        i.classList.add("fa-times-circle");
        i.addEventListener('click', function () {
            deleteItems(event);
        });
        i.setAttribute("id", "close-" + id);
        a.appendChild(i);



        list.setAttribute("id", id);
        list.classList.add("inline");

        list.appendChild(text);


        //Event Listener for input checkbox
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.addEventListener('click', function () {
            check(event);
        });


        //Creating div element
        var div = document.createElement("div");
        div.appendChild(input);
        div.appendChild(list).appendChild(a);
        div.classList.add("container-div");

        //Appending div to fragment
        fragment.appendChild(div);

        //Appending fragment to unordered list
        document.getElementById("unordered-list").appendChild(fragment);

        document.getElementById("todo").value = '';
        document.getElementById("todo").placeholder = "Type here...";

        var arrayItem = new Item(itemId, itemDescription);

        arrayOfItem.push(arrayItem);



    }

}


function deleteItems(event) {

    var confirmDelete = confirm("Are you sure to delete Item? ");
    if (confirmDelete == true) {
        var id = event.target.id;
        var getId = (id.split("-"));
        var element = document.getElementById(getId[1]).parentNode;
        console.log(element);
        element.parentNode.removeChild(element);

        for (var i = 0; i < arrayOfItem.length; i++) {

            if (arrayOfItem[i].itemId == getId[1]) {
                arrayOfItem.splice(i, 1);
            }
        }



    }
}

function check(event) {

    console.log("hello");
    console.log(event.target.tagName);
    var input = event.target;
    console.log(input.parentNode.childNodes[1].classList.toggle("strike"));

}




function retrieveList() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            json = this.response;
            jsonParse = JSON.parse(json);
            for (var i = 0; i < jsonParse.length; i++) {
                var getItemId = jsonParse[i].id;
                var getItemTitle = jsonParse[i].title;

                var arrayItem = new Item(getItemId, getItemTitle);
                arrayOfItem.push(arrayItem);

                addToList(getItemId,getItemTitle);
            }


        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhttp.send();
}