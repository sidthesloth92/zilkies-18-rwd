window.onload=function() {

 
}

function addlist()
{
    console.log("hello");
    var work=document.getElementById('work').value;
    console.log(work);
    var element=document.getElementById("to-do");
    var fragment=document.createDocumentFragment(); 
    var newList=document.createElement('li');
    var closeButton=document.createElement('button');
    newList.textContent=work;
    newList.appendChild(closeButton);
    fragment.appendChild(newList);
    element.appendChild(fragment);
      
}
document.getElementById('addlist').addEventListener('click',addlist);