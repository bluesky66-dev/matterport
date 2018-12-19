<?php
$damdata = "";
if (isset($_POST['dam'])) {
    $damdata = $_POST['dam'];
} else {
    exit();
}
//echo $fileData;
echo "==================================================================";
echo '<br>';
$destination = $_SERVER['DOCUMENT_ROOT'] . "/matterport/download/damdata9jD2cUK9jhz.json";

echo $destination;
echo '<br>';
echo "==================================================================";
echo '<br>';
if(file_exists($destination)){
    exit();
}
if (!is_dir(dirname($destination))) {
    mkdir(dirname($destination), 0777, true);
    echo dirname($destination);
//        echo '<br>';
}
file_put_contents($destination, $damdata);
//    exit();
