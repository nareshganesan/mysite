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
    ADDFEATURE: "div-todo-add",
    DETAILFEATURE: "div-todo-detail",
    DELETEFEATURE: "div-todo-delete",
    LISTFEATURE: "div-todo-list",
    SEARCHFEATURE: "div-todo-search",
    COMPLETEDFEATURE: "div-todo-completed",
    REPORTFEATURE: "div-todo-report",
    PROJECTFEATURE: "div-todo-project"


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