<?php
$imageUrl = "";
if (isset($_POST['url'])) {
    $imageUrl = $_POST['url'];
} else {
    exit();
}
//echo $fileData;
echo "==================================================================";
echo '<br>';
$imageFile = $imageUrl;
$imageUrl = "https://cdn-1.matterport.com/models/978b8bf7c9d14de792b4aafb102e4a72/assets/~/".$imageFile."?t=2-07404394da2723b448b1f1713a070e4db484cd22-1512017898-0";
$image = file_get_contents($imageUrl);

$destination = $_SERVER['DOCUMENT_ROOT'] . "/download/assets/".$imageFile;

echo $destination;
echo '<br>';
echo "==============================================
====================";
echo '<br>';
if(file_exists($destination)){
    exit();
}
if (!is_dir(dirname($destination))) {
    mkdir(dirname($destination), 0777, true);
    echo dirname($destination);
//        echo '<br>';
}
file_put_contents($destination, $image);
//    exit();
