
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
function quickedit_todo(todoId,todoName, todoPriority, todoreminder_date) {
     $.ajax({
        url : "quickedit_todo/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoId,
        'todoname' : todoName ,
        'todopriority' : todoPriority,
        'todoreminderdate' : todoreminder_date
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
    showTodoFeature(FEATURELIST.ADDFEATURE);
    $("#tabs-todo-types").css("display", "none");
});

/*$('#form-add-todo').on('submit', function(event){
    event.preventDefault();
});*/

$( "#addTodoSubmit" ).click(function() {
    var todoname = $("#id_name").val()
    if(!todoname) {
        $("#id_name").parent().find(".field-required").css('display', '');
        return;
    } else {
         $("#id_name").parent().find(".field-required").css('display', 'none');
    }
    var tododescription = $("#id_description").val()
    var todopriority = $("#id_priority").val()
    var todonotes = $("#id_notes").val()
    var todotags = $("#id_tags").val()
    var todoproject = $("#id_project").val()
    var todoemail = $("#id_email").val()
    var todophonenumber = $("#id_phone_number").val()
    var todoaddress = $("#id_address").val()
    $.ajax({
        url : "add_todo/", // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoname' : todoname ,
        'todopriority' : todopriority,
        'tododescription' : tododescription,
        'todonotes' : todonotes ,
        'todotags' : todotags,
        'todoproject' : todoproject,
        'todoemail' : todoemail ,
        'todophonenumber' : todophonenumber,
        'todoaddress' : todoaddress
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

function showDeleteTodoDiv( todoid, todotype) {

    var todoname = $("#ctodoname"+todoid).html();
    console.log(todoname);
    $("#deleteTodoName").html(todoname);
    $("#deleteTodoId").html(todoid);
    showTodoFeature(FEATURELIST.DELETEFEATURE);
    hideTodoElementsById("tabs-todo-types");

}



function showDetailTodoDiv( todoid, showsearchdivlink) {

//    showTodoElementsById("tabs-todo-types");
    showTodoFeature(FEATURELIST.DETAILFEATURE);
    hideTodoElementsById("div-search-results-container");
    if(showsearchdivlink == 'True') {
        $("#show-search-results").css('display', 'inline-block');
    }

    var todo_mark_as_completed_url = "quickdetail_todo/";
    $.ajax({
        url : todo_mark_as_completed_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        'todoid' : todoid
        },

        // handle a successful response
        success : function(json) {
            $("#detail-todo-id").html(todoid);
            $("#body-todo-detail-name").val(json.todoname);
            $("#body-todo-detail-priority option[value="+json.todopriority+"]").prop('selected',true);
            $("#body-todo-detail-description").val(json.tododescription);
            $("#body-todo-detail-notes").val(json.todonotes);
            $("#body-todo-detail-tags").val(json.todotags);
            $("#body-todo-detail-project").val(json.todoproject);
            $("#body-todo-detail-email").val(json.todoemail);
            $("#body-todo-detail-phone").val(json.todophone_number);
            $("#body-todo-detail-address").val(json.todoaddress);
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

$( "#deletecTodoSubmit" ).click(function() {
    var todoid = $("#deletectodoid").html()
    var todoname = $("#deletecTodoName").html()

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
        if(!todoname) {
            $("#body-todo-detail-name").parent().find(".field-required").css('display', '');
            return;
        } else {
             $("#body-todo-detail-name").parent().find(".field-required").css('display', 'none');
        }
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

$('#input-search-box').keyup(function(e){
    var searchQuery = $(this).val();
    if((e.keyCode == 13) || (e.which == 13)){
        if(searchQuery.length >=3) {
            showTodoElementsById("div-search-results-container");
            hideTodoElementsById("div-feature-report");
            hideTodoElementsById("tabs-todo-types");
            hideTodoElementsById("div-feature-detail");
            hideTodoElementsById("div-feature-add");
        todoSearch(searchQuery);
        }
    } else {
        if(searchQuery.length >=3) {
            showTodoElementsById("div-search-results-container");
            hideTodoElementsById("div-feature-report");
            hideTodoElementsById("tabs-todo-types");
            hideTodoElementsById("div-feature-detail");
            hideTodoElementsById("div-feature-add");
        todoSearch(searchQuery);
        }
    }
});
$('#search-button').click(function(e){
    var searchQuery = $(this).val();
    if(searchQuery.length >=3) {
        showTodoElementsById("div-search-results-container");
        hideTodoElementsById("div-feature-report");
        hideTodoElementsById("tabs-todo-types");
        hideTodoElementsById("div-feature-detail");
        todoSearch(searchQuery);
    }
});

$('#input-search-box').click(function(e){
    var searchQuery = $('#input-search-box').val();
    if(searchQuery.length >= 3) {
        showTodoElementsById("div-search-results-container");
        hideTodoElementsById("div-feature-report");
        hideTodoElementsById("tabs-todo-types");
        hideTodoElementsById("div-feature-detail");
        todoSearch(searchQuery);
    }

});

$('#show-search-results').click(function(e){
    var searchQuery = $('#input-search-box').val();
    showTodoElementsById("div-search-results-container");
    hideTodoElementsById("div-feature-report");
    hideTodoElementsById("tabs-todo-types");
    hideTodoElementsById("div-feature-detail");
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
            $( "#search-results" ).empty();
            if(json[0].id == "nodata") {
                resultelement = "<li><div class='rh'><h5 class='h'> ";
                anchor =   "<a href='#' >";
                anchortext = json[0].name + "</a> </h5> </div>";
                resultheader = resultelement+anchor+anchortext;
                resultcontent = '<div class="rc"><h6 class="c">' + json[0].description + '</h6> </div> </li>'
                $( "#search-results" ).append( resultheader );
                $( "#search-results" ).append( resultcontent );
            } else {
                for (var i =0; i < resCount; i ++ ) {
                    resultelement = "<li><div class='rh'><h5 class='h'> ";
                    anchor =   "<a href='#' onclick='showDetailTodoDiv(";
                    anchorparam = '"' + json[i].id + '",';
                    showSearchBackLink = '"True"' + ')'+"'>";
                    anchortext = json[i].name + "</a> </h5> </div>";
                    resultheader = resultelement+anchor+anchorparam+showSearchBackLink+anchortext;
                    resultcontent = '<div class="rc"><h6 class="c">' + json[i].description + '</h6> </div> </li>'
                    $( "#search-results" ).append( resultheader );
                    $( "#search-results" ).append( resultcontent );
                }
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

function hideTodoElementsById(elementId) {
    $("#" + elementId).css('display', 'none');
}

$(document).ready(function() {

    showTodoFeature(FEATURELIST.LISTFEATURE);

    $('#addTodoCancel').click( function() {
        showTodoFeature(FEATURELIST.LISTFEATURE);
        $("#tabs-todo-types").css("display","");
    });

    $('#detailTodoCancel').click( function() {
        showTodoFeature(FEATURELIST.LISTFEATURE);
        location.reload();
    });

    $('#deleteTodoCancel').click( function() {
        showTodoFeature(FEATURELIST.LISTFEATURE);
        showTodoElementsById("tabs-todo-types");
    });

    $('#deletecTodoCancel').click( function() {
        showCompletedTodoFeature(FEATURELIST.LISTFEATURE);
    });

    $(".drag-todo-item").each(function() {
        var today = new Date();
        var current_date = today.getDate();
        var current_month = today.getMonth();
        var current_year = today.getFullYear();

        var reminder_date_string = $(this).find(".todo-date").val().trim();

        var reminder_year = reminder_date_string.split("-")[2];
        var reminder_month = reminder_date_string.split("-")[1] - 1;
        var reminder_day = reminder_date_string.split("-")[0];

        var reminder_date = new Date(reminder_year, reminder_month, reminder_day);
        var days_left = "";
        if(reminder_date_string) {
            if(current_year == reminder_year) {
                if(current_month == reminder_month){
                    if(current_date == reminder_day) {
                        days_left = "Today";
                    } else {
                        if(reminder_day > current_date) {
                            days_left = "Days left "+ (reminder_day - current_date) ;
                        } else {
                            if ((current_date - reminder_day) == 7 ) {
                                days_left = "Week ago" ;
                            }
                            else if ((current_date - reminder_day) == 14 ) {
                                days_left = "2 Weeks ago" ;
                            }
                            else if ((current_date - reminder_day) == 21 ) {
                                days_left = "3 Weeks ago" ;
                            } else {
                                days_left = (current_date - reminder_day ) + " days ago" ;
                            }
                        }
                    }
                } else {
                    days_left = reminder_date - today;
                    days_left = Math.floor(days_left/1000/60/60/24);
                    days_left = "Days left "+ days_left;
                }
            } else {
                days_left = reminder_date - today;
                days_left = Math.floor(days_left/1000/60/60/24);
                days_left = "Days left "+ days_left;
            }
        } else {
            days_left = "";
        }
        $(this).find(".reminder-date").attr('title', days_left);
    });


});

/* Tabs UI script */

$("#ul-tab-todo-types a").click( function(e){
    $('#ul-tab-todo-types a:last').tab('show')
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var selectedTab = $(e.target).attr("href");
      if ((selectedTab == FEATURETABS.TODO)) {
        location.reload();
      }else if ((selectedTab == FEATURETABS.COMPLETEDTODO)){
        showCompletedTodoFeature(FEATURELIST.LISTFEATURE);
        hideTodoElementsById("div-feature-detail");
        ctodolist();
      } else {
         // Operation todo when other tabs load.
         showDeletedTodoFeature(FEATURELIST.LISTFEATURE);
         hideTodoElementsById("div-feature-detail");
         dtodolist();
      }
  });

  /* Completed Todo functions start */

function ctodolist() {
    var ctodolist_url = "completed_todo_list/";
    $.ajax({
        url : ctodolist_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        },

        // handle a successful response
        success : function(json) {
            $('#table-ctodo-list').empty();
            var resCount = json.length;
            if(resCount > 0){
                for (var i =0; i < resCount; i ++ ) {
                    var squareCheckedDiv = $("<div class='square-checked shadow'></div>");
                    var img = $("<img />");
                    img.attr('src', "../static/todo/images/tick-symbol.png");
                    img.css({
                        'width' : '12px',
                        'height' : '11px',
                        'margin-bottom' : '9px',
                        'padding' : '1px'
                    });
                    squareCheckedDiv.append(img);
                    var squareDiv = $("<div class='square shadow'></div>");
                    squareDiv.css('display', 'none');
                    var ctd = $("<td style='text-align: center;' > </td>");
                    ctd.append(squareCheckedDiv);
                    ctd.append(squareDiv);
                    var ctodoname = $("<td style='text-decoration: line-through' > </td>");
                    ctodoname.attr('id', "ctodoname"+json[i].id );
                    var cDivTodoName = $("<div style='text-align: left;' > </div>");
                    cDivTodoName.html(json[i].name);
                    var ctodoid = $("<input type=hidden class='todo-id' name='todo-id' />");
                    ctodoid.val(json[i].id);
                    ctodoname.append(cDivTodoName);
                    ctodoname.append(ctodoid);
                    var ctododeletelink = $("<a href='#' > </a>");
                    ctododeletelink.attr('onclick', "showDeleteTodoDiv('"+ json[i].id +"' , 'completedtodo')" );
                    ctododeletelink.html("delete");
                    var ctododelete = $("<td> </td>");
                    ctododelete.append(ctododeletelink);
                    var ctodo = $("<tr> </tr>");
                    ctodo.append(ctd);
                    ctodo.append(ctodoname);
                    ctodo.append(ctododelete);
                    $('#table-ctodo-list').append(ctodo);

                }
            }
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("No Completed Tasks");
        }
    });

}

$(document).on("click", "#table-ctodo-list .square-checked", function(event) {
    var parent_td = $(event.target).parent().parent();
    var parent_tr = $(event.target).parent().parent().parent();
    $(this).css('display', 'none');
    parent_td.find(".square").css('display', 'block');
    parent_tr.find("td[id^=ctodoname]").css("text-decoration", "");
    var todoid = parent_tr.find(".todo-id").val();
    console.log(parent_tr.find(".todo-id").val());
    var unmark_as_completed_url = "unmark_as_completed/";

    $.ajax({
        url : unmark_as_completed_url, // the endpoint
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
});


  /* Completed Todo functions end */

  /* Deleted Todo functions start */

function dtodolist() {
    var dtodolist_url = "deleted_todo_list/";
    $.ajax({
        url : dtodolist_url, // the endpoint
        type : "POST", // http method
        // data sent with the post request
        data : {
        },

        // handle a successful response
        success : function(json) {
            $('#table-dtodo-list').empty();
            var resCount = json.length;
            if(resCount > 0){
                for (var i =0; i < resCount; i ++ ) {
                    var ctodonameinput = "<input readonly type=\"text\" class=\"ctodoname\" id=\"ctodoname"+json[i].id +"\" value=\""+ json[i].name +"\" />";
                    var dtodoname = $("<td> </td>");
                    dtodoname.attr('id', "dtodoname"+json[i].id);
                    dtodoname.css('text-decoration', 'line-through');
                    dtodoname.html(json[i].name);
                    var dtodo = $("<tr> </tr>");
                    dtodo.append(dtodoname);
                    $('#table-dtodo-list').append(dtodo);

                }
            }
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#error-results').html("No Deleted Tasks");
        }
    });

}


  /* Deleted Todo functions end */


/* New Todo list Feature start   */

var updateIndex = function(e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);
        });
    };
var fixWidthHelper = function (e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
}
$(".table-todo-list-1 tbody").sortable({
    cursor: 'move',
    helper: fixWidthHelper,
    stop: updateIndex
}).disableSelection();

$( document ).on("mouseover", ".drag-todo-item",
  function() {
    var todo_name = $( this ).find( ".name-todo" ).text();
    $( this ).find(".glyphicon-list").css('display', 'inline');
    $( this ).find( ".end-span" ).css({
        'display': 'inline-block',
        'float': 'right',
        'margin-right': '-50px'
    });
    $( this ).find(".glyphicon-resize-vertical").css({
        'display': 'inline',
        'float' : 'left',
        'margin-left' : '-10px'
    });
    $( "span.glyphicon-list" ).hover(
        function() {
            $( this ).css({
                'cursor': 'pointer'
            });
        }
    );
    $( this ).find(".glyphicon-list").on('click',
        function(event) {
            event.stopPropagation();  // prevent overlapping element events from firing.
            var todonameContainer = $(event.target).parent();
            var todoid = todonameContainer.find( ".todo-id" ).val();
            showDetailTodoDiv(todoid, 'False');
        }
    );
  }
);

$(document).on("mouseleave", ".drag-todo-item", function(event) {
    $( this ).find(".glyphicon-list").css('display', 'none');
    $( this ).find(".end-span").css('display', 'none');
    $( this ).find(".glyphicon-resize-vertical").css('display', 'none');
});

$( document ).on( "click" , ".name-todo" ,
    function() {
        var parent_tr = $(this).parent();
        var todo_name_element = $(this).find(".list-todo-name");
        var todo_name_before_edit = todo_name_element.html();
        var todo_name_edit = parent_tr.find(".todonameedit");
        var temp_todo_name = "";
        parent_tr.children().hide();
        parent_tr.find(".list-todo-edit").css({
            'display' : ''
        });
        parent_tr.find(".div-todo-list-edit").css({
            'text-align' : 'left',
            'position': 'relative',
            'border-collapse': 'separate',
            'width' : '100%'

        });
        todo_name_edit.val(todo_name_element.html());
        temp_todo_name = todo_name_element.html();
        todo_name_edit.keydown(
            function() {
                temp_todo_name = $(this).val();
            }
        );
        todo_name_edit.keyup(
            function() {
                temp_todo_name = $(this).val();
            }
        );
        todo_name_edit.on('paste cut',
            function() {
                var _this = this;
                setTimeout( function() {
                    var paste_text = $(_this).val();
                    temp_todo_name = paste_text;
                }, 1);
            }
        );
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) { dd='0'+dd }
        if(mm<10) { mm='0'+mm }

        today = yyyy+'-'+mm+'-'+dd;

        var reminder_date_string = parent_tr.find(".todo-date").val();

        if(reminder_date_string) {
            reminder_date_string = reminder_date_string.trim();
            var reminder_year = reminder_date_string.split("-")[2];
            var reminder_month = reminder_date_string.split("-")[1] - 1;
            var reminder_day = reminder_date_string.split("-")[0];

            var reminder_date = new Date(reminder_year, reminder_month, reminder_day);
            parent_tr.find('.tododateedit').datetimepicker({
               defaultDate: reminder_date,
               format: "MM/DD/YY HH:mm",
               minuteStepping: 5
            });
        } else {
            parent_tr.find('.tododateedit').datetimepicker({
               format: "MM/DD/YY HH:mm",
               minuteStepping: 5

            });
        }
        var todo_priority = parent_tr.find(".todo-priority").val();
        var transform_val = 1.8;
        parent_tr.find(".priority-flag-"+todo_priority).css({
            'transform':'scale('+transform_val+')',
            '-webkit-transform':'scale('+transform_val+')',
            '-ms-transform':'scale('+transform_val+')',
            '-moz-transform':'scale('+transform_val+')',
            '-o-transform':'scale('+transform_val+')'
        });
    }
);

$( document ).on( "click" ,"input[name^='todonamesave']",
    function(event) {
        event.preventDefault();
        var parent_tr = $(event.target).parent().parent().parent();
        var todo_name_element = parent_tr.find(".list-todo-name");
        var todo_reminder_date = parent_tr.find(".reminder-date")
        var name = parent_tr.find(".todonameedit").val();
        var reminder_date = parent_tr.find(".tododateedit").val();
        var frmated_reminder_date = ""
        parent_tr.find(".list-todo-edit").css('display', 'none');
        parent_tr.find(".status").css('display', '');
        parent_tr.find(".status").find("glyphicon-resize-vertical").css('display', 'none');
        parent_tr.find(".name-todo").css('display', '');
        parent_tr.find(".list-todo-edit").css('display', 'none');
        if(reminder_date) {
            frmated_reminder_date = reminder_date;
        } else {
            frmated_reminder_date = "";
        }

        todo_name_element.html(name);
        todo_reminder_date.html(frmated_reminder_date);
        var todo_id = parent_tr.find(".todo-id").val();
        var todo_name = name;
        var todo_priority = parent_tr.find(".todo-priority").val();
        quickedit_todo(todo_id,todo_name, todo_priority, reminder_date);
    }
);

$( document ).on( "click" , "input[name^='todonamecancel']",
    function(event) {
        event.preventDefault();
        var parent_tr = $(event.target).parent().parent().parent();
        var todo_name_element = parent_tr.find(".list-todo-name");
        var todo_name_before_edit = todo_name_element.html();
        todo_name_element.html(todo_name_before_edit);
        parent_tr.find(".list-todo-edit").css('display', 'none');
        parent_tr.find(".status").css('display', '');
        parent_tr.find(".status").find("glyphicon-resize-vertical").css('display', 'none');
        parent_tr.find(".name-todo").css('display', '');
        parent_tr.find(".list-todo-edit").css('display', 'none');
    }
);

$("#a-todo-list-add").click(function() {
    $(".list-todo-new").css({
        'display': '',
    });
    $('html,body').animate({
       scrollTop: $(".div-todo-list-new").offset().top
    }, 2000);
    $(".div-todo-list-new").focus();
    $(".list-todo-new").find(".tododatenew").attr("placeholder","due by..");;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) { dd='0'+dd }
    if(mm<10) { mm='0'+mm }

    today = yyyy+'-'+mm+'-'+dd;
//    console.log(today);
    var reminder_date = new Date(yyyy, mm, dd);
    $(".list-todo-new").find(".tododatenew").datetimepicker({
//       defaultDate: reminder_date,
       format: 'MM/DD/YY HH:mm',
       pickTime: true
    });
});

$(".div-todo-priority span").click(function() {
    event.stopPropagation();
    var div_priority = $(this).parent();
    var parent_tr = $(this).parent().parent().parent();
    var before_transform_val = 1.3;
    div_priority.find("span").css({
        'transform':'scale('+before_transform_val+')',
        '-webkit-transform':'scale('+before_transform_val+')',
        '-ms-transform':'scale('+before_transform_val+')',
        '-moz-transform':'scale('+before_transform_val+')',
        '-o-transform':'scale('+before_transform_val+')'
    });
    var transform_val = 1.8;
    $(this).css({
        'transform':'scale('+transform_val+')',
        '-webkit-transform':'scale('+transform_val+')',
        '-ms-transform':'scale('+transform_val+')',
        '-moz-transform':'scale('+transform_val+')',
        '-o-transform':'scale('+transform_val+')'
    });
    var priority_selected = $(this).attr('class');
    if(priority_selected.toLowerCase().indexOf('severe') >=0 ) {
        parent_tr.find(".todo-priority").val("severe");
        parent_tr.find(".square").attr('class', 'square shadow severe');
    }
    if(priority_selected.toLowerCase().indexOf('high') >=0 ) {
        parent_tr.find(".todo-priority").val("high");
        parent_tr.find(".square").attr('class', 'square shadow high');
    }
    if(priority_selected.toLowerCase().indexOf('medium') >=0 ) {
        parent_tr.find(".todo-priority").val("medium");
        parent_tr.find(".square").attr('class', 'square shadow medium');
    }
    if(priority_selected.toLowerCase().indexOf('low') >=0 ) {
        parent_tr.find(".todo-priority").val("low");
        parent_tr.find(".square").attr('class', 'square shadow low');
    }

});


$(".div-todo-new-priority span").click(function() {
    event.stopPropagation();
    var div_priority = $(this).parent();
    var td_todo_new = $(this).parent().parent().parent();
    var before_transform_val = 1.3;
    div_priority.find("span").css({
        'transform':'scale('+before_transform_val+')',
        '-webkit-transform':'scale('+before_transform_val+')',
        '-ms-transform':'scale('+before_transform_val+')',
        '-moz-transform':'scale('+before_transform_val+')',
        '-o-transform':'scale('+before_transform_val+')'
    });
    var transform_val = 1.8;
    $(this).css({
        'transform':'scale('+transform_val+')',
        '-webkit-transform':'scale('+transform_val+')',
        '-ms-transform':'scale('+transform_val+')',
        '-moz-transform':'scale('+transform_val+')',
        '-o-transform':'scale('+transform_val+')'
    });
    td_todo_new.find(".todo-priority").val("low");
    var priority_selected = $(this).attr('class');
    if(priority_selected.toLowerCase().indexOf('severe') >=0 ) {
        td_todo_new.find(".todo-priority").val("severe");
    }
    if(priority_selected.toLowerCase().indexOf('high') >=0 ) {
        td_todo_new.find(".todo-priority").val("high");
    }
    if(priority_selected.toLowerCase().indexOf('medium') >=0 ) {
        td_todo_new.find(".todo-priority").val("medium");
    }
    if(priority_selected.toLowerCase().indexOf('low') >=0 ) {
        td_todo_new.find(".todo-priority").val("low");
    }
});

var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";


$("input[name^='todonamenewsave']").on('click',
    function(event) {
        event.preventDefault();
        // Parent table referrence
        var parent_table = $(event.target).parent().parent().parent().parent();
        var parent_tr = $(event.target).parent().parent();
        var tr = parent_table.find("tr");
        // Create new todo values.
        var newTodoVal = parent_tr.find(".todonamenew").val();
        if(!newTodoVal) {
            parent_tr.find(".todonamenew").prop('placeholder', 'Todo name...');
            parent_tr.find(".todonamenew").focus();
            return;
        } else {
            parent_tr.find(".todonamenew").prop('placeholder', '');
        }
        var newTodoPriority = parent_tr.find(".todo-priority").val()
        if(!newTodoPriority) {
            parent_tr.find(".todo-priority").focus();
            return;
        }
        var newTodoReminderDate = parent_tr.find(".tododatenew").val();
        // format the date in mmm dd format
        var frmated_reminder_date = "";
        if(newTodoReminderDate) {
            frmated_reminder_date = newTodoReminderDate;
        } else {
            frmated_reminder_date = "";
        }
//        quickAddTodo(newTodoVal, newTodoPriority, newTodoReminderDate);
        $.ajax({
            url : "quickadd_todo/",
            type : "POST",
            data : {
                'todoname' : newTodoVal ,
                'todopriority' : newTodoPriority,
                'todoreminder_date' : newTodoReminderDate
            },
            success : function(json) {
                // Inserted New Todo data
                if(json.todoreminderdate) {
                    newTodoId = json.todoid;
                    newTodoVal = json.todoname;
                    newTodoPriority = json.todopriority;
                    newTodoReminderDate = json.todoreminderdate;
                } else {
                    newTodoId = json.todoid;
                    newTodoVal = json.todoname;
                    newTodoPriority = json.todopriority;
                    newTodoReminderDate = "";
                }
                // Find new row insert position
                var totalRows = parent_table.find("tr").length;
                var insertIndex = parseInt(totalRows - 3);
                // create new todo elements (new tr)
                var newTr = $("<tr></tr>");
                newTr.addClass("drag-todo-item ui-sortable-handle");
                // 3 td comprise of each tr for todo.
                // 1. creating status td and its elements
                var statusTd = $("<td></td>");
                statusTd.addClass("status");
                statusTd.css({
                    'width' : '10%'
                });
                var dragSpan = $("<span></span>");
                dragSpan.addClass("glyphicon glyphicon-resize-vertical");
                dragSpan.css({
                    'display' : 'none',
                    'float' : 'left',
                    'margin-left' : '-10px'
                });
                var statusDiv = $("<div name='todocompleted' value='false' ></div>");
                statusDiv.addClass("square shadow "+newTodoPriority);
                statusDiv.attr("id", "todocompleted"+newTodoId);
                statusDiv.attr("title", newTodoPriority);
                statusDiv.attr("onclick", "markasCompleted('"+newTodoVal+"','"+newTodoId +"')")
                // To-do add name, id, value, onclick, title - statusDiv
                var priorityInput = $("<input type='hidden' name='todo-priority' />");
                priorityInput.addClass("todo-priority");
                priorityInput.val(newTodoPriority);

                statusDiv.append(priorityInput);
                statusTd.append(dragSpan);
                statusTd.append(statusDiv);
                newTr.append(statusTd);

                // 2. creating todo name td and its elements
                var nameTd = $("<td></td>");
                nameTd.addClass("name-todo");
                nameTd.css({
                    'width' : '90%'
                });
                var idInput = $("<input type=hidden name='todo-id' />");
                idInput.val(newTodoId);
                idInput.addClass("todo-id"); //need to add todo value
                var nameDiv = $("<div></div>");
                nameDiv.addClass("list-todo-name");
                nameDiv.html(newTodoVal);
                var nameInput = $("<input type=text name='todoname' />"); //  need to add id, value
                nameInput.css({
                    'display' : 'none'
                });
                nameInput.attr("id", "todoname"+newTodoId);
                nameInput.val(newTodoId);
                var todoDetailSpan = $("<span></span>");
                todoDetailSpan.addClass("glyphicon glyphicon-list");
                todoDetailSpan.css({
                    'display' : 'none'
                });
                var dateSpan = $("<span></span>");
                dateSpan.addClass("reminder-date"); // need to add title = with no of days left
                dateSpan.html(frmated_reminder_date)

                var dateInput = $("<input type=hidden name='todo-date' />");
                dateInput.addClass("todo-date");
                dateInput.val(newTodoReminderDate);
                nameTd.append(idInput);
                nameTd.append(nameDiv);
                nameTd.append(nameInput);
                nameTd.append(todoDetailSpan);
                nameTd.append(dateSpan);
                nameTd.append(dateInput);
                newTr.append(nameTd);

                var editTd = $("<td></td>");
                editTd.addClass("list-todo-edit");
                editTd.attr("colspan", "2");
                editTd.css('display', 'none');
                var divEdit = $("<div class='div-todo-list-edit'> </div> ");
                var inputNameEdit = $("<input class='todonameedit' type='text' name='todonameedit' />");
                inputNameEdit.val(newTodoVal);
                var inputDateEdit = $("<input class='tododateedit' type='text' name='tododateedit' readonly placeholder='due by' />");
                inputDateEdit.val(newTodoReminderDate);
                divEdit.append(inputNameEdit);
                divEdit.append(inputDateEdit);

                var paraEditButtons = $("<p class='todoeditbuttons'> </p>");
                var btnSaveEdit = $("<input type='button' name='todonamesave' value='save' />");
                var btnCancelEdit = $("<input type='button' name='todonamecancel' value='cancel' />");
                paraEditButtons.append(btnSaveEdit);
                paraEditButtons.append(btnCancelEdit);

                var divPriority = $("<div class='div-todo-priority' ></div>");
                var prioritySevere = $("<span class='glyphicon glyphicon-flag priority-flag-severe' title='severe'></span>");
                var priorityHigh = $("<span class='glyphicon glyphicon-flag priority-flag-high' title='high'></span>");
                var priorityMedium = $("<span class='glyphicon glyphicon-flag priority-flag-medium' title='medium'></span>");
                var priorityLow = $("<span class='glyphicon glyphicon-flag priority-flag-low' title='low'></span>");

                divPriority.append(prioritySevere);
                divPriority.append(priorityHigh);
                divPriority.append(priorityMedium);
                divPriority.append(priorityLow);
                paraEditButtons.append(divPriority);


                editTd.append(divEdit);
                editTd.append(paraEditButtons);
                newTr.append(editTd);

                $(tr[insertIndex]).after(  // get the last tr before new todo div
                    newTr
                );
                parent_tr.find(".todonamenew").val("");
                parent_tr.find(".tododatenew").val("");

                parent_tr.parent().find(".list-todo-new").css({
                    'display' : 'none'
                });
                var div_priority = $(this).parent();
                var before_transform_val = 1.3;
                div_priority.find("span").css({
                    'transform':'scale('+before_transform_val+')',
                    '-webkit-transform':'scale('+before_transform_val+')',
                    '-ms-transform':'scale('+before_transform_val+')',
                    '-moz-transform':'scale('+before_transform_val+')',
                    '-o-transform':'scale('+before_transform_val+')'
                });


            },
            error : function(xhr,errmsg,err) {
                $('#error-results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            }
        });

    }
);

$("input[name^='todonamenewcancel']").on('click',
    function(event) {
        event.preventDefault();
        var parent_tr = $(event.target).parent().parent().parent();
        parent_tr.find(".list-todo-new").css({
            'display' : 'none'
        });
        parent_tr.find(".todonamenew").val("");
        parent_tr.find(".tododatenew").val("");
        var div_priority = $(this).parent();
        var td_todo_new = $(this).parent().parent().parent();
        var before_transform_val = 1.3;
        div_priority.find("span").css({
            'transform':'scale('+before_transform_val+')',
            '-webkit-transform':'scale('+before_transform_val+')',
            '-ms-transform':'scale('+before_transform_val+')',
            '-moz-transform':'scale('+before_transform_val+')',
            '-o-transform':'scale('+before_transform_val+')'
        });
    }
);

$( "div.square" ).hover(
    function() {
        $( this ).css({
            'cursor': 'pointer'
        });
    }
);


/* New Todo list Feature end   */

/* Todo Project Feature start */

function showProjectTodo() {
    $("#tabs-todo-types").css('display', 'none');
    showTodoFeature(FEATURELIST.PROJECTFEATURE);


}

/* Todo Project Feature end */