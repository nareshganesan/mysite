  /* Report Todo feature start */

  function showReportTodo() {
    var tabid = $("#ul-tab-todo-types").find('.active a').attr('href');
    $("#tabs-todo-types").css('display', 'none');
    showTodoFeature(FEATURELIST.REPORTFEATURE);
    $('#getReport').click();
    $(window).resize();

  }

  /* Report Todo feature end */

$(document).ready(function() {
/* Todo's report based on priority. */
     var reportByPriority = {
        chart: {
            renderTo: 'reportByPriority',
            type: 'line',
        },
        credits: {enabled: false},
        legend: {enabled: false},
        title: {text: 'Todo Report'},
        subtitle: {text: 'Total Todo\'s created'},
        tooltip:{
                formatter:function(){
                    return 'Priority: ' + this.key + '<br/>' + this.series.name+': '+ this.y;
                }
         },
        xAxis: {title: {text: null}, labels: {rotation: 0}},
        yAxis: {title: {text: null}},
        series: [{}, {}, {}],
    };

    $('#getReport').click(function() {
    var applicationcontext = window.location.pathname;
    var chartDataUrl = "todo_reports/";
    var startDate = $("#input-div-startdate").val()
    var endDate = $("#input-div-enddate").val()
    console.log(endDate);
        $.ajax({
            url : chartDataUrl, // the endpoint
            type : "POST", // http method
            // data sent with the post request
//            dataType: 'jsonp',
            data : {
            'startDate' : startDate ,
            'endDate' : endDate
            },
            // handle a successful response
            success : function(data) {
                reportByPriority.title.text =  'Todo\'s Report' ;
                reportByPriority.subtitle.text =  startDate+" - "+endDate ;
                reportByPriority.legend.title =  'No of Todo\'s' ;
                reportByPriority.legend.verticalAlign =  'bottom' ;
                reportByPriority.legend.align =  'center' ;
                reportByPriority.legend.layout =  'vertical' ;
                reportByPriority.legend.x =  '20' ;
                reportByPriority.legend.y =  '20' ;
                reportByPriority.xAxis.categories = data['priority'];
                reportByPriority.series[0].name = 'Total Todo\'s';
                reportByPriority.series[0].data = data['values']['todo'];
                reportByPriority.series[1].name = 'Completed Todo\'s';
                reportByPriority.series[1].data = data['values']['completedtodo'];
                reportByPriority.series[2].name = 'Deleted Todo\'s';
                reportByPriority.series[2].data = data['values']['deletedtodo'];
                var chart = new Highcharts.Chart(reportByPriority);
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#error-results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            }
        });
    });


/* Todo's report based on priority end. */

});