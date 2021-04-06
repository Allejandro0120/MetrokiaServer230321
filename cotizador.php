<?php

    require('conexion.php');
    
    $query = "SELECT idMarca, Marca FROM marca ORDER BY Marca ASC";
    $resultado = $conn -> query($query);

    $query2 = "SELECT idtipopintura, tipopintura FROM tipoPintura ORDER BY idtipopintura ASC";
    $resultado2 = $conn -> query($query2);

    $query3 = "SELECT idtipodano, tipodano FROM tipodano ORDER BY idtipodano ASC";
    $resultado3 = $conn -> query($query3);

    $query4 = "SELECT idparte, parte FROM partes ORDER BY idparte ASC";
    $resultado4 = $conn -> query($query4);

?>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <!-- JQuery -->
        <script language="javascript" src="./js/jquery-3.5.1.min.js"></script>

        <script language="javascript" src="./js/jspdf.min.js"></script>

        <script language="javascript" src="./js/jspdf.plugin.autotable.min.js"></script>
        
        <script src="./js/pdfGenerator.js"></script>

        <script src="./js/fuunctions.js"></script>

        <script src="https://smtpjs.com/v3/smtp.js"></script>

        <link rel="stylesheet" href="css/styles.css">
    </head>

    <body>
        <header>
            <div class="contenedor">
                <a href="https://www.metrokia.com.co/"><img id="logo" src="images/logo-blanco-hor.svg" alt="logo"></a>
            </div>
        </header>
        <main id="Main">
            <form>
            <section id="PersonalData">
                <h2>Datos Generales</h2>
                <h4>Para cotizar tu reparació rápida te invitamos a diligenciar el siguiente formulario</h4>
                <div class="contenedor">
                    <article class="HalfColumn">
                        <label for="Nombres">Nombre:</label>
                        <input id="Nombres" type="text">
                    </article>
                    <article class="HalfColumn">
                        <label for="Telefono">Telefono:</label>
                        <input id="Telefono" type="tel">
                    </article>
                    <article>
                        <label for="email">Email:</label>
                        <input id="email" type="email">
                    </article>
                    <article class="ThirdColumn">
                    <label for="lista1">Tipo:</label>
                        <select id="lista1" name="lista1">
                            <option value="0">Seleccionar Tipo</option>
                            <?php WHILE($row = $resultado->fetch_assoc()) { ?>
                                <option value="<?php echo $row['idMarca']; ?>"><?php echo $row ['Marca']; ?></option>
                            <?php } ?> 
                        </select>
                    </article>
                    <article class="ThirdColumn">
                        <label for="lista2">Modelo:</label>
                        <select name="lista2" id="lista2">
                            <!--Inserted from Js-->
                        </select>
                    </article>
                    <article class="ThirdColumn">
                        <label for="CarColor">Color:</label>
                        <select id="CarColor" name="CarColor">
                            <option value="value0">Seleccione Color</option>
                            <option value="value1">Amarillo</option> 
                            <option value="value2">Azul</option> 
                            <option value="value3">Beige</option>
                            <option value="value4">Blanco</option>
                            <option value="value5">Gris</option> 
                            <option value="value6">Marrón</option> 
                            <option value="value7">Naranja</option>
                            <option value="value8">Negro</option>
                            <option value="value9">Purpura</option> 
                            <option value="value10">Rojo</option> 
                            <option value="value11">Turquesa</option>
                            <option value="value12">Verde</option>
                            <option value="value13">Otro</option>
                        </select>
                    </article>
                    <article>
                        <img id="ImageLoadCar" src="" alt="Carro">
                    </article>
                    <article class="HalfColumn">
                        <label for="placa">Placa:</label>
                        <input id="placa" type="text">
                    </article>
                    <article class="HalfColumn">
                        <label for="Centro">Concesionario más cercano:</label>
                        <select id="Centro" name="Centro">
                            <option value="0">Seleccione Concesionario</option>
                            <option value="1">Envigado</option> 
                            <option value="2">Villavicencio</option> 
                            <option value="3">Bogotá 36</option>
                            <option value="4">Bogotá 68</option>
                            <option value="5">Bogotá 153</option> 
                            <option value="6">Bogotá 170</option> 
                            <option value="7">Bogotá 224</option>
                            <option value="8">Madelena</option>
                        </select>
                    </article>
                    <article class="HalfColumn" style="Display:none;">
                        <label for="PaintType">Tipo de Pintura:</label>
                        <!--<select id="PaintType" name="PaintType">
                            <option value="0">Seleccione Tipo de Pintura</option>
                            <?php /*WHILE($row2 = $resultado2->fetch_assoc()) { ?>
                                <option value="<?php echo $row2['idtipopintura']; ?>"><?php echo $row2 ['tipopintura']; ?></option>
                            <?php }*/ ?> 
                        </select>-->
                        <select id="PaintType" name="PaintType">
                            <option value="1">Metálica/Perlada</option>
                        </select>
                    </article>
                    <article>
                        <h4>Seleccionar la(s) parte(s) afectada(s) y dar click en el botón añadir para agregar a su cotización</h4>
                    </article>
                    <article class="ThirdColumn">
                    <label for="PiezaSelect">Parte:</label>
                        <select id="PiezaSelect" name="select">
                            <option value="0">Seleccione Pieza</option>
                            <?php WHILE($row4 = $resultado4->fetch_assoc()) { ?>
                                <option value="<?php echo $row4['idparte']; ?>"><?php echo $row4 ['parte']; ?></option>
                            <?php } ?>
                        </select>
                    </article>
                    <article class="ThirdColumn">
                        <label for="LevelSelect">Daño:</label>
                        <select id="LevelSelect" name="select">
                            <option value="0">Seleccione Tipo de Daño</option>
                            <?php WHILE($row3 = $resultado3->fetch_assoc()) { ?>
                                <option value="<?php echo $row3['idtipodano']; ?>"><?php echo $row3 ['tipodano']; ?></option>
                            <?php } ?>
                        </select>
                    </article>
                    <article class="ThirdColumn" id="ThirdButton">
                        <button type="button" onclick="agregarFila()">Añadir</button>
                    </article>
                    <article>
                        <table class="" id="TablaResumen">
                            <thead style="text-align: center;">
                                <tr>
                                    <td style="width: 40%;">Pieza</td>
                                    <td style="width: 40%;">Daño</td>
                                </tr>
                            </thead>
                            <tbody style="font-weight: 400;">
                                <!--Inserted by user selection-->
                            </tbody>
                        </table>
                    </article>
                    <article class="TotalSection">
                        <div id="valor" style="text-align: center; visibility:hidden;">
                            <h4 id="TituloValor" style="background-color:#bc162c; color:white;">Total</h4>
                            <p id="Valor2"></p>
                        </div>
                    </article>
                    <article id="ButtonBottom">
                        <button id="buttonCotizacion" type="button" onclick="Cotizar();">Generar Cotizaci&oacute;n</button>
                        <button id="buttonPDF" type="button" style="display:none" onclick="sendMail();">Descargar PDF</button>
                    </article>
                </div>
            </section>
            </form>
        </main>

        <div class="container" style="margin-top:2%;">
            
            
            <div class="row" style="text-align: center;">
                <div class="col-lg-2 col-sm-12 flat-pdr-100"></div>
                <div class="col-lg-8 col-sm-12 flat-pdr-100"> 
                    
                </div>
                <div class="col-lg-2 col-sm-12 flat-pdr-100"></div>
            </div>  

        </div>
    </body>
    
</html>