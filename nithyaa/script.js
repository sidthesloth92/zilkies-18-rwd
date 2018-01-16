var dataItems = [];

var dataHandler = (function () {
    var lastId, itemObjectLength;
    var item = function (id, itemName) {
        this.id = id;
        this.itemName = itemName;
    };

    return {
        addItemToList: function (input) {
            var lastId, ID, itemObjectLength;
            //obtain the length of the itemObject array
            itemObjectLength = dataItems.length;
          //  console.log("length is" + itemObjectLength);
            //console.log(itemObjectLength - 1);
            if (itemObjectLength - 1 > 0) {
                //increment the id value of last element
                lastId = (itemObjectLength - 1).id;
                console.log("lastId" + lastId);
                ID = lastId + 1;
                console.log("new Id" + ID);
            } else {
                //set the id value as 0
                ID = 0;
            }
            //create a new object and push it to the itemObject array
            itemList = new item(ID, input);
            dataItems.push(itemList);
            return itemList;
        },
        getItemsDeleted: function (id) {
            // console.log(typeof(delegation_id));
            var IDList, index, current;
            /*  IDList= dataItems.allItems.itemObject.map(function(current){
                  return current.id;
              });
              console.log("current id"+current.id);
              */
            IDList = dataItems;
            for (i = 0; i < IDList.length; i++) {
                if (IDList[i].id === id) {
                    index = IDList[i].indexOf(IDList[i].id);
                }
            }

            // console.log(typeof(IDList));
            console.log("list of id" + IDList);
            //  index=IDList.indexOf(delegation_id);
            console.log("index to be deleted is" + index);
            //console.log(parseInt(index));
            if (index !== -1) {
                dataItems.splice(index, 1);
                console.log("array  after deleting");
                console.log(dataItems);
            }

        }

    }
})();



var UIHandler = (function () {

    var DOMStrings = {
        submit_btn: '.submit-btn',
        input_data: '.input-box',
        task_list: '#task-list',
        fetch_btn: '.fetch-btn'
    }


    return {
        getDOMStrings: function () {
            return DOMStrings;
        },
        fetch_input: function () {
            input = document.querySelector(DOMStrings.input_data);
            input_data = input.value;
            if (input_data == "") {
                input.classList.add('input-alert');
            }
            return input_data;
        },
        addItemToListinUI: function (itemList) {
            //console.log(itemList.id);
            //console.log(itemList.itemName);
            var li = document.createElement('li');
            var span = document.createElement('span');
            var checkButton = document.createElement('button');
            var deleteButton = document.createElement('button');
            var breaktag = document.createElement('br');
            span.textContent = itemList.itemName;
            checkButton.textContent = "check";
            deleteButton.textContent = "delete";
            checkButton.classList.add('check-box');
            deleteButton.classList.add('check-box');
            li.appendChild(span);
            li.appendChild(checkButton);
            li.appendChild(deleteButton);
            li.appendChild(breaktag);
            var fragment = document.createDocumentFragment();
            fragment.appendChild(li);
            li.dataset.id = itemList.id;
            document.querySelector(DOMStrings.task_list).insertAdjacentElement('beforeend', li);
        },
        clearInputField: function () {
            document.querySelector(DOMStrings.input_data).value = "";
            document.querySelector(DOMStrings.input_data).focus();

        },
        getChecked: function (listItem) {
            //  console.log(event.target.textContent);
            // console.log(listItem.childNodes[0]);
            listItem.childNodes[0].classList.toggle('checkfunction');
        },
        getItemsDeleted: function (listItem, delegation_id) {
            var removalNode = document.querySelector("li[data-id='" + delegation_id + "']");
            // console.log(removalNode);
            removalNode.parentNode.removeChild(removalNode);
        }
    }
})();


var controller = (function () {
    var DOM, submit_btn;

    var setUpEventListeners = function () {
        DOM = UIHandler.getDOMStrings();
        document.querySelector(DOM.submit_btn).addEventListener('click', addItems);
        document.querySelector(DOM.task_list).addEventListener('click', deleteItems);
        document.querySelector(DOM.fetch_btn).addEventListener('click', fetchItems);
    };

    var deleteItems = function (event) {
        var delegation_id = event.target.parentNode.dataset.id;
        var listItem = document.querySelector("li[data-id='" + delegation_id + "']");
        //  console.log("li[data-id='" + delegation_id + "']");
        console.log(listItem);
        console.log(delegation_id);
        if (event.target.textContent == "check") {
            UIHandler.getChecked(listItem);
        } else if (event.target.textContent == "delete") {
            // console.log("---------");
            //console.log(delegation_id);
            var checkResult=confirm("Do you want to delete this item?");
        if(checkResult){
            dataHandler.getItemsDeleted(delegation_id);
            UIHandler.getItemsDeleted(listItem, delegation_id);
        }
    }
    };

    var fetchItems = function () {
        document.querySelector(DOM.fetch_btn).style.display = "none";
        var i, request;
        //  console.log("fetch");
        request = new XMLHttpRequest();
        request.open("GET", "https://jsonplaceholder.typicode.com/posts");
        request.onload = function () {
            // console.log("enter");
            //  if(request.readyState==request.DONE &&request.status ==200){
            //    if(request.responseText){
            var data = JSON.parse(request.responseText);
            for (i = 0; i < data.length; i++) {
                var itemList = dataHandler.addItemToList(data[i].title);
                UIHandler.addItemToListinUI(itemList);
            }
        }
        request.send();
    }

    var addItems = function () {
        //obtain the value from textBox
        var input = UIHandler.fetch_input();
        //console.log(input);
        if (input !== "") {
            //adds item to the itemobject
            var itemList = dataHandler.addItemToList(input);
            // console.log(itemList);
            //add items to UI
            UIHandler.addItemToListinUI(itemList);
        }
        //clear input field
        UIHandler.clearInputField();

    };

    return {
        init: function () {
            console.log("Application Started");

            setUpEventListeners();
        }
    }
})();

controller.init();