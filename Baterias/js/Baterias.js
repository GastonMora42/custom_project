        (() => {
        'use strict'

          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          const forms = document.querySelectorAll('.needs-validation')

          // Loop over them and prevent submission
          Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                console.log("aca");
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }

              form.classList.add('was-validated')
            }, false)
          })
        })()

    $(document).ready(function () {
        $("#mensajealerta").delay(3000).slideUp(300);
        
        $("#agregarfila").click(function () {
            var cantidad = $("#cantidad").val();
            $("#cantidad").val('');
            var itemsel = $("#deposito_ing").val();
            var depsel = $("#deposito_ing :selected").text();


            $("#deposito_ing").val('0');
            
            var table = document.getElementById("example");
             
            var row = table.insertRow(table.rows.length -1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = "<input type='checkbox' name='record'><span class='check'></span>";
            cell2.innerHTML = '' ;
            cell3.innerHTML = itemsel;
            cell4.innerHTML = depsel;
            cell5.innerHTML = cantidad;


            tablemetrics ()
            });
        });

            function tablemetrics (){
            var table = document.getElementById("example");
            if (table.rows.length > 2){
                    var canttotal = 0
                    for (let i = 1; i < table.rows.length - 1; i++) { 
                       // Loop through rows
                        var row = table.rows[i];
                        var firstCell = row.cells[1];
                            canttotal = row.cells[4].innerHTML 
                        firstCell.innerHTML = i ;
                
                    var total = document.getElementById("totalsalida");
                    total.innerHTML = total.innerHTML + canttotal;
                    }
                 }
            }

    function ExtBaterias(str) {

        if (str == "EXTERNO") {
            $("#externo").removeAttr('disabled');
            $("#bsuso").val("EXTERNO");
        }
        else if (str == "OTROS_INTERNO") {
            $("#externo").removeAttr('disabled');
            $("#bsuso").val("OTROS_INTERNO");
        }
        else {
            $("#externo").attr('disabled', 'disabled');

        }
    }