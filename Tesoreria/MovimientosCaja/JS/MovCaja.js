$(document).ready(function() {
    // Carga de movimientos
    
    // Obtengo último numero 
    UltimoMovimiento()

} );

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    var form = $("#formAltaMov");
    var url = $("#formAltaMov").attr("action");
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          form.classList.add('was-validated')
          console.log('aca');
        }
        else {
            event.preventDefault()
            var formq = $("#formAltaMov");
            var url = $("#formAltaMov").attr("action");
            console.log(formq.serialize());
            $.ajax({
                type: "POST",
                url: "Methods/MovimientoCajaAlta.cshtml",
                data: formq.serialize(),
                datatype: "html",
                success: function (data) {
                    form.reset();
                    UltimoMovimiento( );
                    form.classList.remove('was-validated')
                    var myToast = document.querySelector('.toast');
                    var toast = new bootstrap.Toast(myToast);
                    toast.show();
                    form.classList.remove('was-validated')
                },
                error: function (data) {
                    // Some error in ajax call
                    alert("some Error");
                }
                });
            
        }
  

      }, false)
    })
  })()

function UltimoMovimiento( ){
    $('#MovCajaDetail').load("Methods/MovimientoCajaDetail.cshtml");
    $.ajax({
            url: "Methods/MovimientoCajaUltMov",
            type: "get",
            dataType: "json",
            contentType: "application/json; charset=utf-8", 
            cache: false,
            })
            .done(function(data) {
                 console.log(data);  
                 $('#ultmovinput').val(data);                     

            })

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        document.getElementById('fecha').value = formattedToday;    
        document.getElementById('titulodia').innerHTML = "Del d&iacute;a " + formattedToday;       
}


var formingreso = document.getElementById("formAltaMov"); 
formingreso.onkeypress = function (key) { 
    var btn = 0 || key.keyCode || key.charCode; 
    if (btn == 13) { 
        alert("Enter Key is Pressed!"); 
        key.preventDefault(); 
    } 
}  





// MODIFICAR OBSERVACIONES

function cargardatosmodal(eventosel ){
    $("#idevento_edit").val(eventosel.getAttribute("data-idmov"));
    $("#detalle_edit").val(eventosel.getAttribute("data-detalle"));

}



function updatevto(){
    var id = $("#idevento_edit").val();
    console.log($("#edit-obsmov").serialize())
    $.ajax({
      type: "POST",
      url: $("#edit-obsmov").attr('action'),
      data: $("#edit-obsmov").serialize(),
      dataType: "html",
      success: function(response) {
        $('#MovCajaDetail').load("Methods/MovimientoCajaDetail.cshtml");
        $('#updateObservaciones-modal2').modal('toggle');
          
      },
        error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);

        $('#updateObservaciones-modal2').modal('toggle');
        
    }
  });

  
    $(document).ajaxComplete(function(){
        console.log(id)
        var appt = document.getElementById(id);
        
        
        $('#'+ id).effect("highlight", {}, 3000);
        
      });
        


          }




/*           $.ajax({
            type: "POST",
            url: $("#edit-vto").attr('action'),
            data: $("#edit-vto").serialize(),
            dataType: "html",
            success: function(response) {
                consulta_vencimientos(999,'9999',0)
                $('#error-modal2').modal('toggle');
                
            },
              error: function(xhr, textStatus, error){
              console.log(xhr.statusText);
              console.log(textStatus);
              console.log(error);

                 $('#error-modal2').modal('toggle');
              
          }
        }); */










