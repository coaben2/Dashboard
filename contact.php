<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "coaben2@gmail.com";
    $subject = "Nouveau message de contact de $name";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);
}
header("Location: contact.html");
exit();
?>