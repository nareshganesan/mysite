
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

/* Quick edit start*/

$( "input[name^='quickedit']" ).click(function() {
      var btnSub = this.id;
      var todoId = btnSub.substring(9)
      $("#quickedit"+todoId).css('display', 'none');
      $("#quicksave"+todoId).css('display' , 'inline-block')
      $("#todoname"+todoId).prop("readonly" , false)
      $("#todopriority"+todoId).prop("readonly" , false)
      $("#todopriority"+todoId).css('display' , 'none')
      $("#priority_dropdown"+todoId).val($("#todopriority"+todoId).val())
      $("#priority_dropdown"+todoId).css('display', '');
      $("#todoname"+todoId).css({"border-color": "#84C8FA",
             "border-width":"1px",
             "border-style":"solid"}
      )
      $("#todopriority"+todoId).css({"border-color": "#84C8FA",
             "border-width":"1px",
             "border-style":"solid"}
      )
});

$( "input[name^='quicksave']" ).click(function() {
      var btnSub = this.id;
      var todoId = btnSub.substring(9)
      var todoName = $("#todoname"+todoId).val()
      var todoPriority = $("#priority_dropdown"+todoId).val()
      quickedit_todo(todoId,todoName, todoPriority);
      $("#todoname"+todoId).prop("readonly" , true)
      $("#todopriority"+todoId).prop("readonly" , true)
      $("#todopriority"+todoId).css('display' , '')
      $("#todopriority"+todoId).val($("#priority_dropdown"+todoId).val())
      $("#priority_dropdown"+todoId).css('display', 'none');
      $("#todoname"+todoId).css({"border-color": "#bbb",
             "border-width":"1px",
             "border-style":"solid"}
      )
      $("#todopriority"+todoId).css({"border-color": "#bbb",
             "border-width":"1px",
             "border-style":"solid"}
      )
      $("#quickedit"+todoId).css('display', 'inline-block');
      $("#quicksave"+todoId).css('display' , 'none')
});


// Todo Quick edit post on submit
$('#quickedit-todo-form').on('submit', function(event){
    event.preventDefault();

});

// AJAX for Todo Quick edit
function quickedit_todo(todoId,todoName, todoPriority) {
     $.ajax({
        url : "quickedit_todo/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoId,
        'todoname' : todoName ,
        'todopriority' : todoPriority
        },
        // handle a successful response
        success : function(json) {
            $("#todoname"+todoId).val(json.todoname)
            $("#todopriority"+todoId).val(json.todopriority)
            $("#priority_dropdown"+todoId+" option[value="+json.todopriority+"]").attr('selected','selected');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
        }
    });
}

/* Quick edit stop. */

/* Quick add start. */

$('#link-show-add').click( function() {
    showTodoElementsById(todo_features_header.ADDFEATURE);
    showTodoElementsById(todo_features_div.ADDFEATURE);
    $("#"+todo_features_header.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_div.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');

});

$('#todo_form').on('submit', function(event){
    event.preventDefault();

});

$( "#addTodoSubmit" ).click(function() {
    var todoname = $("#id_name").val()
    var tododescription = $("#id_description").val()
    var todopriority = $("#id_priority").val()
    $.ajax({
        url : "quickadd_todo/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoname' : todoname ,
        'todopriority' : todopriority,
        'tododescription' : tododescription
        },

        // handle a successful response
        success : function(json) {
            location.reload();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
        }
    });
});

/* Quick add end. */

/* Quick delete start. */

function showDeleteTodoDiv(todoname, todoid) {

    $("#deleteTodoName").html(todoname);
    $("#deleteTodoId").html(todoid);

    showTodoElementsById(todo_features_header.DELETEFEATURE);
    showTodoElementsById(todo_features_div.DELETEFEATURE);
    $("#"+todo_features_header.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_div.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
    $("#"+todo_features_div.ADDFEATURE).css('display', 'none');

}

function showDetailTodoDiv(todoname, todoid, showsearchdiv) {

    $("#detail-todo-id").html(todoid);
    $("#detail-todo-name").html(todoname);

    showTodoElementsById(todo_features_header.DETAILFEATURE);
    showTodoElementsById(todo_features_div.DETAILFEATURE);
    $("#"+todo_features_header.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_div.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
    $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
    $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_header.SEARCHFEATURE).css('display', 'none');
    $("#"+todo_features_div.SEARCHFEATURE).css('display', 'none');
    if(showsearchdiv == 'True') {
        $("#show-search-results").css('display', 'inline-block');
    }

    var todo_mark_as_completed_url = "quickdetail_todo/";
    console.log(todo_mark_as_completed_url);
    $.ajax({
        url : todo_mark_as_completed_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoid
        },

        // handle a successful response
        success : function(json) {
            $("#body-todo-detail-name").val(json.todoname)
            $("#body-todo-detail-priority option[value="+json.todopriority+"]").attr('selected','selected');
            $("#body-todo-detail-description").val(json.tododescription)
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("Quick Edit failed");
        }
    });

}

$( "#deleteTodoSubmit" ).click(function() {
    var todoid = $("#deleteTodoId").html()
    var todoname = $("#deleteTodoName").html()

   $.ajax({
        url : "quickdelete_todo/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoid ,
        'todoname' : todoname
        },

        // handle a successful response
        success : function(json) {
            location.reload();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("delete failed");
        }
    });
});

/* Quick delete end. */

