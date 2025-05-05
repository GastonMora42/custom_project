$(document).ready(function(){
    var numero_rec = $('#numrecibo').val() 
    if (numero_rec == ""){
            $('#numrecibo').attr("placeholder", "Ingrese # recibo");
    }
    else{
        recibosel(numero_rec);
    }
// jQuery methods go here...

});


document.getElementById("formreciboconsulta").onkeypress = function(e) {
var key = e.charCode || e.keyCode || 0;     
if (key == 13) {
e.preventDefault();
}
}

 function recibosel() {
        

        var x = document.getElementById("Table_detail");
        x.style.display = "none";
        var x1 = document.getElementById("Error_detail");
        x1.style.display = "none";
        
        $('#Table_detail').load("Methods/consultareciboDetail.cshtml?num_recibo="+$('#numrecibo').val() , function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            x.style.display = "block";

        if(statusTxt == "error")
            x1.style.display = "block";
    });



}

