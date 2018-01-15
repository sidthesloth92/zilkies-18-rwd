var id = 0;
var arrayOfItem = [];

var Item = function (itemId, itemDescription) {

    this.itemId = itemId;
    this.itemDescription = itemDescription;

}

function addToList() {
    var x = document.getElementById("todo").value;
    id = id + 1;


    if (x == "") {
        alert("Enter Valid Text");
        document.getElementById("todo").classList.add("todo-error");

    } else {
        document.getElementById("todo").classList.remove("todo-error");

        var fragment = document.createDocumentFragment();

        var list = document.createElement("LI");
        var text = document.createTextNode(x);




        var a = document.createElement("a");
        a.classList.add("button");
        a.setAttribute("href", "#");



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
        // var xyz = document.getElementById("unordered-list").appendChild(list).appendChild(a);

        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.addEventListener('click', function () {
            check(event);
        });

        var div = document.createElement("div");
        div.appendChild(input);
        div.appendChild(list).appendChild(a);
        div.classList.add("container-div");

        fragment.appendChild(div);

        var xyz = document.getElementById("unordered-list").appendChild(fragment);

        document.getElementById("todo").value = '';
        document.getElementById("todo").placeholder = "Type here...";

        var arrayItem = new Item(id, x);

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
            console.log(arrayOfItem[i].itemId + " " + getId[1]);
            if (arrayOfItem[i].id == getId[1]) {
                arrayOfItem.splice(i, 1);
            }
        }



    }
}

function check(event) {
    // alert("target");
    console.log("hello");
    console.log(event.target.tagName);
    var input = event.target;
    console.log(input.parentNode.childNodes[1].classList.toggle("strike"));
    // alert(event.target.toString());
}


//Event Listeners