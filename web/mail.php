<?php
$login = $_POST['login'];
$name = $_POST['name'];
$title = $_POST['title'];
$resName = '';

$label = 'Заявка на разработку';

switch ($title) {
    case '1': $title = $label . ' - LANDING PAGE';
        break;
    case '2': $title = $label . ' - САЙТ-ВИЗИТКА';
        break;
    case '3': $title = $label . ' - КОРПОРАТИВНЫЙ САЙТ';
        break;
    case '4': $title = $label . ' - ИНТЕРНЕТ-КАТАЛОГ';
        break;
    case '5': $title = $label . ' - ИНТЕРНЕТ-МАГАЗИН';
        break;
    case '6': $title = $label . ' - БЛОГ/НОВОСТНОЙ ПОРТАЛ';
        break;
}

if ($name !== '') {
    $resName = 'Имя клиента: ' . $name;
}

$to  = "yankeeman2012@mail.ru";

$subject = "Обратная связь YoRich - " . $title;

$message = '<html>
                <head>
                    <title>'. $title .'</title>
                </head>
                <body>
                    <p>'. $title .'</p>
                    <p>Клиент просит, чтобы с ним связались!</p>
                    <p>Контакт клиента: '. $login .'</p>
                    <p>'. $resName .'</p>
                </body>
            </html>';

$headers  = "Content-type: text/html; charset=UTF-8 \r\n";

$isSent = mail($to, $subject, $message, $headers);
if ($isSent) {
    echo 'Принято к доставке';
} else {
    echo 'Доставка отклонена';
}
?>