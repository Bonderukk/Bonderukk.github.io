<?php 
if (isset($_POST['email'])) {
    // Email information
    $to = array(
        "matusbednarik197@gmail.com",
        // Add other email addresses here if needed
    );
    $to_string = implode(", ", $to);
    $from = "noreply@stanosladek.sk";
    
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Construct email body
    $email_body = "Meno: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Telefón: $phone\n";
    $email_body .= "Predmet: $subject\n\n";
    $email_body .= "Správa:\n$message\n";

    // Additional headers
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to_string, $subject, $email_body, $headers)) {
        header("Location: index.html?status=success");
    } else {
        header("Location: index.html?status=error");
    }
    exit();
} else {
    header("Location: index.html?status=error");
    exit();
}
?>
