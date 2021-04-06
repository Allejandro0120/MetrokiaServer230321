$(document).ready(function () {
$("#lista1").change(function () {

    $("#lista1 option:selected").each(function () {
        idMarca = $(this).val();
        $.post("./getModelo.php", { idMarca: idMarca}, function(data){
            $("#lista2").html(data);
        });
    });
})

$('#lista2').change(function () {
    color = $( "#CarColor option:selected" ).text();
    modelo = $( "#lista2 option:selected" ).text();
    srcGenerated = "images/"+modelo+color+".jpg";
    if (($( "#CarColor option:selected" ).val())!="value0"){
        $('#ImageLoadCar').attr('src', 'images/'+modelo+color+'.jpg');
        $('#ImageLoadCar').css('display', 'block');
        $('#ImageLoadCar').on("error", function() {
            $(this).attr('src', 'images/'+modelo+'.jpg');
            $('#ImageLoadCar').css('display', 'block');
        });
    }
})


$('#CarColor').change(function () {
    color = $( "#CarColor option:selected" ).text();
    modelo = $( "#lista2 option:selected" ).text();
    srcGenerated = "images/"+modelo+color+".jpg";
    $('#ImageLoadCar').attr('src', 'images/'+modelo+color+'.jpg');
    $('#ImageLoadCar').css('display', 'block');
    $('#ImageLoadCar').on("error", function() {
        $(this).attr('src', 'images/'+modelo+'.jpg');
        $('#ImageLoadCar').css('display', 'block');
    });
})

})
let valor1 = 0;
let StateCheck = false;
function agregarFila() {
    let idMarca         =   $("#lista1 option:selected").val();
    let valParte        =   $("#PiezaSelect option:selected").val();
    let valLevel        =   $("#LevelSelect option:selected").val();
    let valPaint        =   $('#PaintType').val();
    if (idMarca != 0) {
        if (valPaint != 0) {
            if(valParte != 0){
                if(valLevel != 0){
                    parteSelect = $("#PiezaSelect option:selected").text();
                    LevelSelect = $("#LevelSelect option:selected").text();
                    var rows            =   $('#TablaResumen tbody tr').length;
                    

                    for (var i=0;i<rows;i++){
                        var checkParte2 = $('#TablaResumen tbody tr:eq('+i+') td:eq(0)').text();
                        if (checkParte2 == parteSelect) {
                            var checkLevel = $('#TablaResumen tbody tr:eq('+i+') td:eq(1)').text();
                            if (checkLevel == LevelSelect) {
                                alert("Esta combinación ya ha sido agregada, por favor seleccione la parte y el tipo de daño de nuevo");
                                StateCheck = true;
                                i = rows;
                            }
                            else {
                                StateCheck = false;
                            }
                        }
                        else {
                        StateCheck=false;
                        }
                    }

                    if (StateCheck == false){
                        newRow();
                    }
                }
                else {
                    alert("Por favor seleccione el tipo de daño");
                }
            }
            else {
                alert("Por favor seleccione una Pieza");
            }
        }
        else {
            confirm("Por favor seleccionar el tipo de pintura");
        }
    }
    else {
        alert("Por favor seleccione un tipo de vehiculo");
    } 
  
}


function Cotizar(){
    var rows            =   $('#TablaResumen tbody tr').length;
    var fullnombre      =   $('#Nombres').val().length;
    var fulltelefono    =   $('#Telefono').val().length;
    var fullemail       =   $('#email').val().length;
    var fullplaca       =   $('#placa').val().length;
    
    if (fullnombre > 0) {
        if (fulltelefono > 0) {
            if (fullemail > 0) {
                if (fullplaca > 0) {
                        if (rows > 0) {
                            $('#buttonPDF').css("display","inline-block");
                            $('#valor').css("visibility","visible");
                            $('#buttonCotizacion').css("display","none");
                            }
                        else{
                            confirm("Por favor selecciona una pieza");
                        }
                    }
                else {
                    confirm("Por favor diligenciar su placa");
                }
            }
            else {
                confirm("Por favor diligenciar su email");
            }
        }
        else {
            confirm("Por favor diligenciar su telefono");
        }
    }
    else {
        confirm("Por favor diligenciar su nombre");
    }  
}


