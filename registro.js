// Configuración de Supabase
const supabaseUrl = 'https://varxmetzsabmtfsarujf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcnhtZXR6c2FibXRmc2FydWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDQwNzQsImV4cCI6MjA2ODg4MDA3NH0.EUkx4lmvG5yCYiR1eTZp-LUe8U_PjppR79n--z2n5tg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('registerForm');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const emailInput = document.getElementById('email');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const emailError = document.getElementById('emailError');
const registroError = document.getElementById('registroError');
const registroExito = document.getElementById('registroExito');
const emailPattern = /^[a-zA-Z0-9._%+-]+@inemjose\.edu\.co$/;
const passwordPattern = /^(?=.[A-Z])(?=.\d)[A-Za-z\d]{8,}$/;

form.addEventListener('submit', async function(event) {
  let valid = true;
  registroError.style.display = 'none';
  registroExito.style.display = 'none';

  // Validación de correo institucional
  if (!emailPattern.test(emailInput.value)) {
    emailError.style.display = 'block';
    emailInput.focus();
    valid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Validación de patrón de contraseña
  if (!passwordPattern.test(passwordInput.value)) {
    passwordError.style.display = 'block';
    passwordInput.focus();
    valid = false;
  } else {
    passwordError.style.display = 'none';
  }

  // Validación de coincidencia de contraseñas
  if (passwordInput.value !== confirmInput.value) {
    confirmError.style.display = 'block';
    confirmInput.focus();
    valid = false;
  } else {
    confirmError.style.display = 'none';
  }

  if (!valid) {
    event.preventDefault();
    return;
  }

  event.preventDefault();

  // Registro en Supabase
  const nombre = document.getElementById('nombre').value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nombre: nombre, email: email, password: password }]);

  if (error) {
    registroError.textContent = '❌ Error al registrar: ' + error.message;
    registroError.style.display = 'block';
  } else {
    registroExito.textContent = '✅ Usuario registrado correctamente';
    registroExito.style.display = 'block';
    form.reset();
  }
});

emailInput.addEventListener('input', function() {
  if (emailPattern.test(emailInput.value)) {
    emailError.style.display = 'none';
  }
});

passwordInput.addEventListener('input', function() {
  if (passwordPattern.test(passwordInput.value)) {
    passwordError.style.display = 'none';
  }
  if (passwordInput.value === confirmInput.value) {
    confirmError.style.display = 'none';
  }
});

confirmInput.addEventListener('input', function() {
  if (passwordInput.value === confirmInput.value) {
    confirmError.style.display = 'none';
  } else {
    confirmError.style.display = 'block';
  }
});