/* Quick Detail update start */

    $( "#detailTodoUpdate" ).click(function() {
        var todoid = $("#detail-todo-id").html()
        var todoname = $("#body-todo-detail-name").val()
        var todopriority = $("#body-todo-detail-priority").val()
        var tododescription = $("#body-todo-detail-description").val()
        var todonotes = $("#body-todo-detail-notes").val()
        var todotags = $("#body-todo-detail-tags").val()
        var todoproject = $("#body-todo-detail-project").val()
        var todoemail = $("#body-todo-detail-email").val()
        var todophone = $("#body-todo-detail-phone").val()
        var todoaddress = $("#body-todo-detail-address").val()

        var edit_detail_url = "edit_todo/";
        $.ajax({
            url : edit_detail_url, // the endpoint
            type : "POST", // http method
            // data sent with the post request
            data : {
            'todoid' : todoid ,
            'todoname' : todoname,
            'todopriority' : todopriority,
            'tododescription' : tododescription,
            'todonotes' : todonotes,
            'todotags' : todotags,
            'todoproject' : todoproject,
            'todoemail' : todoemail,
            'todophone' : todophone,
            'todoaddress' : todoaddress
            },

            // handle a successful response
            success : function(json) {
                $("#body-todo-detail-name").val(json.todoname)
                $("#body-todo-detail-priority option[value="+json.todopriority+"]").attr('selected','selected');
                $("#body-todo-detail-description").val(json.tododescription)
                $("#body-todo-detail-notes").val(json.todonotes)
                $("#body-todo-detail-tags").val(json.todotags)
                $("#body-todo-detail-project").val(json.todoproject)
                $("#body-todo-detail-email").val(json.todoemail)
                $("#body-todo-detail-phone").val(json.todophone)
                $("#body-todo-detail-address").val(json.todoaddress)
                $("#detail-update-success").css('display', '');
                $("#detail-update-success").html("Todo has been updated!");
                $('#detail-update-success').delay(5000).fadeOut('slow');
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                console.log("Detail Update failed"); // another sanity check
                $('#error-results').html("Detail Update failed");
            }
        });
    });

/* Quick Detail update end */

/* Mark todo as Completed start  */

function markasCompleted(todoname, todoid) {

    var todo_mark_as_completed_url = "mark_as_completed/";
    $.ajax({
        url : todo_mark_as_completed_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoid
        },

        // handle a successful response
        success : function(json) {
            location.reload();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("Quick Edit failed");
        }
    });

}

/* Mark todo as Completed end. */


/* Todo Search Feature  start */

$('#search-box').keyup(function(e){
    var searchQuery = $(this).val();
    if(e.keyCode == 13)
    {

//      alert('Entered!!! ' + searchQuery);
    } else {

    }
});

$('#search-button').click(function(e){
    var searchQuery = $('#search-box').val();
//     alert('Search button clicked!!! ' + searchQuery);
    showTodoElementsById(todo_features_header.SEARCHFEATURE);
    showTodoElementsById(todo_features_div.SEARCHFEATURE);
    $("#"+todo_features_header.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_div.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
    $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
     todoSearch(searchQuery);

});

$('#show-search-results').click(function(e){
    showTodoElementsById(todo_features_header.SEARCHFEATURE);
    showTodoElementsById(todo_features_div.SEARCHFEATURE);
    $("#"+todo_features_header.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_div.LISTFEATURE).css('display', 'none');
    $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
    $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');
    $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
    $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
     todoSearch(searchQuery);

});

function todoSearch(Query) {
    var todo_search_url = "search/";
    $.ajax({
        url : todo_search_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'searchQuery' : Query
        },

        // handle a successful response
        success : function(json) {
            var resCount = json.length;
            for (var i =0; i < resCount; i ++ ) {
                resultelement = "<li><div class='rh'><h5 class='h'> ";
                anchor =   "<a href='#' onclick='showDetailTodoDiv(";
                anchorparam = '"' + json[i].name + '" , "'+ json[i].id + '")'+"'>";
                test = '"' + json[i].name + '" , "'+ json[i].id + '",'
                showSearchBackLink = '"True"' + ')'+"'>";
                anchortext = json[i].name + "</a> </h5> </div>";
                console.log(resultelement+anchor+test+showSearchBackLink+anchortext)
                resultheader = resultelement+anchor+test+showSearchBackLink+anchortext
                resultcontent = '<div class="rc"><h6 class="c">' + json[i].description + '</h6> </div> </li>'
                $( "#search-results" ).append( resultheader );
                $( "#search-results" ).append( resultcontent );
            }


        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("Search failed");
        }
    });

}

/* Todo Search Feature  end */

function showTodoElementsById(elementId) {
    $("#" + elementId).css('display', 'block');
}

$(document).ready(function() {

    showTodoElementsById(todo_features_header.LISTFEATURE);
    showTodoElementsById(todo_features_div.LISTFEATURE);

    $('#addTodoCancel').click( function() {
        showTodoElementsById(todo_features_header.LISTFEATURE);
        showTodoElementsById(todo_features_div.LISTFEATURE);
        $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
        $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');

    });

    $('#detailTodoCancel').click( function() {
        showTodoElementsById(todo_features_header.LISTFEATURE);
        showTodoElementsById(todo_features_div.LISTFEATURE);
        $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
        $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');

    });

    $('#deleteTodoCancel').click( function() {
        showTodoElementsById(todo_features_header.LISTFEATURE);
        showTodoElementsById(todo_features_div.LISTFEATURE);
        $("#"+todo_features_header.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_div.ADDFEATURE).css('display', 'none');
        $("#"+todo_features_header.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_div.DETAILFEATURE).css('display', 'none');
        $("#"+todo_features_header.DELETEFEATURE).css('display', 'none');
        $("#"+todo_features_div.DELETEFEATURE).css('display', 'none');

    });

});