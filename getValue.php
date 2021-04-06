<?php 

require ('conexion.php');

$idMarca        =   $_POST['idMarca'];
$idTipoDano     =   $_POST['idTipoDano'];
$idTipoPintura  =   $_POST['idTipoPintura'];
$idParte        =   $_POST['idParte'];

$queryM = "SELECT costo FROM costos 
WHERE idParte = '$idParte' 
AND idTipoDano = '$idTipoDano' 
AND idTipoPintura = '$idTipoPintura' 
AND idTipoVehiculo = '$idMarca'"; 
$resultadoI = $conn->query($queryM);

WHILE($rowI = $resultadoI->fetch_assoc())
{
    $costo = $rowI['costo'];
}

echo ($costo);

?>