<?

    $message = '';
    $i = 0;

    foreach ($_POST as $j=>$item) {
        if ($i > 0) {
                $message .= implode(':',$item)."<br>";
        } else{
            $message .= $item."<br>";
        }
        $i++;
    }
    echo $message;

    $subject = $_POST['title'];
    $headers = 'MIME-Version: 1.0' . "\r\n" ;
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n" ;
    $headers .= 'From: <yana@coderiver.com.ua>' . "\r\n";

    // to add more emails add their to the mail options
    // for example:
    // mail('first@mail.com, second@mail.com', $subject, ...)
    mail('yana@coderiver.com.ua', $subject, $message, $headers);

?>