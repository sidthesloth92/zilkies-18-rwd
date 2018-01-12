function buttonClick() {
    var input = document.getElementById("text-input");
    var list = document.createElement("LI");
    var textNode = document.createTextNode(input.value);
    var unorder = document.getElementById("unordered-list");
    var childCount = unorder.childElementCount + 1;
    var pattern = "^\\s+$";
    list.appendChild(textNode);
    list.setAttribute("id", childCount);
    if (input.value == '' || input.value == null || input.value.match(pattern)) {
        document.getElementById("text-input").style.borderColor = "red";
        alert("You must write something!");
        document.getElementById("text-input").style.borderColor = "gray";

    } else {
        unorder.appendChild(list);
    }
    document.getElementById("text-input").value = "";
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.classList.add("delete");
    deleteButton.style.flex = "1";
    deleteButton.setAttribute("id", "close" + childCount);
    list.appendChild(deleteButton);
    var strikeButton = document.createElement("button");
    strikeButton.innerText = "Strike";
    strikeButton.classList.add("strike");
    strikeButton.setAttribute("id", "strike" + childCount);
    list.appendChild(strikeButton);
}

function deleteElement(event) {
    var eventClass = event.target.className;
    var eventName = event.target.id;
    if (eventClass == "delete") {

        var idSplit = eventName.split("-");
        var listItem = document.getElementById(idSplit);
        var unorder = document.getElementById("unordered-list");
        var confirmDelete = confirm("want to delete?");
        if (confirmDelete == true)
            unorder.removeChild(listItem.parentNode);
    }
    else {
        var idSplit = eventName.split("-");
        var listItem = document.getElementById(idSplit);
        var unorder = document.getElementById("unordered-list");
        listItem.parentNode.style.textDecoration = "line-through";
    }
}