function newRow () {
    var PiezatoRow = $("#PiezaSelect option:selected").text();
    var LeveltoRow = $("#LevelSelect option:Selected").text();
    var newRow = '<tr style="border-top: 1px #bc162c solid;">'+
                    '<td style="border-right: 1px #bc162c solid; padding-left:2%;">' + PiezatoRow + '</td>'+
                    '<td style="padding-left:2%;">' + LeveltoRow + '</td>'+
                '</tr>';
        $('#TablaResumen tbody').append(newRow);
        $('#TablaResumen').css("visibility","visible");
        addtoCot();
}

function addtoCot () {
    let idMarca         =   $("#lista1 option:selected").val();
    let idTipoDano      =   $("#LevelSelect option:selected").val();
    let idParte         =   $("#PiezaSelect option:selected").val();
    let idTipoPintura   =   $("#PaintType option:selected").val();

    $.post("./getValue.php", { idMarca: idMarca , idTipoPintura : idTipoPintura, idTipoDano : idTipoDano, idParte : idParte}, FuncionValor);
        
        function FuncionValor(dato){
            valorleido = parseFloat(dato);
            valor1 = valor1+valorleido;
            valorFloat = (valor1/1000).toFixed(3);
            $('#Valor2').text("$ "+valorFloat+" más IVA");
        }
}

function call2Functions(){
    $.when(sendMail()).then(function () {

        GeneratePDF();
    
    })
}

function sendMail () {
    BodyToMail = "<h2 style='text-align:center;'>Cotización Generada</h2><br>";
    BodyToMail += "<table style='border: 3px #bc162c solid; margin:auto;'><tr><td style='background: #bc162c; color: white'><b>Nombres</b></td>";
    BodyToMail += "<td>"+$("#Nombres").val()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Teléfono</td></td>";
    BodyToMail += "<td>"+$("#Telefono").val()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Email</td></td>";
    BodyToMail += "<td>"+$("#email").val()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Tipo de Vehículo</td></td>";
    BodyToMail += "<td>"+$("#lista1 option:selected").text()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Modelo</td></td>";
    BodyToMail += "<td>"+$("#lista2 option:selected").text()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Color</td></td>";
    BodyToMail += "<td>"+$("#CarColor option:selected").text()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Placa</td></td>";
    BodyToMail += "<td>"+$("#placa").val()+"</td></tr>";
    BodyToMail += "<tr><td style='background: #bc162c; color: white'><b>Concesionario</td></td>";
    BodyToMail += "<td>"+$("#Centro option:selected").text()+"</td></tr>";
    BodyToMail += "</table><br><br>";
    BodyToMail += "<table style='border: 3px #bc162c solid; margin:auto;'>"+$( "#TablaResumen" ).html()+"</table><br><br>";
    BodyToMail += "<h2 style='text-align:center; background-color:#bc162c; color:white;'>Total</h2><br>";
    BodyToMail += "<p style='text-align:center;'>"+$( "#Valor2" ).text()+"</p><br><br>";
    
    if ($("#Centro option:selected").val() == 1){
        dest = 'alejoperez0120@gmail.com';
    }
    if ($("#Centro option:selected").val() == 2){
        dest = 'mtka1talvil@kia.com.co';
    }
    if ($("#Centro option:selected").val() == 3){
        dest = 'adolfoacevedo.aap@gmail.com';
    }
    if ($("#Centro option:selected").val() == 4){
        dest = 'valentinacevedo29@gmail.com';
    }
    
    Email.send({
        SecureToken : "a8e9a26d-f18d-43cd-aa52-29a59b7bad62",
        To : dest ,
        From : "info@reparacionrapida.com",
        Subject : "Cotización Reparación Rapida",
        Body : BodyToMail
    }).then(message => {
          if (message == "OK"){
              GeneratePDF();
          }
          else {
              alert("test");
          }
      }
    )
}


