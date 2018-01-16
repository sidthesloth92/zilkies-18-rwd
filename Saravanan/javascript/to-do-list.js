var id = 0;
var isDataFetched = false;
var listItems = {
    json : [],
    //change all the variable names
    deleteListItem : function ( position ) {
        this.json.splice((position-1), 1);
    },
    updateStatusOfListItem : function ( position ) {//change to as single method
        var statusOfItem=this.json[( position - 1 )].done;
        if(statusOfItem == 'true') {
            this.json[( position - 1 )].done = 'false';
        }
        else {
            this.json[( position - 1 )].done = 'true';
        }
    }
};

function ListItemCLass ( title ){
    this.id = id;
    this.title = title;
    this.done = 'false';
    id++;
}

var ulListAllItems = document.getElementById( 'to-do-list-items' );
var fragment = document.createDocumentFragment();

function addDocumentFragment ( id, input ){
    var listItemLiElement = document.createElement( 'li' );
    var spanListItem = document.createElement( 'span' );
    spanListItem.classList.add( 'list-item-description' );
    spanListItem.innerHTML = input;
    listItemLiElement.appendChild( spanListItem );
    listItemLiElement.dataset.id = id;
    var buttonDelete=document.createElement( 'button' );
    buttonDelete.innerHTML= 'Delete' ;
    buttonDelete.classList.add( 'list-item-delete' );
    var buttonCheck=document.createElement( 'button' );
    buttonCheck.innerHTML = 'Check';
    buttonCheck.classList.add( 'list-item-check' );
    listItemLiElement.appendChild( buttonDelete );
    listItemLiElement.appendChild( buttonCheck );
    fragment.appendChild( listItemLiElement );
}

function addJsonToList( jsonOnload ) {
    for(var i=0; i < jsonOnload.length ; i++ ){
    //listItems.addListItem(jsonOnload[i].title);
        listItems.json.push(new ListItemCLass(jsonOnload[i].title));
        addDocumentFragment(jsonOnload[i].id,jsonOnload[i].title);
    }
}

document.getElementById('fetch-list-items').addEventListener('click', fetchToDoList);

function fetchToDoList () {
    if(isDataFetched==false) {
        var xhttp =new XMLHttpRequest();
        xhttp .onreadystatechange=function() {
            if(this.readyState == 4 && this.status == 200) {
                jsonOnload=this.responseText;
                jsonOnload=JSON.parse(jsonOnload);
                addJsonToList(jsonOnload);
                ulListAllItems.appendChild(fragment);
            }
        };
        xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
        xhttp.send();
        isDataFetched = true;
    }
    else {
        alert('You cannot fetch again');
    }
}

document.getElementById('to-do-list-items').addEventListener('click', function (event) {
    var targetId=event.srcElement.parentNode.dataset.id;
    var target=event.srcElement;
    var list = document.querySelector("li[data-id='"+targetId+"']");
    var parentUl = list.parentElement;
    if(target.innerHTML == 'Delete') {
        var choice=confirm('Do you want to delete?');
        if(choice == true) {
            parentUl.removeChild(list);
            listItems.deleteListItem(targetId);
        }
    }
    else if(target.innerHTML == 'Check') {
        list.childNodes[0].classList.add('strike');
        target.innerHTML = 'Uncheck';
        listItems.updateStatusOfListItem(targetId);
    }
    else if(target.innerHTML == 'Uncheck') {
        list.childNodes[0].classList.remove('strike');
        target.innerHTML = 'Check';
        listItems.updateStatusOfListItem(targetId);
    }
});

document.getElementById('add-list-items').addEventListener('click', function(){
    var inputElement = document.getElementById('user-input-list-item');
    var userInput = inputElement.value;
    userInput=userInput.trim();
    if(userInput.length == 0) {
        inputElement.classList.remove('none-border');
        inputElement.classList.add('red-border');
    }
    else {
        inputElement.classList.remove('red-border');
        inputElement.classList.add('none-border');
        id=listItems.json.length;
        listItems.json.push(new ListItemCLass(userInput));
        addDocumentFragment(id, userInput);
        ulListAllItems.appendChild(fragment);
        inputElement.value = '';
    }
});
