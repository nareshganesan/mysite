/* Date time picker starts  */
$(function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) { dd='0'+dd }
    if(mm<10) { mm='0'+mm }

    today = yyyy+'-'+mm+'-'+dd;

    $('#div-startdate').datetimepicker({
        defaultDate: today,
        format: 'YYYY-MM-DD',
        pickTime: false
    });
    $('#div-enddate').datetimepicker({
        defaultDate: today,
        format: 'YYYY-MM-DD',
        pickTime: false
    });
    $("#div-startdate").on("dp.change",function (e) {
        $('#div-enddate').data("DateTimePicker").setMinDate(e.date);
    });
    $("#div-enddate").on("dp.change",function (e) {
        $('#div-startdate').data("DateTimePicker").setMaxDate(e.date);
    });

    $('#div-cstartdate').datetimepicker({
        defaultDate: today,
        format: 'YYYY-MM-DD',
        pickTime: false
    });
    $('#div-cenddate').datetimepicker({
        defaultDate: today,
        format: 'YYYY-MM-DD',
        pickTime: false
    });
    $("#div-cstartdate").on("dp.change",function (e) {
        $('#div-cenddate').data("DateTimePicker").setMinDate(e.date);
    });
    $("#div-cenddate").on("dp.change",function (e) {
        $('#div-cstartdate').data("DateTimePicker").setMaxDate(e.date);
    });
});

/* Date time picker ends  */