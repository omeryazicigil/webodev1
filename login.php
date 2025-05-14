<?php
if (isset($_GET['error'])) {
    echo '<div class="error">Kullanıcı adı veya şifre hatalı.</div>';
}
?>
<form action="login.php" method="post">
    <label for="username">Kullanıcı Adı (E-posta):</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Şifre:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Giriş Yap</button>
</form>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Kullanıcı adı ve şifre alanlarının boş olup olmadığını kontrol et
    if (empty($username) || empty($password)) {
        header("Location: login.html?error=1");
        exit();
    }

    // Kullanıcı adı formatı kontrolü (g veya b ile başlayacak ve ardından 9 rakam gelecek)
    if (!preg_match('/^[gb][0-9]{9}@sakarya\.edu\.tr$/', $username)) {
        header("Location: login.html?error=1");
        exit();
    }

    // Kullanıcı adı domain kontrolü
    $username_parts = explode("@", $username);
    $student_number = $username_parts[0];

    // Şifre formatı kontrolü (g veya b ile başlayacak ve ardından 9 rakam gelecek)
    if (!preg_match('/^[gb][0-9]{9}$/', $password)) {
        header("Location: login.html?error=1");
        exit();
    }

    // Şifre kontrolü
    if ($password === $student_number) {
        // Hoşgeldiniz sayfasına yönlendirme
        header("Location: hosgeldin.php?student_number=" . urlencode($student_number));
        exit();
    } else {
        header("Location: login.html?error=1");
        exit();
    }
}
?>
