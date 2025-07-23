const SUPABASE_URL = 'https://varxmetzsabmtfsarujf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcnhtZXR6c2FibXRmc2FydWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDQwNzQsImV4cCI6MjA2ODg4MDA3NH0.EUkx4lmvG5yCYiR1eTZp-LUe8U_PjppR79n--z2n5tg';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('registerForm');
const usuarioInput = document.getElementById('nombre');
const correoInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const confirmError = document.getElementById('confirmError');
const registroError = document.getElementById('registroError');
const registroExito = document.getElementById('registroExito');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  registroError.style.display = 'none';
  registroExito.style.display = 'none';
  confirmError.style.display = 'none';

  // Validación de contraseñas
  if (passwordInput.value !== confirmInput.value) {
    confirmError.style.display = 'block';
    return;
  }

  // Validación básica de campos
  if (!usuarioInput.value || !correoInput.value || !passwordInput.value) {
    registroError.textContent = 'Todos los campos son obligatorios.';
    registroError.style.display = 'block';
    return;
  }

  // Insertar usuario en Supabase
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{
      usuario: usuarioInput.value,
      correo: correoInput.value,
      contraseña: passwordInput.value
    }]);

  if (error) {
    registroError.textContent = '❌ Error al registrar: ' + error.message;
    registroError.style.display = 'block';
  } else {
    registroExito.textContent = '✅ Usuario registrado correctamente';
    registroExito.style.display = 'block';
    form.reset();
  }
});