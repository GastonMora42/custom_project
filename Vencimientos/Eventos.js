 $(document).ready(function () {
        consulta_vencimientos(999,'9999',0);
        $('#titulo_selected').html("Vencidos y a Vencer -- Empresas: Todas - Rubros: Todos ");
        
    });

function myFunction(estado)   
    {
       

        if (estado==true){
            $.ajax(
                {
                    url: "Methods/EventosPerAnteriores",
                    type: "get",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8", 
                    cache: false
                })
                .done(function(data) {
                
                    $("#periodo_dropdown").html("");
                    $("#periodo_dropdown").css({"font-weight":"400","color": "mediumblue"});
                    var option = document.createElement("option");
                    for (var ndx = 0; ndx < data.length; ndx++) {
                        var item = data[ndx];
                        var option = document.createElement("option");
                        //alert(item['IDOBRA']);
                        option.value = item['PERIODO'];
                        option.text = item['PERIODO'];
                        $("#periodo_dropdown").append(option);
                    }
                });
        }   
        else {
            location.reload();
        }
    };
function validateform () {

const forms = document.querySelectorAll('.requires-validation')
Array.from(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
  
      form.classList.add('was-validated')
    }, false)
  })
}
// NOTIFICACIONES
function alertatoast (){
            var myToast = document.querySelector('.toast');
        var toast = new bootstrap.Toast(myToast);
        toast.show();
}

$('#btnconsultar').on('click', function(e){
        e.preventDefault();
        $('#Table_detail').html();
        console.log($("#checkperanteriores").val());
        var emp_selected = $('#empresas_dropdown').find(":selected").val();
        var per_selected = $('#periodo_dropdown').find(":selected").val();
        var rubro_selected = $('#rubro_dropdown').find(":selected").val();
            consulta_vencimientos(emp_selected,per_selected,rubro_selected)        
        
    });
// Change heading:
function consulta_vencimientos(empselected,perselected,rubroselected) {
        $('#titulo_selected').html("Vencidos y a Vencer -- Empresas: " +  $('#empresas_dropdown').find(":selected").text() + " - Rubros: " + $('#empresas_dropdown').find(":selected").text());
        $('#Table_detail').html();
        $('#Table_detail').load("Methods/Eventosdetailtable.cshtml?empselected="+ empselected + "&perselected=" + perselected + "&rubro_selected=" + rubroselected,
        function (){
            var sum = 0;
            $(".total").each(function(){
                let text = $(this).text();
                 text = text.replaceAll(".","");
                 text = text.replaceAll(",",".");
               //console.log(new Intl.NumberFormat('en-DE').format(text)) 
              sum += parseFloat(text);
            });
            $('#importetotal').text(new Intl.NumberFormat('en-DE').format(sum));
        }  );
    }

// MODIFICA EVENTO
function cargardatosmodal(eventosel ){

    $.ajax({
            url: "Methods/Eventoseldetail",
            type: "get",
            dataType: "json",
            data: {eventoid: eventosel},
            contentType: "application/json; charset=utf-8", 
            cache: false,
            })
            .done(function(data) {
                if (data.length > 0){
                    $("#idevento_edit").val(eventosel);
                    $("#concepto_edit").val(data[0]['CONCEPTO']);
                    $("#detalle_edit").val(data[0]['DETALLE']);
                    $("#importe_edit").val(data[0]['IMPORTE']);
                    $("#fechavto_edit").val((data[0]['FECHA']));
                    $("#empresa_sel_modal_edit").val(data[0]['EMPID']);
                    $("#responsable_edit").val(data[0]['ID']);
                    $("#rubro_edit").val(data[0]['RUBROID']);
                    }
                else { 
                    console.log("NO ENCONTRADO");                        
                    }
            })
}

function updatevto(){
  console.log($("#edit-vto").serialize())
  $.ajax({
                type: "POST",
                url: $("#edit-vto").attr('action'),
                data: $("#edit-vto").serialize(),
                dataType: "html",
                success: function(response) {
                    consulta_vencimientos(999,'9999',0)
                    $('#error-modal2').modal('toggle');
                    alertatoast()
                },
                  error: function(xhr, textStatus, error){
                  console.log(xhr.statusText);
                  console.log(textStatus);
                  console.log(error);

                     $('#error-modal2').modal('toggle');
                  
              }
            });
        }



// CTRL DE VENCIMIENTOS
function cargardatosmodalctrl (eventosel ){
    $("#ideventoctrl").val(eventosel);
}

