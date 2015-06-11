
$(window).load(function() {
  // Handler for .load() called.

});
// This function gets cookie with a given name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/*
The functions below will create a header with csrftoken
*/

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$( "input[name^='quickedit']" ).click(function() {
      var btnSub = this.id;
      var todoId = btnSub.substring(9)
      $("#quickedit"+todoId).css('display', 'none');
      $("#quicksave"+todoId).css('display' , 'inline-block')
      $("#todoname"+todoId).prop("readonly" , false)
      $("#todopriority"+todoId).prop("readonly" , false)
      $("#todoname"+todoId).css({"border-color": "#84C8FA",
             "border-width":"1px",
             "border-style":"solid"}
      )
      $("#todopriority"+todoId).css({"border-color": "#84C8FA",
             "border-width":"1px",
             "border-style":"solid"}
      )
//      alert(todoPriority);
//      create_post(todoId,todoName, todoPriority);
});

$( "input[name^='quicksave']" ).click(function() {
      console.log("form submitted!")  // sanity check
      var btnSub = this.id;
      var todoId = btnSub.substring(9)
      var todoName = $("#todoname"+todoId).val()
      var todoPriority = $("#todopriority"+todoId).val()
//      alert(todoPriority);
      create_post(todoId,todoName, todoPriority);
      $("#todoname"+todoId).prop("readonly" , true)
      $("#todopriority"+todoId).prop("readonly" , true)
      $("#todoname"+todoId).css({"border-color": "#000000",
             "border-width":"0px",
             "border-style":"solid"}
      )
      $("#todopriority"+todoId).css({"border-color": "#000000",
             "border-width":"0px",
             "border-style":"solid"}
      )
      $("#quickedit"+todoId).css('display', 'inline-block');
      $("#quicksave"+todoId).css('display' , 'none')
});


// Submit post on submit
$('#post-form').on('submit', function(event){
    event.preventDefault();

});

// AJAX for posting
function create_post(todoId,todoName, todoPriority) {
    console.log("create post is working!") // sanity check
    console.log(todoId+ "  "+todoName+"  " +todoPriority)
     $.ajax({
        url : "create_post/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : { 'todoid' : todoId, 'todoname' : todoName , 'todopriority' : todoPriority},

        // handle a successful response
        success : function(json) {
            $('#todoname'+todoId).val(''); // remove the value from the input
            //            var returnedData = JSON.parse(json);
            $("#todoname"+todoId).val(json.todoname)
            $("#todopriority"+todoId).val(json.todopriority)
//            console.log(json.todoid); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};