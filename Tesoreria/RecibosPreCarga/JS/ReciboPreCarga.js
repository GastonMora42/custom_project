function cargarecibo(){
      console.log($("#formAltaRec").serialize())
    $.ajax({
      type: "POST",
      url: $("#formAltaRec").attr('action'),
      data: $("#formAltaRec").serialize(),
      dataType: "html",
      success: function(response) {
        $('#alertcarga').fadeIn({});
        $('#alertcarga').fadeOut({
        duration: 3800});
        setTimeout(function(){
    location.reload();
}, 4000); // 3000 milliseconds = 3 seconds

          
      },
        error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);

       
        
    }
  });


}






var date = new Date(); 
date.setDate(date. getDate() ); 
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();
fechaconsumo = dd + '/' + mm + '/' + yyyy;
document.getElementById("fechaconsumo").value = fechaconsumo ;
$("#fecharecibo").text(fechaconsumo) ;
updatefechahasta ()


/*
document.getElementById("prodForm").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
      alert("No Enter!");
      e.preventDefault();
    }
  }*/

$("#cliente").keyup(function () {
    
    this.value = this.value.toLocaleUpperCase(); 
    //this.value = this.value.trim();
    $("#cliente_recibo").html(this.value);
});


$("#lugarobra").keyup(function () {

    $("#lugarobra_recibo").html('Lugar de Obra: ' + this.value);
});


function busquedacliente( ){

    $.ajax({
            url: "Methods/busquedaclientedatos",
            type: "get",
            dataType: "json",
            data: {telefono: $("#telefono").val()},
            contentType: "application/json; charset=utf-8", 
            cache: false,
            })
            .done(function(data) {
                    
                    if (data.length > 0){
                        $("#cliente").val(data[0]['NOMBRE']);
                        $("#lugarobra").val(data[0]['LUGAR_OBRA']);
                        $("#telefono_recibo").html('Tel: ' + $("#telefono").val());
                        $("#cliente_recibo").html(data[0]['NOMBRE']);
                        $("#lugarobra_recibo").html(data[0]['LUGAR_OBRA']);
                        //document.getElementById('clienteresumen').innerHTML= thisdict.cliente;
                        }
                    else { console.log("NO ENCONTRADO");
                                $("#telefono_recibo").html('Tel: ' + $("#telefono").val());
                          }
            })
}

function updatefechahasta (){
        var e = document.getElementById("aconsumirantes");
        var value = Number(e.value);
        otrovtoval = document.getElementById("otrovto")
        if (value==0){
            
            otrovtoval.disabled = false;
            otrovtoval.focus();

        }
        else{
          otrovtoval.value = '';
          otrovto.disabled = true;
          cambiafecha(value)

        }


        

}

function cambiafecha(value){
        var date = new Date(); 
        date.setDate(date. getDate() + value); 
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        fechahasta = dd + '/' + mm + '/' + yyyy;
        document.getElementById("fechahasta").value= fechahasta ;
        
        $("#aconsumirrecibo").text($("#aconsumirantes option:selected").text());
        $("#fechahastarecibo").text(fechahasta) ;
}

function updatetotal(){
    var cant = Number($("#precio").val());  
    var precio = Number($("#cantidad").val()); 
    var imputacion = Number($("#ListProductos").val());  
    if (imputacion==-1){
                
        }
    else{
        
    }
    
    Number($("#totalprodserv").val(new Intl.NumberFormat().format(cant * precio * imputacion)));  
}


