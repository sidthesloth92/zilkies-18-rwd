window.onload=function() {

 
}
document.getElementById('to-do').addEventListener('click',function(event)
{   
    var target=event.srcElement;
    var targetName=target.className;
    if(targetName.includes("checked-button"))
    {
    target.innerHTML=="uncheck"?target.innerHTML="check":target.innerHTML="uncheck";
    target.parentElement.classList.toggle("line-through");
    }
    else if(targetName.includes("delete-button"))
    {
        var confirm=window.confirm("Are you sure you want to Delete this item");
        if(confirm)
        {
        var unorderedList=target.parentElement.parentElement;
        unorderedList.removeChild(target.parentElement);
        }
    }
});
document.getElementById('addlist').addEventListener('click',addlist);
function addlist()
{
    var textBox=document.getElementById('work');
    var work=textBox.value;
    if(work.length<5) {
        console.log('damn');
        textBox.classList.add('error');
    }

    else {
        textBox.classList.remove('error');
        textBox.textContent="";
    var element=document.getElementById("to-do");
    var fragment=document.createDocumentFragment(); 
    var newList=document.createElement('li');
    var deleteButton=document.createElement('span');
    deleteButton.classList.add('delete-button');
    var checkedButton=document.createElement('span');
    checkedButton.classList.add('checked-button');
    newList.textContent=work;
    checkedButton.textContent="check";
    deleteButton.textContent="delete";
    newList.appendChild(checkedButton);
    newList.appendChild(deleteButton);
    fragment.appendChild(newList);
    element.appendChild(fragment);
    }  
}