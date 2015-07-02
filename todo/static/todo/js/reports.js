$(document).ready(function() {
     /* Report number of Todo's based on priority. */
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

    var chartDataUrl = "todo_reports";
     $.getJSON(chartDataUrl,
        function(data) {
            reportByPriority.xAxis.categories = data['priority'];
            reportByPriority.series[0].name = 'Todo\'s Total Report';
            reportByPriority.series[0].data = data['values'];
            var chart = new Highcharts.Chart(reportByPriority);
    });
});