/* Todo App feature as a constant */
var ADDFEATURE = "AddFeature";
var DETAILFEATURE = "DetailFeature";
var DELETEFEATURE = "DeleteFeature";
var LISTFEATURE = "ListFeature";
var SEARCHFEATURE = "SearchFeature";
var COMPLETEDFEATURE = "CompletedFeature";
var REPORTFEATURE = "ReportFeature";
var PROJECTFEATURE = "ProjectFeature";

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

/*  */

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

/*  */