function updatectrl(){
  console.log($("#edit-ctrl").serialize())
  $.ajax({
                type: "POST",
                url: $("#edit-ctrl").attr('action'),
                data: $("#edit-ctrl").serialize(),
                dataType: "html",
                success: function(response) {
                    consulta_vencimientos(999,'9999',0)
                    $('#actualiza-concepto').modal('toggle');
                    alertatoast()
                },
                  error: function(xhr, textStatus, error){
                  console.log(xhr.statusText);
                  console.log(textStatus);
                  console.log(error);

                     $('#actualiza-concepto').modal('toggle');
                  
              }
            });
        }
// ALTA DE EVENTO

function alta_evento(){
    
    const repeticion = $("#repeticion_alta").val();
    const currentDate = $("#fechavto_alta").val(); // Current date
    console.log("Current Date:", currentDate);
    console.log("Repeticion:", typeof(repeticion));

    if (repeticion == 0){
    //  si es un solo evento 

        altaeventopost ()

    } else if (repeticion == 1) {
    //  si es un evento con repeticion mensual
        for (let i = 0; i < getnumber(repeticion); i++) {
        $("#fechavto_alta").val(formatDateISO(addMonthsToDate(currentDate, i)));
        console.log($("#alta-evento").serialize())
        altaeventopost ()

      }
    } else {
    //  si es un evento con repeticion anual
        for (let i = 0; i < getnumber(repeticion); i++) {
            $("#fechavto_alta").val(formatDateISO(addYearsToDate(currentDate, i)));
            console.log($("#alta-evento").serialize())
            altaeventopost ()
      }
    }




          }

          const formatDateISO = (date) => {
            // Convert the date to ISO string
            const isoString = date.toISOString();
            // Split at the "T" character to get the date part
            const formattedDate = isoString.split("T")[0];
            return formattedDate;
        };
        

// Habilita fecha fin 

function altaeventopost () {
$.ajax({
    type: "POST",
    url: $("#alta-evento").attr('action'),
    data: $("#alta-evento").serialize(),
    dataType: "html",
    success: function(response) {
        consulta_vencimientos(999,'9999',0)
        document.getElementById("alta-evento").reset();
        $('#alta_evento').modal('toggle');
        alertatoast()
        
    },
      error: function(xhr, textStatus, error){
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);

      $('#alta_evento').modal('toggle');
      
  }
}); 
}



function  habilitafechafin(valoropt){
    console.log(valoropt)
    if (valoropt > 0) {
        document.getElementById('fechafin_alta').type = 'date';
        document.getElementById('fechafin_alta').disabled = false;
    }
    else {
        document.getElementById('fechafin_alta').type = 'text';
        document.getElementById('fechafin_alta').value = "";
        document.getElementById('fechafin_alta').disabled = true;
        


    }
    
  }

  function getnumber(optionsel){
  
    let date1 = new Date(document.getElementById('fechavto_alta').value);
    let date2 = new Date(document.getElementById('fechafin_alta').value);

    if (optionsel == 1){
        const monthDiff = Math.abs(date1.getMonth() - date2.getMonth() +
        (12 * (date1.getFullYear() - date2.getFullYear())));
         return(monthDiff + 1); // 27  
    }
    else
    {
        const yearDiff = Math.abs((date1.getFullYear() - date2.getFullYear()))
        return(yearDiff); 
    }
 


}

function addMonthsToDate(date, months) {
    const newDate = new Date(date); // Create a new Date instance to avoid mutating the original date
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
  function addYearsToDate(date, years) {
    const newDate = new Date(date); // Create a new Date instance to avoid mutating the original date
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  }

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
// 
// DELETE EVENTOS
//
function filldeletemodal(identifier){
    
    $("#ideventodelete").val(identifier.getAttribute("data-id"));
    $("#conceptotodelete").val(identifier.getAttribute("data-concepto"));
}

function delete_evento(){
    $.ajax({
        type: "POST",
        url: $("#delete").attr('action'),
        data: $("#delete").serialize(),
        dataType: "html",
        success: function(response) {
            consulta_vencimientos(999,'9999',0)
            $('#delete-modal').modal('toggle');
            alertatoast()
            
        },
          error: function(xhr, textStatus, error){
          console.log(xhr.statusText);
          console.log(textStatus);
          console.log(error);

          $('#delete-modal').modal('toggle');
          
      }
    });

}

// ALTA DE RUBRO
          function altarubro(){
            console.log($("#alta-rubro").serialize())
            $.ajax({
                          type: "POST",
                          url: $("#alta-rubro").attr('action'),
                          data: $("#alta-rubro").serialize(),
                          dataType: "html",
                          success: function(response) {
                              location.reload();
                              
                          },
                            error: function(xhr, textStatus, error){
                            console.log(xhr.statusText);
                            console.log(textStatus);
                            console.log(error);
          
                            $('#alta_rubro').modal('toggle');
                            
                        }
                      });
                  }

