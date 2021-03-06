/* Todo App feature as a constant */
var ADDFEATURE = "AddFeature";
var DETAILFEATURE = "DetailFeature";
var DELETEFEATURE = "DeleteFeature";
var LISTFEATURE = "ListFeature";
var SEARCHFEATURE = "SearchFeature";
var COMPLETEDFEATURE = "CompletedFeature";
var REPORTFEATURE = "ReportFeature";
var PROJECTFEATURE = "ProjectFeature";

/* Todo Tabs Constants  */
var TODOTAB = "TodoTab";
var COMPLETEDTODOTAB = "CompletedTodoTab";
var DELETEDTODOTAB = "DeletedTodoTab";

var FEATURELIST = {
    ADDFEATURE: "AddFeature",
    DETAILFEATURE: "DetailFeature",
    DELETEFEATURE: "DeleteFeature",
    LISTFEATURE: "ListFeature",
    SEARCHFEATURE: "SearchFeature",
    COMPLETEDFEATURE: "CompletedFeature",
    REPORTFEATURE: "ReportFeature",
    PROJECTFEATURE: "ProjectFeature"
}

/* Todo Feature Header element constants */
var todo_features_header = {
    ADDFEATURE: "header-todo-add",
    DETAILFEATURE: "header-todo-detail",
    DELETEFEATURE: "header-todo-delete",
    LISTFEATURE: "header-todo-list",
    SEARCHFEATURE: "header-todo-search",
    COMPLETEDFEATURE: "header-todo-completed",
    REPORTFEATURE: "header-todo-report",
    PROJECTFEATURE: "header-todo-project"

};
/* Todo Feature Body element constants */
var todo_features_div = {
    ADDFEATURE: "div-feature-add",
    DETAILFEATURE: "div-feature-detail",
    DELETEFEATURE: "div-feature-delete",
    LISTFEATURE: "div-feature-list",
    SEARCHFEATURE: "div-todo-search",
    COMPLETEDFEATURE: "div-feature-completed",
    REPORTFEATURE: "div-feature-report",
    PROJECTFEATURE: "div-feature-project"


};

var FEATURETABS = {
    TODO: "#tab-todo",
    COMPLETEDTODO: "#tab-completed-todo",
    DELETEDTODO: "#tab-deleted-todo"
}

/* Todo common features */

function showTodoFeature(todoFeature) {
    for (var feature in FEATURELIST) {

        if(typeof(todoFeature) == "undefined" || todoFeature == null ){
            return;
        } else {
            if(FEATURELIST[feature] == todoFeature){
                showTodoElementsById(todo_features_header[feature]);
                showTodoElementsById(todo_features_div[feature]);
            } else {
                hideTodoElementsById(todo_features_header[feature]);
                hideTodoElementsById(todo_features_div[feature]);
            }
        }
    }
}

/* Completed Todo common features start */

/* Completed Todo Feature Header element constants */
var ctodo_features_header = {
    ADDFEATURE: "header-ctodo-add",
    DETAILFEATURE: "header-ctodo-detail",
    DELETEFEATURE: "header-ctodo-delete",
    LISTFEATURE: "header-ctodo-list",
    SEARCHFEATURE: "header-ctodo-search",
    COMPLETEDFEATURE: "header-ctodo-completed",
    REPORTFEATURE: "header-ctodo-report",
    PROJECTFEATURE: "header-ctodo-project"
};
/* Completed Todo Feature Body element constants */
var ctodo_features_div = {
    ADDFEATURE: "div-ctodo-add",
    DETAILFEATURE: "div-ctodo-detail",
    DELETEFEATURE: "div-ctodo-delete",
    LISTFEATURE: "div-ctodo-list",
    SEARCHFEATURE: "div-ctodo-search",
    COMPLETEDFEATURE: "div-ctodo-completed",
    REPORTFEATURE: "div-ctodo-report",
    PROJECTFEATURE: "div-ctodo-project"
};

function showCompletedTodoFeature(ctodoFeature) {
    for (var feature in FEATURELIST) {

        if(typeof(ctodoFeature) == "undefined" || ctodoFeature == null ){
            return;
        } else {
            if(FEATURELIST[feature] == ctodoFeature){
                showTodoElementsById(ctodo_features_header[feature]);
                showTodoElementsById(ctodo_features_div[feature]);
            } else {
                hideTodoElementsById(ctodo_features_header[feature]);
                hideTodoElementsById(ctodo_features_div[feature]);
            }
        }
    }
}





/* Completed Todo common features end */






/* Deleted Todo common features start */

/* Deleted Todo Feature Header element constants */
var dtodo_features_header = {
    ADDFEATURE: "header-dtodo-add",
    DETAILFEATURE: "header-dtodo-detail",
    DELETEFEATURE: "header-dtodo-delete",
    LISTFEATURE: "header-dtodo-list",
    SEARCHFEATURE: "header-dtodo-search",
    COMPLETEDFEATURE: "header-dtodo-completed",
    REPORTFEATURE: "header-dtodo-report",
    PROJECTFEATURE: "header-dtodo-project"
};
/* Deleted Todo Feature Body element constants */
var dtodo_features_div = {
    ADDFEATURE: "div-dtodo-add",
    DETAILFEATURE: "div-dtodo-detail",
    DELETEFEATURE: "div-dtodo-delete",
    LISTFEATURE: "div-dtodo-list",
    SEARCHFEATURE: "div-dtodo-search",
    COMPLETEDFEATURE: "div-dtodo-completed",
    REPORTFEATURE: "div-dtodo-report",
    PROJECTFEATURE: "div-dtodo-project"
};

function showDeletedTodoFeature(dtodoFeature) {
    for (var feature in FEATURELIST) {

        if(typeof(dtodoFeature) == "undefined" || dtodoFeature == null ){
            return;
        } else {
            if(FEATURELIST[feature] == dtodoFeature){
                showTodoElementsById(dtodo_features_header[feature]);
                showTodoElementsById(dtodo_features_div[feature]);
            } else {
                hideTodoElementsById(dtodo_features_header[feature]);
                hideTodoElementsById(dtodo_features_div[feature]);
            }
        }
    }
}





/* Deleted Todo common features end */