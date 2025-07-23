<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = trim($_POST['nombre']);
$email = trim($_POST['email']);
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Correo electrónico no válido.";
    exit();
}

// Validar dominio del correo electrónico
if (!preg_match('/^[a-zA-Z0-9._%+-]+@inemjose\.edu\.co$/', $email)) {
    echo "Solo se permiten correos @inemjose.edu.co";
    exit();
}

// Validar patrón de contraseña
if (!preg_match('/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/', $password)) {
    echo "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.";
    exit();
}

// Validar que la contraseña tenga al menos 8 caracteres
if (strlen($password) < 8) {
    echo "La contraseña debe tener al menos 8 caracteres.";
    exit();
}

// Validar que las contraseñas coincidan
if ($password !== $confirm_password) {
    echo "Las contraseñas no coinciden.";
    exit();
}

// Verificar si el usuario o email ya existen
$sql_check = "SELECT id FROM usuarios WHERE nombre = ? OR email = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ss", $nombre, $email);
$stmt_check->execute();
$stmt_check->store_result();
if ($stmt_check->num_rows > 0) {
    echo "El usuario o correo electrónico ya está registrado.";
    $stmt_check->close();
    $conn->close();
    exit();
}
$stmt_check->close();

// Encriptar la contraseña
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar en la base de datos
$sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $email, $hash);

if ($stmt->execute()) {
    // Redirigir a sesion.html si el registro fue exitoso
    header("Location: sesion.html");
    exit();
} else {
    echo "Error: " . htmlspecialchars($stmt->error);
}

$stmt->close();
$conn->close();
?>
<form action="procesar_registro.php" method="POST">