var jsonDataList = document.getElementsByClassName("jsonDataList");
var userListObject = {};
var id;

//For getting uniqueID for each user.
var uniqueID = (function() {
    var id = 0;
    return function() {
        return ++id;
    };
})();

//Constructor for initializing the object.
function UserManager(userName, email, website) {
    this.userName = userName;
    this.email = email;
    this.website = website;
}

//onClick() listener for loading the script used for 
//fetching data from external JSON URL.
function loadData() {
    var script = document.createElement('script');
    script.src = 'https://jsonplaceholder.typicode.com/users?callback=insertReply';
    document.body.appendChild(script);
}

//Callback function for adding elements in the unordered list.
function insertReply(content) {
    var totalLines = document.getElementById("totalLines").value;
    var fragments = document.createDocumentFragment();
    //Validation for the input tesxt boxes.
    if(totalLines < 1 || totalLines > 10) {
        alert("Enter the value between 1 and 10");
        document.getElementById("totalLines").value = "";
    } else {
        for(var i = 0; i < totalLines; i++) {
            id = uniqueID();
            //Adding object to the global object.
            var userManager = new UserManager(content[i].name, content[i].email, content[i].website);
            userListObject["User-" + id] = userManager;
            //Making the unordered flex list
            var nameText = document.createElement("p");
            var emailText = document.createElement("p");
            var websiteText = document.createElement("p");
            var userListItem = document.createElement("li");
            var removeButton = document.createElement("button");
            var uncheckButton = document.createElement("button");
            nameText.appendChild(document.createTextNode("Name : " + content[i].name));
            emailText.appendChild(document.createTextNode("Email ID : " + content[i].email));
            websiteText.appendChild(document.createTextNode("Website Name : " + content[i].website));
            removeButton.classList.add('remove-buttons-style');
            uncheckButton.classList.add('uncheck-buttons-style');
            removeButton.appendChild(document.createTextNode("X"));
            removeButton.setAttribute('id',"remove-" + id);
            uncheckButton.appendChild(document.createTextNode("C"));
            uncheckButton.setAttribute('id', 'uncheck-' + id);
            userListItem.appendChild(removeButton);
            userListItem.appendChild(uncheckButton);
            userListItem.appendChild(nameText);
            userListItem.appendChild(emailText);
            userListItem.appendChild(websiteText);
            userListItem.classList.add('div-styling');
            fragments.appendChild(userListItem);
        }
        jsonDataList[0].appendChild(fragments);
    }
}

//onClick() listener for deleting and striking list items
//This function also deletes the object in the object array.
function userList(event) {
    var getId = (event.target.id.split("-"));
    var listItem = document.getElementById(event.target.id);
    var userObject = {};
    userObject = userListObject["User-" + getId[1]];
    if(getId[0] == "uncheck") {
        if(listItem.parentNode.classList.contains('uncheck')){
            listItem.parentNode.classList.remove('uncheck');
        } else {
            listItem.parentNode.classList.add('uncheck');
        }
    } else if(getId[0] == "remove") {
        if(confirm("Do you want to delete " + userObject.userName + "?") == true) {
            listItem.parentNode.parentNode.removeChild(listItem.parentNode);
            delete userListObject["User-" + getId[1]];
        }
    }
}
