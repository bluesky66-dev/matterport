<?php
$image_url = "";
$image_file = "";
if (isset($_POST['url']) && isset($_POST['file'])) {
    $image_url = $_POST['url'];
    $image_file = $_POST['file'];
    echo $image_url;
} else {
    exit();
}
//echo $fileData;

$image = file_get_contents($image_url);
echo "==================================================================";
echo '<br>';
$destination = $_SERVER['DOCUMENT_ROOT'] . "/matterport/models/8748569db6f14384b2179cb7d4b5167d/assets/~/" . $image_file;

echo $destination;
echo '<br>';
echo "==================================================================";
echo '<br>';
if (!is_dir(dirname($destination))) {
    mkdir(dirname($destination), 0777, true);
    echo dirname($destination);
//        echo '<br>';
}
file_put_contents($destination, $image);
//    exit();
