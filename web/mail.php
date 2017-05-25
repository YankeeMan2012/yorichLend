<?php
$login = $_POST['login'];
$name = $_POST['name'];
$resName = '';

if ($name !== '') {
    $resName = 'Имя клиента: ' . $name;
}

$to  = "yankeeman2012@mail.ru";

$subject = "Обратная связь YoRich";

$message = '<html>
                <head>
                    <title>Клиент просит, чтобы с ним связались:</title>
                </head>
                <body>
                    <p>Клиент просит, чтобы с ним связались:</p>
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