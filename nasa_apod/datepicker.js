// Event Handler, "ready" is a Promise-like object (or “thenable”) that resolves when the document is ready.
$(document).ready(function(){
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.container-fluid').length>0 ? $('.container-fluid').parent() : "body";
    date_input.datepicker({
         format: 'yyyy/mm/dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
})


