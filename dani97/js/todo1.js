function loadJSON(){
    var data_file = 'https://jsonplaceholder.typicode.com/posts';
    var http_request = new XMLHttpRequest();
    try{
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            http_request = new ActiveXObject('Msxml2.XMLHTTP');
					
        }catch (e) {
				
            try{
                http_request = new ActiveXObject('Microsoft.XMLHTTP');
            }catch (e){
                // Something went wrong
                alert('Your browser broke!');
                return false;
            }
					
        }
    }
			
    http_request.onreadystatechange = function(){
			
        if (http_request.readyState == 4  ){
            // Javascript function JSON.parse to parse JSON data
            var postContainer = document.getElementsByClassName('post-container')[0];
            var fragment = document.createDocumentFragment();
            var postArray = JSON.parse(http_request.responseText);
            for(i=0;i<postArray.length;i++){
                var post = postArray[i];
            }
            postContainer.appendChild(fragment);
            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
                  
        }
    };
			
    http_request.open('GET', data_file, true);
    http_request.send();
}


 