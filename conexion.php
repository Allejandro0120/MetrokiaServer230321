<?php
    $host = 'localhost';
    $db = 'u411413023_metrokia';
    $user = 'u411413023_cotiz';
    $pass = 'C0t1z1.202O.$';
    $conn = mysqli_connect ($host,$user,$pass,$db);

    $conn->set_charset("utf8");

    if (mysqli_connect_errno()){
        echo 'Conexion Fallida : ', mysqli_connect_error();
        exit();
    }




?>