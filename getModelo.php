<?php 

require ('conexion.php');

$idMarca = $_POST['idMarca'];

$queryM = "SELECT idModelo, Modelo FROM modelo WHERE idMarca = '$idMarca' ORDER BY Modelo ASC"; 
$resultadoM = $conn->query($queryM);

$html = "<option value='0'>Seleccionar Modelo</option>";


WHILE($rowM = $resultadoM->fetch_assoc())
{
    $html = $html."<option value='".$rowM['idModelo']."'>".$rowM['Modelo']."</option>";
}

echo $html;

?>