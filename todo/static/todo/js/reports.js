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
        subtitle: {text: 'Last Week'},
        xAxis: {title: {text: null}, labels: {rotation: 0}},
        yAxis: {title: {text: null}},
        series: [{}],
    };

    var chartDataUrl = "todo_reports/";
     $.getJSON(chartDataUrl,
        function(data) {
            reportByPriority.xAxis.categories = data['priority'];
            reportByPriority.series[0].name = 'Todo\'s Total Report';
            reportByPriority.series[0].data = data['values'];
            var chart = new Highcharts.Chart(reportByPriority);
    });

    $('#getReport').click(function() {
    var applicationcontext = window.location.pathname;
    var chartDataUrl = "todo_reports/";
    var startDate = $("#input-div-startdate").val()
    var endDate = $("#input-div-enddate").val()
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
                reportByPriority.series[0].name = 'Todo\'s Report';
                reportByPriority.series[0].data = data['values'];
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

/* Completed Todo's report  start */
    var creportByPriority = {
        chart: {
            renderTo: 'creportByPriority',
            type: 'line',
        },
        credits: {enabled: false},
        legend: {enabled: false},
        title: {text: 'Completed Todo\'s Report'},
        subtitle: {text: 'Last Week'},
        xAxis: {title: {text: null}, labels: {rotation: 0}},
        yAxis: {title: {text: null}},
        series: [{}],
    };

    var cchartDataUrl = "todo_reports/";
     $.getJSON(cchartDataUrl,
        function(data) {
            creportByPriority.xAxis.categories = data['priority'];
            creportByPriority.series[0].name = 'Completed Todo\'s Total Report';
            creportByPriority.series[0].data = data['values'];
            var chart = new Highcharts.Chart(creportByPriority);
    });


    $('#cgetReport').click(function() {
    var applicationcontext = window.location.pathname;
    var chartDataUrl = "todo_reports/";
    var startDate = $("#input-div-cstartdate").val()
    var endDate = $("#input-div-cenddate").val()
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
                creportByPriority.title.text =  'Completed Todo\'s Report' ;
                creportByPriority.subtitle.text =  startDate+" - "+endDate ;
                creportByPriority.legend.title =  'No of Todo\'s' ;
                creportByPriority.legend.verticalAlign =  'bottom' ;
                creportByPriority.legend.align =  'center' ;
                creportByPriority.legend.layout =  'vertical' ;
                creportByPriority.legend.x =  '20' ;
                creportByPriority.legend.y =  '20' ;
                creportByPriority.xAxis.categories = data['priority'];
                creportByPriority.series[0].name = 'Todo\'s Report';
                creportByPriority.series[0].data = data['values'];
                var chart = new Highcharts.Chart(creportByPriority);
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#error-results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            }
        });
    });


/* Completed Todo's report  end */

});