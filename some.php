<?php
$VisionModeldata = "";
if (isset($_POST['visiondata'])) {
    $VisionModeldata = $_POST['visiondata'];
} else {
    exit();
}
//echo $fileData;
echo "==================================================================";
echo '<br>';
$destination = $_SERVER['DOCUMENT_ROOT'] . "/download/VisionModeldata9jD2cUK9jhz.json";

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
file_put_contents($destination, $VisionModeldata);
//    exit();
