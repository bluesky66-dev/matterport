<?php

$file = $_SERVER['DOCUMENT_ROOT'] . "/test1.json";
if (file_exists($file))
    $fileData = file_get_contents($file);
else {
    echo 'file not exit';
    exit();
}
//echo $fileData;

$jsonData = json_decode($fileData, true);
$jsonData = $jsonData['images'];
foreach ($jsonData as $item) {
    $file_name = $item['name'];
    $folder = $item['sid'];
    $image = file_get_contents($item['signed_src']);
    $image1 = file_get_contents($item['thumbnail_signed_src']);
    $image2 = file_get_contents($item['download_url']);
    $image3 = file_get_contents($item['src']);
    echo $item['signed_src'];
    echo '<br>';
    echo $item['thumbnail_signed_src'];
    echo '<br>';
    echo $item['download_url'];
    echo '<br>';
    echo $item['src'];
    echo '<br>';
    echo "==================================================================";
    echo '<br>';
    $destination = $_SERVER['DOCUMENT_ROOT'] . "/matterport/apifs/models/JsPsaCq7Hxh/images/" . $folder."/".$file_name.".jpg";
    $destination1 = $_SERVER['DOCUMENT_ROOT'] . "/matterport/apifs/models/JsPsaCq7Hxh/images/" . $folder."1/".$file_name.".jpg";
    $destination2 = $_SERVER['DOCUMENT_ROOT'] . "/matterport/apifs/models/JsPsaCq7Hxh/images/" . $folder."2/".$file_name.".jpg";
    $destination3 = $_SERVER['DOCUMENT_ROOT'] . "/matterport/apifs/models/JsPsaCq7Hxh/images/" . $folder."3/".$file_name.".jpg";
    echo $destination;
    echo '<br>';
    echo "==================================================================";
    echo '<br>';
    if (!is_dir(dirname ($destination))) {
        mkdir(dirname ($destination), 0777, true);
        echo dirname ($destination);
//        echo '<br>';
    }
    if (!is_dir(dirname ($destination1))) {
        mkdir(dirname ($destination1), 0777, true);
        echo dirname ($destination1);
//        echo '<br>';
    }
    if (!is_dir(dirname ($destination2))) {
        mkdir(dirname ($destination2), 0777, true);
        echo dirname ($destination2);
//        echo '<br>';
    }
    if (!is_dir(dirname ($destination3))) {
        mkdir(dirname ($destination3), 0777, true);
        echo dirname ($destination3);
//        echo '<br>';
    }
    file_put_contents($destination, $image);
    file_put_contents($destination1, $image1);
    file_put_contents($destination2, $image2);
    file_put_contents($destination3, $image3);
//    exit();
}