function agregarfila(){
    var cant = Number($("#cantidad").val());  
    var precio = Number($("#precio").val()); 
    var obsproducto = $("#observpro").val();
    var imputacion = Number($("#ListProductos").val());  
    console.log(obsproducto);
    if (cant == 0 || precio == 0 ){
        
        $("#avisos").slideDown(300);;

        $("#avisos").delay(4000).slideUp(300);
    }
    else {         
            var e = document.getElementById("ListProductos");
            var value = e.value;
            var producto= e.options[e.selectedIndex].text;

            var total = Number($("#totalprodserv").val())
            //console.log(cant);
            //console.log(precio);
            //console.log(total);
            var numfila = $("#cantidadlineas").val();
            var cancela = 0;
            $("#cantidadlineas").val(Number($("#cantidadlineas").val()) + 1 );
            var numfila = Number($("#cantidadlineas").val()) -1 ;
            var strtoadd = `<tr class="row0" id="row0">
                            <td class="align-middle">
                                <button onclick="deleteRow(this)" class="btn bg-danger-subtle  text-danger btn-sm me-1 mb-1" type="button">
                                    <span class="far fa-trash-alt me-1" data-fa-transform="shrink-3"></span>
                                </button> 
                            </td>
                            <td class="align-middle" style="color:brown;font-weight:600;">`+ Number(numfila + 1) +`</td> 
                            <td class="align-middle" style="text-align: center;font-weight:700; ">` + producto + ` </td>
                            <td class="align-middle">`+ obsproducto +`</td> 
                            <td class="align-middle" style="text-align: right;">`+ cant.toLocaleString('es-AR') +`</td> 
                            <td class="align-middle" style="text-align: right;">`+ (precio * imputacion).toLocaleString('es-AR') +`</td> 
                            <td class="align-middle totalfila" style="text-align: right;">`+ (cant * precio * imputacion).toLocaleString('es-AR') +`</td> 
                            </tr>`
            //console.log(strtoadd);

            strtoadd = strtoadd.replace("row0","row"+ String(numfila));
            // strtoadd = strtoadd.replace(/znum/g,0);
            $("#myTable > tbody").append(strtoadd);
            $("#totalprodserv").val('');
            $("#precio").val('');
            $("#cantidad").val('');
            $("#observpro").val('');
            actualizototales();
            productslist() ;
    }               

    }    

function productslist(){
    var productslistado = "";
    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length - 1; i++) {
      var row = table.rows[i];
        row.cells[1].innerHTML = i 
        let text = row.cells[6].innerHTML;
        let result = text.replace(".", "")
        if (i==1){
           productslistado = "( idreclcli," + row.cells[1].innerHTML + ",'"+ 
                                              row.cells[2].innerHTML + "','" + 
                                              row.cells[3].innerHTML + "'," + 
                                              (row.cells[4].innerHTML.replace(".", "")).replace(",", ".") + "," + 
                                              (row.cells[5].innerHTML.replace(".", "")).replace(",", ".") + "," + 
                                              result.replace(",", ".")+")" 
        }
        else{
                  productslistado = productslistado + ",( idreclcli," + row.cells[1].innerHTML + ",'"+ 
                                              row.cells[2].innerHTML + "','" + 
                                              row.cells[3].innerHTML + "'," + 
                                              (row.cells[4].innerHTML.replace(".", "")).replace(",", ".") + "," + 
                                              (row.cells[5].innerHTML.replace(".", "")).replace(",", ".") + "," + 
                                              result.replace(",", ".") +")"
        }

        }
        
        console.log(productslistado)
        
        document.getElementById("productosven").value =  productslistado;
    }
function unformatString(string) {

    var parts = (1234.5).toLocaleString('es-AR').match(/(\D+)/g);
    var unformatted = string;

    unformatted = unformatted.split(parts[0]).join("");
    unformatted = unformatted.split(parts[1]).join(".");

    return parseFloat(unformatted);

}


function actualizototales(){
   var totalventa = 0;
   var valorfila = 0 
   var classtotalfila = document.getElementsByClassName('totalfila');
    
   for(var index=0;index < classtotalfila.length;index++){
     
      valorfila = unformatString(classtotalfila[index].innerHTML) ;
      
      totalventa = parseFloat(totalventa) + parseFloat(valorfila);

   }

   document.getElementById('totalventarecibo').innerHTML = totalventa.toLocaleString('es-AR');
    //alert ("hola");
}   

function deleteRow(r) {
                    
                    var i = r.parentNode.parentNode.rowIndex;
                    document.getElementById("myTable").deleteRow(i);
                    $("#cantidadlineas").val(Number($("#cantidadlineas").val()) - 1 );
                    actualizototales();
                    productslist();
}


$('form').submit(function() {
  $(this).find("button[type='submit']").prop('disabled',true);
});



