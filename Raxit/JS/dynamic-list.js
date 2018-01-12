    var countryList = document.getElementsByClassName("list");
function myFunction() {
    var countryName = document.getElementById("country");
    var errorMessage = document.getElementsByClassName("error-message");
    var countryNameValue = countryName.value.trim();
    if(countryNameValue.length == 0) {
        errorMessage[0].innerHTML = "Please enter the country name";
        countryName.value="";
    }
    else {
        errorMessage[0].innerHTML = "";
        var division = document.createElement("div");
        var listItem = document.createElement("li");
        var removeButton = document.createElement("button");
        var uncheckButton = document.createElement("button");
        listItem.appendChild(document.createTextNode(countryNameValue));
        removeButton.appendChild(document.createTextNode("X"));
        removeButton.classList.add('remove-buttons-style');
        removeButton.setAttribute('id',"remove-" + countryNameValue);
        uncheckButton.appendChild(document.createTextNode("C"));
        uncheckButton.classList.add('uncheck-buttons-style');
        uncheckButton.setAttribute('id', 'uncheck-' + countryNameValue);
        division.appendChild(removeButton);
        division.appendChild(uncheckButton);
        division.appendChild(listItem);
        division.classList.add('dimensions');
        division.classList.add('flex-column');
        countryList[0].appendChild(division);
        countryName.value = "";
    }
}

function list(event) {
    var id = event.target.id;
    var getId = (id.split("-"));
    if(getId[0] == "uncheck") {
        var listItem = document.getElementById(event.target.id);
        if(listItem.parentNode.lastChild.classList.contains('uncheck')){
            listItem.parentNode.lastChild.classList.remove('uncheck');
        } else {
            console.log('Uncheck');
            listItem.parentNode.lastChild.classList.add('uncheck');
        }
    } else if(getId[0] == "remove") {
        console.log("Remove");
        var listItem = document.getElementById(event.target.id);
        var returnValue = confirm("Do you want to delete " + event.target.id + "?");
        if(returnValue == true) {
            listItem.parentNode.parentNode.removeChild(listItem.parentNode);
        }
    }
}
