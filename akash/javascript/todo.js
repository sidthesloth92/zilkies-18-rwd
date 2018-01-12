function addToList() {
    var x = document.getElementById("todo").value;

    var id = document.getElementById("unordered-list").childNodes.length-1;
    
    if(x == ""){
            alert("Enter Valid Text");
    }
    else{
    var list = document.createElement("LI");
    var text = document.createTextNode(x);


   

     var a = document.createElement("a");
      a.classList.add("button");
      a.setAttribute("href","#"); 


      
      var i = document.createElement("i");
      i.classList.add("fa");
      i.classList.add("fa-times-circle");
      i.setAttribute("id","close-"+id);
      a.appendChild(i);

     

      list.setAttribute("id",id);

    list.appendChild(text);
    document.getElementById("unordered-list").appendChild(list).appendChild(a);

    



    document.getElementById("todo").value = '';
    document.getElementById("todo").placeholder ="Type here...";
     
    
    }

}


function list(event){

   // alert("hello");
  var id = event.target.id;
 var getId = (id.split("-"));
 var element = document.getElementById(getId[1]);
 console.log(element);
 element.parentNode.removeChild(element);
}
