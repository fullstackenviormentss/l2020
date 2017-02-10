$(document).ready(function(){

	// The module pattern
  var feature = (function() {
   
    // Private variables and functions
    var privateThing = "secret";
    var publicThing = "not secret";
 
    var delayRedirect = function() {
        triggerBuild()
        timeoutID = window.setTimeout(redirect, 5000);
    };

    var triggerBuild = function(){
      var url = "https://api.netlify.com/build_hooks/589ddcd471e20a4faf0c8c57"
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      xhr.send({});
    }
 
    var redirect = function() {
        window.location.replace("http://stackoverflow.com");
    };
 
    // Public API
    return {
        delayRedirect: delayRedirect
    };
  })();
   
  feature.delayRedirect();
})