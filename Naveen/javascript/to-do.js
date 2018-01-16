var window = window;
var document = window.document;
var localStorage = window.localStorage;
var allItems = ( function() {
    
    var jsonStructure = {'listItems':[],'noOfItemsChecked':0};
    
    var idMatch = undefined;
    
    function findId(obj) {
        return obj.id == idMatch;
    }
    return {
        addItem : function(newItem) {
            jsonStructure.listItems.push(newItem);
        },
        //idname
        retriveiD : function() {
            var length=jsonStructure.listItems.length;
            return length == 0 ? 1 : jsonStructure.listItems[length-1].id + 1;
        },
        
        updateStatus : function(id) {
            idMatch=id;
            var index=jsonStructure.listItems.findIndex(findId);
            jsonStructure.listItems[index].status = (jsonStructure.listItems[index].status==true)?false:true;
            if(jsonStructure.listItems[index].status) {
                jsonStructure.noOfItemsChecked++;
            }
            else {
                jsonStructure.noOfItemsChecked--;
            }
        },
        deleteItem : function(id) {
            idMatch = id;
            var index = jsonStructure.listItems.findIndex(findId);
            if(jsonStructure.listItems[index].status) {
                jsonStructure.noOfItemsChecked--;
            }
            jsonStructure.listItems.splice(index,1);
        },
        store : function() {
            localStorage.setItem('allItems',JSON.stringify(jsonStructure));
        }
    };
})();

function retrieveList() {
    var request = new window.XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4&&request.status == 200) {
            var json=JSON.parse(request.responseText);
            addList(json.length,json);   
        }
    };
    request.open('GET','https://jsonplaceholder.typicode.com/posts',true);
    request.send();
}

window.onload=function() {
    if(window.confirm('Do you want to import list items from https://jsonplaceholder.typicode.com/posts ?')) {
        retrieveList();
    }
};

function createListItem(id,desc) {
    this.id = id;
    this.desc = desc;
    this.status = false;
    
}

document.getElementById('add-list').addEventListener('click',addList);

function createList (work,id,status=false) {
    var newList = document.createElement('li');
    var listText = document.createElement('div');
    listText.classList.add('list-text'); 
    var deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.classList.add('list-button');
    var checkedButton=document.createElement('span');
    checkedButton.classList.add('checked-button');
    checkedButton.classList.add('list-button');
    listText.textContent=work;
    var currentListId='list-item-id-'+id;
    var currentCheckId='list-item-check-id-'+id;
    var currentDeleteId='list-item-delet-id-'+id;
    newList.setAttribute('id',currentListId);
    
    if(status) {
        listText.classList.add('line-through');
        checkedButton.textContent='uncheck';
    }
    else {
        checkedButton.textContent='check';
    }
    checkedButton.setAttribute('id',currentCheckId);
    deleteButton.setAttribute('id',currentDeleteId);
    deleteButton.textContent='delete';
    newList.appendChild(listText);
    newList.appendChild(checkedButton);
    newList.appendChild(deleteButton);
    return newList;
}

function addList(n,json=null)
{
    var element;
    var fragment;
    var work;
    var newItem;
    var id;
    var newList;
    if(n instanceof(Object)) {
        var textBox=document.getElementById('work');
        work=textBox.value;
        if(work.search(/[a-zA-Z]/)>=0) {
            textBox.classList.remove('error');
            textBox.value   ='';
            id=allItems.retriveiD();    
            newItem=new createListItem(id,work);
            allItems.addItem(newItem);
            element=document.getElementById('to-do');
            fragment=document.createDocumentFragment(); 
            newList=createList(work,id);
            fragment.appendChild(newList);
            element.insertBefore(fragment, element.childNodes[0]);
       
        }

        else {
            textBox.classList.add('error');
        }  
    }
    else {
        element=document.getElementById('to-do');
        fragment=document.createDocumentFragment();
        for(var i=0;i<n;i++) {
        
            id=allItems.retriveiD();
            work=(json[i] == undefined)?json.listItems[i].desc:json[i].title;
            var status=(json[i] == undefined)?json.listItems[i].status:false;
            newItem=new createListItem(id,work,status);
            allItems.addItem(newItem);
            newList=createList(work,id,status);
            fragment.appendChild(newList);
        }
        element.insertBefore(fragment, element.childNodes[0]);
    
    }
}

document.getElementById('to-do').addEventListener('click',function(event)
{   
    var target=event.srcElement;
    var targetName=target.className;
    var getId=target.id.substr(19,3);
    var list = document.querySelector('#list-item-id-'+getId);
    if(targetName.includes('checked-button'))
    {
        
        allItems.updateStatus(getId);
        target.innerHTML=='uncheck'?target.innerHTML='check':target.innerHTML='uncheck';
        list.firstChild.classList.toggle('line-through');
    }
    else if(targetName.includes('delete-button'))
    {
        var confirm=window.confirm('Are you sure you want to Delete this item');
        if(confirm)
        {
            allItems.deleteItem(getId);
            list.remove();
        }
    }
});

document.getElementById('retrieve-List').addEventListener('click',function() {
    var json=JSON.parse(localStorage.getItem('allItems'));
    var n=json.listItems.length;
    addList(n,json); 
});

document.getElementById('save-List').addEventListener('click',function() {
    allItems.store();
});