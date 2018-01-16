

 allItems=(function() {
    var structure='{"listItems":[],"noOfItemsChecked":0}';
    var jsonStructure=JSON.parse(structure);
    //console.log(jsonStructure.listItems.length);
    var idMatch=undefined;
    function findId(obj) {
        return obj.id==idMatch;
    }
    return {
        addItem :function(newItem) {
            jsonStructure.listItems.push(newItem);
        },
        retriveiD :function() {
            return jsonStructure.listItems.length==0?1:jsonStructure.listItems[jsonStructure.listItems.length-1].id+1;
        },
        updateStatus :function(id) {
            idMatch=id;
          //  console.log()
            jsonStructure.listItems[jsonStructure.listItems.findIndex(findId)].status=jsonStructure.listItems[jsonStructure.listItems.findIndex(findId)].status===true?false:true;
            if(jsonStructure.listItems[jsonStructure.listItems.findIndex(findId)].status) {
                jsonStructure.noOfItemsChecked++;
                console.log(jsonStructure.noOfItemsChecked);
            }
            else {
                jsonStructure.noOfItemsChecked--;
                console.log(jsonStructure.noOfItemsChecked);
            }
        },
        deleteItem :function(id) {
            if(jsonStructure.listItems[jsonStructure.listItems.findIndex(findId)].status) {
                jsonStructure.noOfItemsChecked--;
            }
            jsonStructure.listItems.splice(jsonStructure.listItems.findIndex(findId),1);
          //    console.log(jsonStructure.listItems.length);
        }
    };
})();

window.onload=function() {

    //console.log(allItems.retriveiD());
   if(window.confirm("Do you want to import list items from https://jsonplaceholder.typicode.com/posts ?")) {
    var request=new XMLHttpRequest();
    request.onreadystatechange=function() {
        if(request.readyState==4&&request.status==200) {
           var json=JSON.parse(request.responseText);
           addList(10,json);   
        }
    }
    request.open("GET","https://jsonplaceholder.typicode.com/posts",true);
    request.send();
    console.log(request);
    }
}
function createListItem(id,desc) {
    this.id=id;
    this.desc=desc;
    this.status=false;
    
}

document.getElementById('addlist').addEventListener('click',addList);

function createList (work,id) {
    var newList=document.createElement('li');
    var listText=document.createElement('div');
    listText.classList.add('listText');
    var deleteButton=document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.classList.add('listButton');
    var checkedButton=document.createElement('span');
    checkedButton.classList.add('checked-button');
    checkedButton.classList.add('listButton');
    listText.textContent=work;
    newList.setAttribute("id",id);
    checkedButton.textContent="check";
    deleteButton.textContent="delete";
    newList.appendChild(listText);
    newList.appendChild(checkedButton);
    newList.appendChild(deleteButton);
    return newList;
}
function addList(n,json=null)
{
    if(n instanceof(Object)) {
    var textBox=document.getElementById('work');
    var work=textBox.value;
    if(work.search(/[a-zA-Z]/)>=0) {
        textBox.classList.remove('error');
        textBox.value   ="";
    var id=allItems.retriveiD();    
    var newItem=new createListItem(id,work);
    allItems.addItem(newItem);
    var element=document.getElementById("to-do");
    var fragment=document.createDocumentFragment(); 
    var newList=createList(work,id);
    fragment.appendChild(newList);
    element.appendChild(fragment);
       
    }

    else {
      //  console.log("Invalid input");
        textBox.classList.add('error');
    }  
}
else {
    for(var i=0;i<19;i++) {
        var element=document.getElementById("to-do");
        var fragment=document.createDocumentFragment();
        for(var j=0;j<10;j++) {
            var id=allItems.retriveiD();
            allItems.addItem(json[(i*5)+j]);
           console.log(json[(i*5)+j].title);
           var newList=new createList(json[(i*5)+j].title,id);
            fragment.appendChild(newList);
        }
        element.appendChild(fragment);
    }
}
}

document.getElementById('to-do').addEventListener('click',function(event)
{   
    var target=event.srcElement;
    var targetName=target.className;
    if(targetName.includes("checked-button"))
    {
        console.log(target.parentElement.id);
        allItems.updateStatus(target.parentElement.id);
    target.innerHTML=="uncheck"?target.innerHTML="check":target.innerHTML="uncheck";
    target.parentElement.classList.toggle("line-through");
    target.parentElement.firstChild.classList.toggle("line-through");
    }
    else if(targetName.includes("delete-button"))
    {
        var confirm=window.confirm("Are you sure you want to Delete this item");
        if(confirm)
        {
            allItems.deleteItem(target.parentElement.id);
        var unorderedList=target.parentElement.parentElement;
        unorderedList.removeChild(target.parentElement);
        }
    }
});